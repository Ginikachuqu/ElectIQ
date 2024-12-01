import { createContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseclient";

// Define a type for the context value
type AuthContextType = {
  user: any | null;
  signUp: (email: string, password: string, matricNo: string, firstName: string, lastName: string) => Promise<{ success: boolean, error?: string }>;
  isLoading: boolean;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  signUp: async () => ({ success: false }),
  isLoading: false,
  isLoggedIn: false
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (email: string, password: string, matricNo: string, firstName: string, lastName: string) => {
    setIsLoading(true);
    try {
      // First, validate the matriculation number
      const { data: matricData, error: matricError } = await supabase
        .from('valid_matriculation_numbers')
        .select('*')
        .eq('matric_number', matricNo)
        .single(); 

      console.log('Matric Data:', matricData);
      console.log('Matric Error:', matricError);

      // Check if a valid matric number exists
      if (matricError || !matricData) {
        return { 
          success: false, 
          error: 'Invalid matriculation number' 
        };
      }

      // Proceed with sign up
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            matric_number: matricNo,
            first_name: firstName,
            last_name: lastName
          }
        }
      });

      if (error) {
        console.error('Signup error:', error.message);
        return { success: false, error: error.message };
      }

      if (data.user) {
        setUser(data.user);
        setIsLoggedIn(true);
        return { success: true };
      }

      return { success: false, error: 'Signup failed' };
    } catch (error) {
      console.error('Unexpected signup error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setIsLoggedIn(true);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null);
        setIsLoggedIn(true);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    // Cleanup subscription
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        isLoading,
        isLoggedIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
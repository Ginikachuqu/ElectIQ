import { createContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseclient";
import toast from "react-hot-toast";

// Define a type for the context value
// type AuthContextType = {
//   user: any | null;
//   signUp: (email: string, password: string, matricNo: string, firstName: string, lastName: string) => Promise<{ success: boolean, error?: string }>;
//   isLoading: boolean;
//   isLoggedIn: boolean;
// };

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (email: string, password: string, matricNo: number, firstName: string, lastName: string) => {
    setIsLoading(true);
    try {
      // First, validate the matriculation number
      const { data: matricData, error: matricError } = await supabase
        .from('valid_matriculation_numbers')
        .select('*')
        .eq('matric_number', matricNo.trim())
        .single();
  
      // Check if a valid matric number exists
      if (matricError || !matricData || matricData.available === false) {
        console.error('Matric Number Validation Error:', matricError);
        throw new Error('Invalid or already used matriculation number');
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
  
      if (data.user && data.user.role === 'authenticated') {
        // Update matric number availability after successful signup
        const { data: existingData, error: updateError } = await supabase
          .from('valid_matriculation_numbers')
          .update({ 'availability_status': false })
          .eq('matric_number', matricNo.trim())
          .select()

          if (!existingData || existingData.length === 0) {
            console.log("No record found with the given matric number.");
            console.log("matric number:", matricNo);
            } else {
                console.log("Record found:", existingData);
            }
  
        if (updateError) {
          console.error('Matric number update error:', updateError);
        }
  
        setUser(data.user);
        setIsLoggedIn(true);
        return { success: true };
      }
  
      // return { success: false, error: 'Signup failed' };
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

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      console.log(data)
      if (error) {
        console.error('Supabase Error:', error.message);
        return { success: false, error: error.message }
      }
  
      if (!data.user) {
        throw new Error('Signin failed: No user data returned.');
      }
  
      setUser(data.user);
      setIsLoggedIn(true);

      return { data, error }
    } catch (error) {
      console.error('SignIn Error:', (error as Error).message || error);
    } finally {
      setIsLoading(false)
    }
  };
  

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()

      if(error) {
        toast.error('Error signing out')
        throw new Error('Error signing out')
      }

      
      setUser(null)
      setIsLoggedIn(false)

      return {error}
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

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
        signIn,
        signOut,
        isLoading,
        isLoggedIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
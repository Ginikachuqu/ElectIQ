import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Signin from './pages/signin/Signin'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import Booth from './pages/votingbooth/Booth'
import Admin from './pages/admin/Admin'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/signup' element={<Signup />}/>

        <Route path='/' element={<Home />}/>
        <Route path='/booth' element={<Booth />}/>
        <Route path='/admin' element={<Admin />}/>
      </Routes>
      <Toaster 
        position='bottom-center'
        reverseOrder={false}
        gutter={8}
        
        toastOptions={{
          // Define default options
          className: '',
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
      
          // Default options for specific types
          success: {
            style: {
              background: 'green',
            },
          },

          error: {
            style: {
              background: 'red',
            },
          },
        }}
      />
    </Router>
  )
}

export default App

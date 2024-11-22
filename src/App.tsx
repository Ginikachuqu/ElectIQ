import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Signin from './pages/signin/Signin'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import Booth from './pages/votingbooth/Booth'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/signup' element={<Signup />}/>

        <Route path='/' element={<Home />}/>
        <Route path='/booth' element={<Booth />}/>
      </Routes>
    </Router>
  )
}

export default App

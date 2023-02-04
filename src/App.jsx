import React, { Fragment } from 'react'
import Navbar from './Components/NavBar/NavBarShow'
import SignUpForm from './Components/signUpForm/SignUpForm'
import LogIn from './Components/Login/LogIn'
import { Route, Routes } from 'react-router-dom'
import WelcomePage from './Components/welcomePage/WelcomePage'




function App() {
  return (
    <Fragment>
      <Navbar />


      <Routes>
        <Route   path='/signup' element={<SignUpForm />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/welcomepage' element={<WelcomePage/>}></Route>

      </Routes>
    </Fragment>

  )
}

export default App

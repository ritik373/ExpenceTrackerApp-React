import React, { Fragment } from 'react'
import Navbar from './Components/NavBar/NavBarShow'
import SignUpForm from './Components/signUpForm/SignUpForm'
import LogIn from './Components/Login/LogIn'
import { Route, Routes } from 'react-router-dom'
import WelcomePage from './Components/welcomePage/WelcomePage'
import ProfilePage from './Components/profilePage/ProfilePage'
import { authContext } from './Components/AuthContextTokin/AuthContextTokin'
import { useContext } from 'react'
import ErrorPage from './Components/errorPage/ErrorPage'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'




function App() {
  const AuthContext=useContext(authContext);
  const verifyUser=AuthContext.isLoggedIn;
  return (
    <Fragment>
      { verifyUser && <Navbar />}


      <Routes>
        <Route   path='/signup' element={<SignUpForm />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/' element={<LogIn />} />
        
        <Route path='/welcomepage' element={verifyUser?<WelcomePage/>:<ErrorPage/>}></Route>
        <Route path='/profile' element={verifyUser?<ProfilePage/>:<ErrorPage/>}></Route>
        <Route path='/forgetpassword' element={<ForgetPassword/>}></Route>

      </Routes>
    </Fragment>

  )
}

export default App

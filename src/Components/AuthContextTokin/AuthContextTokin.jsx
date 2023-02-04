import React, { createContext } from 'react';
import { useState } from 'react';


const authContext=createContext({
    email:'',
    token:'',
    isLoggedIn:false,
    isLogIn:(token)=>{ },
    isLogOut:()=>{},
})

  function AuthContextTokin(props) {
    const initialToken=localStorage.getItem('token');
    const initialEmail=localStorage.getItem('email');


    const [token,setToken]=useState(initialToken);
    const [email,setEmail]=useState(initialEmail);

     let isLoggedIn=!!token;
     
     let isLoggedInEmail=!!email;

    const logInhandler=(token,email)=>{
        setToken(token);
        setEmail(email);
        localStorage.setItem('token',token);
        localStorage.setItem('email',email);
    }
    const logOutHandler=()=>{
        setToken(null);
        localStorage.removeItem('token')
        localStorage.removeItem('email')
    }


    let contextData={
        token:token,
        email:email,
        isLoggedIn:isLoggedIn,
        isLogIn:logInhandler,
        isLogOut:logOutHandler,
    }
    return (
        <div>
        <authContext.Provider value={contextData}>{props.children}</authContext.Provider>
            
        </div>
    );
}

export default AuthContextTokin;
export {authContext};
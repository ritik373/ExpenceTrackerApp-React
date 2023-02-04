import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './forgetpassword.css'

function ForgetPassword(props) {
    const emailInputRef=useRef();
    const[isLoading,setisLoading]=useState(false);

    const onSendEmailhandler=async(e)=>{
        setisLoading(true)
        e.preventDefault();
        const emailInput=emailInputRef.current.value;

        await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCqfrReMNu5wYBdFb8N8TIcd6T0X2_NsjA',{
            method:'POST',
            body:JSON.stringify({
                requestType:'PASSWORD_RESET',
                email:emailInput, 
            }),
           headers: {
                'Content-Type': 'application/json'
              },
        }).then((res)=>{
            setisLoading(false)
            return res.json().then((res)=>{
                if(res.error){
                    alert(res.error.message)
                }else{
                    
                    alert('Check your email inbox and reset password');
                }
            })
        })


    }
    return (
        <div className='card' >
  
        <p>Enter the Email with which You have Registered</p>
        <input type="email" name="" id="" style={{width:"500px",height:'50px',borderRadius:'100px'}} ref={emailInputRef}/>
        <button onClick={onSendEmailhandler}>Send Link</button>
        <p>Already a User ? <Link to='/'> LogIn</Link></p>
        {isLoading && <h1>Sending Request...</h1> }
            
        </div>

    );
}

export default ForgetPassword;
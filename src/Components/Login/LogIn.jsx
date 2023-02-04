import React,{useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Login.module.css'


function LogIn(props) {
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const navigate=useNavigate()

  const onSubmitHnadler=(e)=>{
    e.preventDefault();
    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;


    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqfrReMNu5wYBdFb8N8TIcd6T0X2_NsjA', {
        method: 'POST',
        body: JSON.stringify({ email: emailInput, password: passwordInput, returnSecureToken: true, }),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((res)=>{
        if(res.ok){
          return res.json().then((responce)=>{
            console.log(responce)
            navigate('/welcomepage',{replace:true})

          })

        }else{
          alert("you are not Registor or Please create your new Account");
        }
      
      })
      
          
        
      


    console.log(emailInput +" "+passwordInput)
  }
    return (
        <section className={classes.auth}>
        <h1>LogIn</h1>
        <form onSubmit={onSubmitHnadler}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' ref={emailInputRef} required />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input type='password' id='password' ref={passwordInputRef} required />
          </div>
          <div className={classes.actions}>
            <button>LogIn</button>

            <Link to="/signup">Create new account</Link>
           
          </div>
        </form>
      </section>





  
    );
}
  

export default LogIn;
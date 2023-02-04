import React from 'react';
import './ExpenceForm.css'
import { useState } from 'react';
import { authContext } from '../../AuthContextTokin/AuthContextTokin';
import { useContext } from 'react';


const ExpenceForm = (props) => {  
      const AuthContextToken=useContext(authContext);

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    function onChangeHandler1(event) {
        setTitle(event.target.value);
    }
    function onChangeHandler2(event) {
        setAmount(event.target.value);
    }
    function onChangeHandler3(event) {
        setDate(event.target.value);
    }
    // let count = 1;

    const onSubmitHandler = (event) => {
        event.preventDefault();

        
       
        
        const auth=AuthContextToken.email
        const replaceEmail=auth.replace('.','')
        // console.log(replaceEmail);
  
        fetch(`https://expencetrackerreact-default-rtdb.firebaseio.com/${replaceEmail}.json`,{
        method:'POST',
        body:JSON.stringify({title:title, amount: amount,  date: new Date(date).toLocaleString(),}),
        headers: {
            'Content-Type': 'application/json'
          },
      })

     
   

        setTitle('');
        setAmount('');
        setDate('');


    }


    return <form onSubmit={onSubmitHandler} className="welcomePageform" >

        <label htmlFor="title">Title:</label>
        <input type="text" name="" id="title" value={title} onChange={onChangeHandler1} />
        <label htmlFor="amount">Amonut:</label>
        <input type="text" name="" id="amonut" value={amount} onChange={onChangeHandler2} />
        <label htmlFor="amount">Date:</label>
        <input type="date" name="dto" id="date_timepicker_end" value={date} onChange={onChangeHandler3}></input>
        <label htmlFor="amount">Submit </label>
        <button type="submit" style={{color:"white"}}>Submit Detail</button>
     


    </form>



}

export default ExpenceForm;
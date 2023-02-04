import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './welcomepage.css';
import ExpenceForm from './Expenceform/ExpenceForm';
import Table from 'react-bootstrap/Table';
import { authContext } from '../AuthContextTokin/AuthContextTokin';
import { useContext } from 'react';

 function WelcomePage(props) {
    const AuthContextToken=useContext(authContext);
    const navigate=useNavigate();
    const[data,setUserData]=useState([]);
    


    const auth=AuthContextToken.email;
    const authreplaced=auth.replace('.','');
    // console.log(authreplaced)


  

    let UserData=[];
 useEffect(()=>{

 
    fetch(`https://expencetrackerreact-default-rtdb.firebaseio.com/${authreplaced}.json`,{
        method:'GET',
    }).then((res)=>{
        return res.json().then((res)=>{
          
            console.log(res)

            for (const key in res) {

                UserData.push({
                    id:key,
                    title:res[key].title,
                    amount:res[key].amount,
                    date:res[key].date,
                })}
            setUserData(UserData);

        })
    })
},[])

    const verifyEmailHandler=(e)=>{
        e.preventDefault();
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCqfrReMNu5wYBdFb8N8TIcd6T0X2_NsjA',{
            method:'POST',
            body:JSON.stringify({
                requestType:"VERIFY_EMAIL",
                idToken:localStorage.getItem('token')
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            const data=res.json();
            data.then((resp)=>{
                confirm(`Check your Email `);
            })
        }).catch((err)=>{
            console.log('err',err)
        })
    }

    const onLogoutHandler=()=>{
        AuthContextToken.isLogOut();
        navigate('/login',{replace:true})
    }
    


   

 

console.log(data)
   
      

    return (<Fragment>
        <div className='welcomepage'>
        <h4>Welcome to Expence Tracker APP</h4>
        <p className='completeProfile'>Your Profile is incomplete <Link to="/profile"> Complete Now </Link></p>
            
        </div>
         
        <button  onClick={onLogoutHandler}>logout</button>
        <button type='submit' onClick={verifyEmailHandler} className='emailverify'>Verify Email</button>

        <ExpenceForm/>
    
       <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Title</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>

      { data.map((currvalue,index)=>{
        return   <tbody>
        <tr>
          <td>{index+1}</td>
          <td>{currvalue.title}</td>
          <td>{currvalue.amount}</td>
          <td>{currvalue.date}</td>
        </tr>
        </tbody>
       })}
    
    </Table>
    


        </Fragment>
    );
}

export default WelcomePage;
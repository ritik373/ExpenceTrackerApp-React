import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import './welcomepage.css';
import ExpenceForm from './Expenceform/ExpenceForm';
import Table from 'react-bootstrap/Table';

 function WelcomePage(props) {
    const[data,setUserData]=useState([]);
    let UserData=[];
    
    fetch('https://expencetrackerreact-default-rtdb.firebaseio.com/ExpenceUserData.json',{
        method:'GET',
    }).then((res)=>{
        return res.json().then((res)=>{

            for (const key in res) {

                UserData.push({
                    id:key,
                    title:res[key].title,
                    amount:res[key].amount,
                    date:res[key].date,
                })
              
            }
            setUserData(UserData);

        })
    })
    

 


   
      

    return (<Fragment>
        <div className='welcomepage'>
        <h4>Welcome to Expence Tracker APP</h4>
        <p className='completeProfile'>Your Profile is incomplete <Link to="/profile"> Complete Now </Link></p>
            
        </div>

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

      { data.map((currvalue)=>{
        return   <tbody>
        <tr>
          <td>{currvalue.id}</td>
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
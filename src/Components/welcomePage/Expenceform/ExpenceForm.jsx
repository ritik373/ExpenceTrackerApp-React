import React from 'react';
import './ExpenceForm.css'
import { useState } from 'react';
import { authContext } from '../../AuthContextTokin/AuthContextTokin';
import { useContext } from 'react';


const ExpenceForm = (props) => {
    const AuthContextToken = useContext(authContext);

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [catagory,setCatagory]=useState('');

    function onTitleHandler(event) {
        setTitle(event.target.value);
    }
    function onAmountHandler(event) {
        setAmount(event.target.value);
    }
    function onDescriptionHandler(event) {
        setDescription(event.target.value);
    }
   
    const onCatagoryHandler = (e) => {
        setCatagory(e.target.value);
      };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const auth = AuthContextToken.email
        const replaceEmail = auth.replace('.', '')
        // console.log(replaceEmail);

        fetch(`https://expencetrackerreact-default-rtdb.firebaseio.com/${replaceEmail}.json`, {
            method: 'POST',
            body: JSON.stringify({ title: title, amount: amount, description: description,catagory:catagory }),
            headers: {
                'Content-Type': 'application/json'
            },
        })




        setTitle('');
        setAmount('');
        setCatagory('')
        setDescription('')
   


    }


    return <form onSubmit={onSubmitHandler} className="welcomePageform" >

        <label htmlFor="title">Title:</label>
        <input type="text" name="" id="title" value={title} onChange={onTitleHandler} />
  
      <label className="form-label">Choose Expense</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Amount"
                            onChange={onAmountHandler}
                            value={amount}

                        />
                    </div>
              

                <div className="chooseExpense">
                    <label className="form-label">Choose Catagory</label>
                    <select
                        className="form-select col" 
                        onChange={onCatagoryHandler}
                        // value={catagory}
                        
                        >
                        <option value="">--Please choose an option--</option>
                        <option value="Movie">Movie</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Rent">Rent</option>
                        <option value="Grocery">Grocery</option>
                    </select>
                </div>
            
            <div className="secondDiv">
                <div className="col">
                    <label className="form-label">Add Short Description</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        aria-label="Last name"
                        onChange={onDescriptionHandler}
                        value={description}

                    />
                </div>

                </div>
              
                <label htmlFor="amount">Submit </label>
                <button type="submit" style={{ color: "white" }}>Submit Detail</button>
        


            </form>



}

            export default ExpenceForm;
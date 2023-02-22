import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './welcomepage.css';

import Table from 'react-bootstrap/Table';
import { authContext } from '../AuthContextTokin/AuthContextTokin';
import { useContext } from 'react';

function WelcomePage(props) {
    const AuthContextToken = useContext(authContext);
    const navigate = useNavigate();
    const [data, setUserData] = useState([]);




    // const AuthContextToken = useContext(authContext);

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [catagory, setCatagory] = useState('');
    const [id, setId] = useState(null);
    const [isEditing, setisEditting] = useState(false);
    const [rerender, setreRender] = useState(false);
    const [activatePremium, setActivatePremium] = useState(false);
    const [themeColor, setThemeColor] = useState('white');

    function onTitleHandler(event) {
        setTitle(event.target.value);
    }
    function onAmountHandler(event) {
        setAmount(event.target.value);
        if (event.target.value >= 1000) {
            setActivatePremium(true);

        } else {
            setActivatePremium(false);
        }
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
        if (!isEditing) {


            fetch(`https://expencetrackerreact-default-rtdb.firebaseio.com/${replaceEmail}.json`, {
                method: 'POST',
                body: JSON.stringify({ title: title, amount: amount, description: description, catagory: catagory }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((data) => {
                setreRender(true);
            })
        } else {
            fetch(`https://expencetrackerreact-default-rtdb.firebaseio.com/${authreplaced}/${id}.json`, {
                method: "PUT",
                body: JSON.stringify({

                    title: title,
                    amount: amount,
                    catagory: catagory,
                    description: description,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                alert("please Update Your Expence")
                setreRender(true);
            });
            setisEditting(false)
        }




        setTitle('');
        setAmount('');
        setCatagory('')
        setDescription('')



        setreRender(false);
    }



    const auth = AuthContextToken.email;
    const authreplaced = auth.replace('.', '');
    // console.log(authreplaced)





    let UserData = [];
    useEffect(() => {


        fetch(`https://expencetrackerreact-default-rtdb.firebaseio.com/${authreplaced}.json`, {
            method: 'GET',
        }).then((res) => {
            return res.json().then((res) => {

                // console.log(res)

                for (const key in res) {

                    UserData.push({
                        id: key,
                        title: res[key].title,
                        amount: res[key].amount,
                        description: res[key].description,
                        catagory: res[key].catagory,
                    })
                }
                setUserData(UserData);


            })
        })
    }, [rerender])

    const verifyEmailHandler = (e) => {
        e.preventDefault();
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCqfrReMNu5wYBdFb8N8TIcd6T0X2_NsjA', {
            method: 'POST',
            body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: localStorage.getItem('token')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            const data = res.json();
            data.then((resp) => {
                confirm(`Check your Email `);
            })
        }).catch((err) => {
            console.log('err', err)
        })
    }

    const onLogoutHandler = () => {
        AuthContextToken.isLogOut();
        navigate('/login', { replace: true })
    }

    const toDeleteDataHandler = (id) => {
        // console.log(id)
        fetch(`https://expencetrackerreact-default-rtdb.firebaseio.com/${authreplaced}/${id}.json`, {
            method: 'DELETE',
        }).then((res) => {
            if (res.ok) {
                alert("Your Item Delete Please Refresh The Page")


            }

        })
    }
    const editHandlerHandler = (id, title1, amount1, catagory1, description1) => {
        setId(id)
        setTitle(title1)
        setAmount(amount1);
        setCatagory(catagory1)
        setDescription(description1);
        setisEditting(true)


    }
    const onActivatePremiumFeatureHandler = () => {
        console.log("onActivatePremiumFeatureHandler");
        setThemeColor('gray');


    }

    if (themeColor === 'white') {
        document.querySelector('body').style.backgroundColor = themeColor;
    } else {
        document.querySelector('body').style.backgroundColor = themeColor;

    }
    const titleArr = data.map((item) => {
          return item.title;

    })
    const amountArr = data.map((item) => {
        return item.amount;

    })
    const catagoryArr = data.map((item) => {
        return item.catagory;

    })
    const descriptionArr = data.map((item) => {
        return item.title

    })
    console.log(title);


    if (amount >= 1000) {
        const doc = document.querySelector('.downloadfile');
        console.log(doc);
        const blob = new Blob([titleArr,amountArr,catagoryArr,descriptionArr], { type: "text/csv" });
        doc.href = URL.createObjectURL(blob)
        console.log(doc)

    }


    //    console.log(doc);


    // console.log(data)




    return (<Fragment>
        <div className='welcomepage'>
            <h4>Welcome to Expence Tracker APP</h4>
            {activatePremium &&
                <h4>Activate Premium for  <button onClick={onActivatePremiumFeatureHandler}>Change Theme</button>



                </h4>}
            <button>Activate Premium for <a className='downloadfile' download="textfile.csv" style={{ color: 'white' }}>DownloadFile
             </a> Pay 1000 More Than or Equal</button>
            <p className='completeProfile'>Your Profile is incomplete <Link to="/profile"> Complete Now </Link></p>

        </div>

        <button onClick={onLogoutHandler}>logout</button>
        <button type='submit' onClick={verifyEmailHandler} className='emailverify' >Verify Email</button>


        <form onSubmit={onSubmitHandler} className="welcomePageform" >

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

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Catagory</th>
                    <th>Description</th>
                    <th>Edit</th>
                    <th >Delete</th>
                </tr>
            </thead>

            {data.map((currvalue, index) => {
                return <tbody>
                    <tr>
                        <td>{index + 1}</td>
                        <td>{currvalue.title}</td>
                        <td>{currvalue.amount}</td>
                        <td>{currvalue.catagory}</td>
                        <td>{currvalue.description}</td>
                        <td>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={editHandlerHandler.bind(null,
                                    currvalue.id,
                                    currvalue.title,
                                    currvalue.amount,
                                    currvalue.catagory,
                                    currvalue.description,
                                )} >
                                Edit

                            </button>
                        </td>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={toDeleteDataHandler.bind(null,
                                currvalue.id)}
                        >
                            Delete
                        </button>
                    </tr>
                </tbody>
            })}

        </Table>



    </Fragment>
    );
}

export default WelcomePage;
import React from 'react';
import { useRef } from 'react';
import './profile.css'
import { authContext } from '../AuthContextTokin/AuthContextTokin';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ProfilePage(props) {
    const AuthContxtTokin=useContext(authContext);
    const nameInputRef=useRef();
    const urlInputRef=useRef();
    const navigate=useNavigate();

    const onCancelhandler=(e)=>{
        e.preventDefault();
        navigate('/welcomepage',{replace:true})


    }

    const onClickHandle=async(e)=>{
        e.preventDefault();
        const nameInput=nameInputRef.current.value;
        const urlInput=urlInputRef.current.value;

       await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCqfrReMNu5wYBdFb8N8TIcd6T0X2_NsjA', {
            method: 'POST',
            body: JSON.stringify({
                 idToken: AuthContxtTokin.token,
                 displayName:nameInput,
                 photoUrl:urlInput,
                returnSecureToken:true,
                }),
            headers: {
              'Content-Type': 'application/json'
            },
        }).then((res)=>{
            if(res.ok){
                return res.json().then((responce)=>{
                    console.log(responce)
                    alert('Your Profile is Completed')
                    navigate('/welcomepage',{replace:true})
                })
            }else{
                console.log("idToken Not found")
            }
        })
        console.log(nameInput+" "+urlInput)

    }


    return (
        <div className='profilepage'>
            <div className="topbar">

                <h4>Winners never Quite ! Quitter never Win </h4>
                <p style={{ backgroundColor: "gray" }}>Your Profile is 64% completed A complete profile <br /> has higher Chance
                    of Landing a Job <Link to="/profile"> Complete Now</Link></p>
            </div>
            <div className='contactdetail'>
                <h2>Contact Deatil</h2>
                <button className='cancelBtn' onClick={onCancelhandler}>Cancel</button>
            </div>
            <form className='form' >
                <img src="src\Components\asset\git.png" alt="" style={{ width: "35px" }} /><span >Full Name</span>
                <input type="text" ref={nameInputRef} />
                <img src="src\Components\asset\url.png" alt="" style={{ width: "35px" }} /> <span>Profile Photo URL</span>
                <input type="text" name="" id="" ref={urlInputRef} />

                </form>
                <button className='updateBtn' onClick={onClickHandle}>Update</button>


        </div>
    );
}

export default ProfilePage;
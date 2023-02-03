import React from 'react';
import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SignUpForm(props) {

    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const confirmPasswordInputRef = useRef()



    const onSubmitHandler = (e) => {
        e.preventDefault();
        const emailInput = emailInputRef.current.value;
        const passwordInput = passwordInputRef.current.value;
        const confirmPasswordInput = confirmPasswordInputRef.current.value;
        console.log(emailInput + " " + passwordInput + " " + confirmPasswordInput);

        if (passwordInput === confirmPasswordInput) {
            console.log("password are same")

            fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqfrReMNu5wYBdFb8N8TIcd6T0X2_NsjA", {
                method: 'POST',
                body: JSON.stringify({ email: emailInput, password: passwordInput, returnSecureToken: true }),
                headers: { 'Content-Type': 'application/json' },

            }).then((res) => {
                if (!res.ok) {
                    return res.json().then((res) => {
                        alert(res.error.message)
                    })

                } else {
                    alert("You Account Created Successful")
                }


            }
            )
        } else {
            alert("password and Confirm Password Should Be match")
            console.log("password are Not same")

        }

    }


    return (
        <div>

            <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={emailInputRef} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={passwordInputRef} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>ConFirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" ref={confirmPasswordInputRef} />
                </Form.Group>

                <Button variant="primary" type="submit"> Submit </Button>
            </Form>

        </div>
    );
}

export default SignUpForm;
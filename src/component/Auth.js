
import React, { useRef, useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import {Alert, Button, Container, Form } from "react-bootstrap";
import {useDispatch} from 'react-redux'
import { authAction } from "../store/auth";
import { useHistory } from "react-router-dom";

const Auth = () => {
  const email = useRef();
  const password = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    email.current.value = '';
    password.current.value = '';
  }, [isLogin]);

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    try {
      let url;
      if (isLogin) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBMlN6Z7bLS8K0WvQ_gg_P6hnGErTnyzIo';
      } else {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBMlN6Z7bLS8K0WvQ_gg_P6hnGErTnyzIo';
      }

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      console.log("Authentication succeed" , data)
     
      if (!response.ok) {
        throw new Error(data.error.message || 'Authentication Failed');
      }

      
      dispatch(authAction.login({userId: data.userId, email: data.email}));
      history.replace('/');

      setError(null);

    } catch (error) {
        console.log(error)
      setError(error.message);

    }
  }

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const enteredEmail = email.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBMlN6Z7bLS8K0WvQ_gg_P6hnGErTnyzIo', {
      method: 'POST',
      body: JSON.stringify({
        requestType: 'PASSWORD_RESET',
        email: enteredEmail,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Update failed');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Update successful:', data);
      })
      .catch((error) => {
        console.error('Update failed:', error.message);
      });
  };

  return (
    <Container  className="d-flex align-items-center justify-content-center vh-100" >
      <Card className="shadow " style={{ width: '25rem', backgroundColor: '#cafad7'}}>
        <Card.Title style={{ textAlign: "center", margin:"1rem" }}>{isLogin ? 'Login' : 'Signup'}</Card.Title>
        <Form onSubmit={submitHandler} style={{ margin: "1rem" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={email} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={password} required />
          </Form.Group>

          <Button variant="outline-*" type="button" onClick={handleForgotPassword} style={{marginLeft:'6.8rem'}}>
               Forgot Password
          </Button>

          <Button style={{ marginLeft: "9rem", marginTop:'1rem' }} variant="primary" type="submit">
            {isLogin ? 'Login' : 'Signup'}
          </Button>

          <Button variant="link" type="button" style={{marginLeft: isLogin ? '5.8rem': '4.4rem'}} onClick={switchAuthModeHandler} >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </Button>
        </Form>

        {error && <Alert variant="danger" style={{margin:"1rem", textAlign:'center'}}>{error}</Alert>}
      </Card>
    </Container>
  );
}

export default Auth;

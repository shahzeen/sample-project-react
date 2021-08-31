import {React, useEffect, useState} from 'react';
import {Container, Row, Col, Form, Button, Spinner, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuth from '../UseAuth';
function Login() {
 const [login,logout,isLoading] = useAuth(false);
 const [user,setUser] = useState('');
 const [pass,setPass] = useState('');
 const [isLogin,setIsLogin] = useState('');

 useEffect(()=>{
   if(isLoading) {
    login(user,pass)
    .then((data)=>{
      setIsLogin(data);
    });
   }
 });

 const handleUser=(e)=>{
   setUser(e.target.value)
  }
  const handlePass=(e)=>{
    setPass(e.target.value)
   }

   const submit = () =>{
    login(user,pass);
   }
  return (
    <Container>
      <Row className="justify-content-md-center align-items-center">
      <Col xs lg="4">
      <h2 className="form-head text-center">Login</h2>
      <Form className="login-form">
      <Form.Group controlId="email">
        {/* <Form.Label>Email address</Form.Label> */}
        <Form.Control required size="lg" type="email" placeholder="Enter email" onChange={handleUser}/>
      </Form.Group>
      <Form.Group controlId="password">
        {/* <Form.Label>Password</Form.Label> */}
        <Form.Control required size="lg" type="password" placeholder="Enter Password" onChange={handlePass}/>
      </Form.Group>
      <Form.Group controlId="submit" className="text-center mb-5">
        <Button variant="primary" size="lg" onClick={submit}>Login</Button>
      </Form.Group>
      {isLogin==='error' &&
          <Alert variant="danger">
          Incorrect user id and password!
        </Alert>
        }
      </Form>
        </Col>
        </Row>
        {isLoading && 
        <div className="loader-screen">
        <Spinner animation="grow" />
        </div>
        }
        </Container>
  );
}

export default Login;

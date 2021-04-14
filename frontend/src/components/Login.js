import React, { useEffect } from 'react'
import{Link, useHistory} from 'react-router-dom'
import{useState} from 'react'
import {Button, Form, Col, Row, Container} from 'react-bootstrap'
import { Data } from '@react-google-maps/api'
const LogIn = ()=>{
    const history = useHistory()
    const [email, setEmail] = useState()
    const [password, setPassowrd] = useState()
    const[isLoading, setLoading] = useState(false)
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        setLoading(true)
        fetch('https://jumbogps-t2-backend.herokuapp.com/user/login',{
            method: "post",
            headers:{
                "Content-type": "application/json"
            },
            body : JSON.stringify({
                
                email : email,
                password :password,
            })
        }).then(res=>{
            if(res.status==201){
                return res.json()
            }else{
                throw new Error("Login failed")
            }
        })
        .then((data)=>{
            // console.log(data)
            if(data.status == "Login Successful"){
                // M.toast({html : data.message , classes : "green darken-1"})
                localStorage.setItem('user', data.token)
                history.push('/')
            }else{
                throw new Error("Login Failed")
            }
            setLoading(false)
        }).catch((err)=>{
            alert(err)
            setLoading(false)
        })
    }
    const handleChangeEmail = (e)=>{
        setEmail(e.target.value)
    }
    const handleChangePassword = (e)=>{
        setPassowrd(e.target.value)
    }
    
    return (
        <Container>
            <Row>
                <Col xs={10} md={6} className="mx-auto">
                <Form onSubmit={handleSubmit} className="mx-auto mt-5 px-auto shadow p-3 mb-5 bg-white rounded">
                    <h5 className="justify-content-center d-flex">
                        LogIn
                    </h5>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required={true} onChange={handleChangeEmail} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required={true} minlength="8" onChange={handleChangePassword} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button className="justify-content-center d-flex mx-auto" variant="primary" disabled={isLoading} type="submit">
                        Submit
                    </Button>
                </Form>
                <h5 className="justify-content-center d-flex">
                    <Link to="/signup" > Don't have an account? SignUp </Link>
                </h5>
                </Col>
            </Row>
        </Container>
            
    )
}
export default LogIn;
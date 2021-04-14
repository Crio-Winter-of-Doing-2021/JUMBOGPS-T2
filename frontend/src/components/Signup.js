import React, { useEffect } from 'react'
import{Link, useHistory} from 'react-router-dom'
import{useState} from 'react'
import {Button, Form, Col, Row, Container} from 'react-bootstrap'
const SignUp = ()=>{
    const history = useHistory()
    const [email, setEmail] = useState()
    const [password, setPassowrd] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const[isLoading, setLoading] = useState(false)
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        setLoading(true)
        fetch('https://jumbogps-t2-backend.herokuapp.com/user/signUp',{
            method: "post",
            headers:{
                "Content-type": "application/json"
            },
            body : JSON.stringify({
                
                email : email,
                password :password,
                confirmPassword : confirmPassword,
            })
        }).then(res=>{
            // console.log(res)
            if(res.status==201){
                return res.json()
            }else{
                throw new Error("Email id already exists")
            }
        })
        .then((data)=>{
            // console.log(data)
            if(data.status == "Registration Successful"){
                // M.toast({html : data.message , classes : "green darken-1"})
		alert("Successful")
                history.push('/login')
            }else{
                // M.toast({html : data.message , classes : "red darken-1"})
                
            }
            setLoading(false)
        }).catch((err)=>{
            // console.log(err)
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
                        SignUp
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
                    <Link to="/login" > Already have an account? SigIn </Link>
                </h5>
                </Col>
            </Row>
        </Container>
            
    )
}
export default SignUp;

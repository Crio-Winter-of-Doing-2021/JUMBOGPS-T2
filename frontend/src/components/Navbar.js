import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Nav, Navbar} from 'react-bootstrap'
const NavbarN = ()=>{
  let history = useHistory()
    let isLogged = false
    // console.log('navvvvv')
    if(localStorage.getItem('user')){
      isLogged = true
    }else{
        isLogged = false
    }
    // useEffect(()=>{
    //   console.log("Navbar")
    //     if(localStorage.getItem('user')){
    //         setLogged(true)
    //     }else{
    //         setLogged(false)
    //     }
    // }, [])
    const logout = ()=>{
      localStorage.removeItem('user')
      history.push('/login')
    }
    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Jumbotail</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                {!isLogged &&  <Nav.Link><Link to='/signup'>SignUp</Link></Nav.Link>}
                {!isLogged &&  <Nav.Link><Link to='/login'>LogIn</Link></Nav.Link>}
                {isLogged &&  <Nav.Link><Link to='/'>Home</Link></Nav.Link>}
                {isLogged &&  <Nav.Link><Link to='/history'>History</Link></Nav.Link>}
                {isLogged &&  <Nav.Link><Link to='/geoRoute'>Geo Route</Link></Nav.Link>}
                {/* {isLogged &&  <Nav.Link><Link to='/geofencing'>Geofence</Link></Nav.Link>}   */}
                {isLogged &&  <Nav.Link onClick={logout}>Logout</Nav.Link>}           
              </Nav>
            </Navbar.Collapse>
      </Navbar>
      
    )
}
export default NavbarN

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation
} from "react-router-dom";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
// import * as parkData from "./data/skateboard-parks.json";
// import mapStyles from "./mapStyles";
import Filter from './components/Filter'
import History from './components/History'
import GeoFencing from './components/GeoFencing'
import GeoRoute from './components/GeoRoute'
//import {Nav, Navbar} from 'react-bootstrap'
import BellIcon from 'react-bell-icon';
import SignUp from "./components/Signup";
import LogIn from "./components/Login";
import NavbarN from './components/Navbar'

const MapWrapped = withScriptjs(withGoogleMap(Map));
const Main = ()=>{
  let history = useHistory()
  let location = useLocation()
  const [isLogged, setLogged] = useState(false)
  // console.log("Main")
  // if(localStorage.getItem('user')){
  //   setLogged(true)
  //   history.push('/')
  // }
  useEffect(()=>{
    // console.log("jiji1", localStorage)
    // localStorage.removeItem('user')
    if(localStorage.getItem('user')){
      // console.log("jiji2")
      history.push('/')
    }else{
      // console.log("jiji3")
      if(location.pathname != '/signup' && location.pathname != '/login'){
        history.push('/signup')
      }
    }
  },[])
  return(
    <div>
      {/* {console.log('Navbar*****')} */}
      <NavbarN />
      <Switch>
      <Route path={["/history/:id", "/history"]}>
             <History />
           </Route>
           <Route path="/geofencing">
             <GeoFencing />
           </Route>
           <Route path="/geoRoute">
             <GeoRoute />
           </Route>
           <Route path="/signup">
             <SignUp />
           </Route>
           <Route path="/login">
             <LogIn />
           </Route>
           <Route path="/">
             <Filter />
           </Route>
      </Switch>
    </div>
 
  )
}
export default function App() {
  // console.log('APp')
  return (
    <Router>
      <Main />
  
    </Router>
    // <History />
  );
}

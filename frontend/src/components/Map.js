import React, {useEffect, useState} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import {Link} from 'react-router-dom'
const MapContainer = (props) => {
  // console.log(props)
  useEffect(()=>{
    setShowInfoWindow(null)
  }, [props.rMarker])
  const mapStyles = {        
    height: "90vh",
    borderRadius:"19px",
    margin:"auto",
    // width: "80vw"
  };
    
      // console.log(props)
  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }
  const [showInfoWindo, setShowInfoWindow] = useState(null)
  const handleMarkerClick = (loc)=>{
    setShowInfoWindow(loc)
    // console.log(showInfoWindo)
  }
  // const [rMarker, setMarker] = useState([])
  // const handleClick = ()=>{
  //       setMarker([locations[Math.ceil(Math.random()*4)]])
  // }
  // console.log(props.rMarker)
  return (
    <div>
         <LoadScript
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={props.rMarker && props.rMarker.length>0 ? {lat : +props.rMarker[0].lat, lng : +props.rMarker[0].lng} : defaultCenter} >
          {/* {console.log(props)} */}
         {
            props.rMarker.map((item, index) => {
              return (
              <Marker key={item.name} position={item} onClick={()=>{handleMarkerClick(item)}}>
                {showInfoWindo && showInfoWindo.lat==item.lat && showInfoWindo.lng==item.lng &&( 
                <InfoWindow 
                  onCloseClick={() => {
                    setShowInfoWindow(null);
                  }}
                  position={{
                    lat: showInfoWindo.lat,
                    lng: showInfoWindo.lng
                  }}>
                    <div>
                    {props.showMarker && <div>Asset ID - {props.infoArr[index].id}</div>}
                    {props.showMarker && <div>Asset Type - {props.infoArr[index].type}</div>}
                    {props.showMarker && <div>Asset Status - {props.infoArr[index].status}</div>}
                    {(props.showMarker || props.showTimeStamp) && <div>Latitude - {item.lat}</div>}
                    {(props.showMarker || props.showTimeStamp) && <div>Longitude - {item.lng}</div>}
                    {props.showMarker && <div><Link to={`/history/${props.infoArr[index].id}`}>Go To History</Link></div>}
                    {(props.showTimeStamp) && <div>Time Stamp - {props.timeStampArr[index].timestamp}</div>}
                    </div>
                </InfoWindow>)}
              </Marker>
              )
            })
         }
     </GoogleMap>
     </LoadScript>
     
    </div>
  )
}
export default MapContainer;
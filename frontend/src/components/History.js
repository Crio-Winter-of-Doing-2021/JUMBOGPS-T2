import React , {useEffect, useState} from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import {Container, Row, Col, Form, Table, Collapse, Button} from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import MapContainer from './Map'
const History = ()=>{
    const mapStyles = {        
        height: "50vh",
        width: "100%"};
        
  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }
  const [assetId, setAssetID] = useState('')
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [trips, setTrips] = useState([])
  const [tripsObj, setTripsObj] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAssetDetailButton, setShowAsset] = useState(false) 
  const [assetDetail, setAssetDetail] = useState([])  
  const [open, setOpen] = useState(false);
  const {id} = useParams()
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  useEffect(()=>{
    // console.log(id)
    if(id){
      setLoading(true)
      setAssetID(id)
      fetch('https://jumbogps-t2-backend.herokuapp.com/assets?id='+id, {
        method : 'GET',
        headers : {
          'authorization' : 'bearer '+localStorage.getItem('user'),
          'Content-Type' : 'application/json'
        }
      }).then(res => res.json())
        .then((data)=>{
          // console.log(data)
          if(data.length==0){
            alert("No Such Asset is present")
            setShowAsset(false)  
            setTrips([])
            setTripsObj([])
            setSelectedTrip({
              name : '',
              rMarker : []
          })
          setLoading(false)
            return
          }
          
          setAssetDetail(data)
          setShowAsset(true)
          setTripsObj(data[0].history)
          setLoading(false)
        }).catch((err)=>{
          console.log("invalid")
          alert("Invalid asset Id")
          setTrips([])
          setSelectedTrip(null)
          // setAssetID(data[0].id)
          setTripsObj({})
          setLoading(false)
          setShowAsset(false) 
        })
      }else{
        setLoading(false)
      }
  }, [])
  const handleDropDownClick = (event)=>{
    //setMarker to array corresponding to 'trip'
    if(event.target.value!=='---'){

      setSelectedTrip({
        name : event.target.value,
        rMarker : tripsObj[event.target.value].map((item)=>{return {lat : +item.lt, lng : +item.lg}}),
        timeStamp : tripsObj[event.target.value].map((item)=>{return {timestamp : item.timeStamp.split('.')[0]}})
    })
    }
    // console.log("selectedTrip")
  }
  const handleAssetType = (event)=>{
    setAssetID(event.target.value)
  }
  const handleDateSubmit = (e)=>{
    e.preventDefault()
    setLoading(true)
    let d1 = new Date(startDate)
    let d2 = new Date(endDate)
    let tripsArr = []
    let data = tripsObj
    for(let trip in data){
      // console.log(trip)
      if(data[trip].length!=0){
        let length = data[trip].length
        let start = new Date(data[trip][0].timeStamp)
        let end = new Date(data[trip][length - 1].timeStamp)
        // console.log(start, end, d1, d2, data[trip][0].timestamp, data[trip][length-1].timestamp)
        if( start.getTime()>=d1.getTime() && end.getTime()<=d2.getTime()){
          tripsArr.push(trip)
        }
      }
    }
    if(tripsArr.length == 0){
      alert('No trips for this asset exists')
    }
    setTrips(tripsArr)
    setSelectedTrip(null)
    // setAssetID(data[0].id)
    setLoading(false)
  }
  const startDateChange = (e)=>{
    setStartDate((e.target.value))
  }
  const endDateChange = (e)=>{
    setEndDate((e.target.value))
  }
  const handleSubmit = (e)=>{
    // console.log("hello", assetId)
    e.preventDefault()
    setLoading(true)
    fetch('https://jumbogps-t2-backend.herokuapp.com/assets?id='+assetId, {
      method : 'GET',
      headers : {
        'authorization' : 'bearer '+localStorage.getItem('user'),
        'Content-Type' : 'application/json'
      }
    }).then(res => res.json())
      .then((data)=>{
        // console.log(data)
        if(data.length==0){
          alert("No Such Asset is present")
          setShowAsset(false)  
          setTrips([])
          setTripsObj([])
          setSelectedTrip({
            name : '',
            rMarker : []
        })
        setLoading(false)
          return
        }
        setShowAsset(true)
        setAssetDetail(data)
        setTripsObj(data[0].history)
        setLoading(false)
      }).catch((err)=>{
        console.log("invalid")
        alert("Invalid asset Id")
        setTrips([])
        setSelectedTrip(null)
        // setAssetID(data[0].id)
        setTripsObj({})
        setLoading(false)
        setShowAsset(false) 
      })
  }
    return(
    <Container>
     <Row>
     <Col md={4} xs={11} className="mt-5 mx-auto">
     <Form onSubmit={handleSubmit} className="mx-auto px-auto shadow p-3 mb-5 bg-white rounded">
             <h3 className="mx-auto d-flex justify-content-center"> Search by Asset ID</h3>
             <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">ID</span>
              </div>
              <input type="number" value={assetId} className="form-control" onChange={handleAssetType} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
              
            </div>
            
          <button  className="mx-auto d-flex justify-content-center btn btn-primary" type="submit">Submit</button>
         </Form>
      </Col>
       <Col md={4} xs={11} className="mt-5 mx-auto">
     <Form onSubmit={handleDateSubmit} className="mx-auto px-auto shadow p-3 mb-5 bg-white rounded">
             <h3 className="mx-auto d-flex justify-content-center"> Date Filter</h3>
             <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">Start Date</span>
              </div>
              <input type="date" placeholder="Start Date" value={startDate} className="form-control" onChange={startDateChange} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
              
              {/* <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">End Date</span>
              </div>
              <input type="date" placeholder="End Date" value={endDate} className="form-control" onChange={endDateChange} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" /> */}
              
            </div>
            <div className="input-group mb-3">
              
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">End Date</span>
              </div>
              <input type="date" placeholder="End Date" value={endDate} className="form-control" onChange={endDateChange} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
              
            </div>
          <button  className="mx-auto d-flex justify-content-center btn btn-primary" type="submit">Submit</button>
         </Form>
      </Col>
     <Col md={4} xs={11} className="mx-auto">
     {
        loading ? 
        <div class="d-flex justify-content-center">
          <div class="spinner-grow text-success" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        :
        (<div className="mx-auto px-auto shadow p-3 mt-5 mb-5 bg-white rounded" style={{height:"165px"}} >
        <h3 className="d-flex justify-content-center">Select Trip:</h3>
              
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" for="inputGroupSelect01">Trips</label>
              </div>
              <select onChange={handleDropDownClick} className="custom-select" id="inputGroupSelect01">
                <option selected>Choose...</option>
                {trips.map((trip)=>{
                  return(
                  <option value={trip}>{trip}</option>
                )
              })}
              </select>
            </div>
        </div>
     )
    }   </Col>
    </Row>
    {showAssetDetailButton && assetDetail.length!=0 && (
      <Row>
        <Col className="mx-auto" md={6} xs={11}>
        <div className="text-center">
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            className="mb-2"
          >
            {open ? "Hide Details" : "Show Details"}
          </Button>
        </div>
        <Collapse in={open}>
          <div id="example-collapse-text">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Asset Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {assetDetail.map((asset)=>{
                return(
                  <tr>
                    <td>{asset.id}</td>
                    <td>{asset.name}</td>
                    <td>{asset.type}</td>
                    <td>{asset.status}</td>
                  </tr>
                    )
              })}
            </tbody>
          </Table>
          </div>
        </Collapse>
        </Col>
    </Row>
    )}
        <Row >
          <Col md={12} xs={12} className="mx-auto">
          {loading ? (
          <div class="d-flex justify-content-center">
          <div class="spinner-grow text-success" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
          ) : (
            <div>
              
        <MapContainer rMarker={selectedTrip ? selectedTrip.rMarker : []} showMarker={false} showTimeStamp={true} timeStampArr={selectedTrip ? selectedTrip.timeStamp : []}/>
            </div>
          )
        }</Col>
        </Row>
    </Container>
    )
}
export default History
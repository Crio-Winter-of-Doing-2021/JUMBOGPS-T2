import React ,{useState}from 'react'
import {Form, Button, Col, Container, Row, ToastBody} from 'react-bootstrap'
import GeoFencing from "./GeoFencing";
const GeoRoute = ()=>{
    const [newAsset, setNewAsset] = useState(false)
    const [assetId, setAssetId] = useState(null)
    const [tripName, setTripName] = useState('')
    const [sLocation, setSLocation] = useState({lat:0, lng:0})
    const [dLocation, setDLocation] = useState({lat:0, lng:0})
    const [loading, setLoading] = useState(false)
    const [assetType, setAssetType] = useState(null)
    const [selectedSD, setSelectedSD] = useState("")
    const handleRadioClick= (arg)=>{
        setNewAsset(arg)
    }
    const handleTypeRadioClick= (arg)=>{
        setAssetType(arg)
    }
    const handleTripChange = (event)=>{
        setTripName(event.target.value)
    }
    const handleAssetId=(event)=>{
        setAssetId(event.target.value)
    }
    const handleSubmit=(e)=>{
        setLoading(true)
        let body = {
            assetId : !newAsset ? assetId : null,
            tripName,
            sLocation, 
            dLocation,
            assetType : !newAsset ? assetType: null
        }
        // console.log(body)
        const option = {
            method : 'PUT',
            headers : {"Content-type" : "application/json"},
            body : JSON.stringify(body)
        }
        e.preventDefault()
        fetch('https://jumbogps-t2-backend.herokuapp.com/changeStatus', option).then(res => res.json())
      .then((data)=>{
        
        // console.log(data)
        setLoading(false)
      }).catch((err)=>{
        //   console.log(err)
        setLoading(false)
      })
        // console.log("kiki")

    }
    const handleSLat=(event)=>{
        setSLocation({lat : event.target.value, lng : sLocation.lng})
    }
    const handleSLng=(event)=>{
        setSLocation({lat : sLocation.lat, lng : event.target.value})
    }
    const handleS=(event)=>{
        setSLocation({lat : event.target.lat, lng : event.target.lng})
    }
    const handleD=(event)=>{
        setDLocation({lat : event.target.lat, lng : event.target.lng})
    }
    const handleDLat=(event)=>{

        setDLocation({lat : event.target.value, lng : dLocation.lng})
    }
    const handleDLng= (event)=>{
        setDLocation({lat : dLocation.lat, lng : event.target.value})

    }
    const handleSDClick=(SD)=>{
        // console.log(SD)
        setSelectedSD(SD)
        // console.log(selectedSD)
    }
    return(
        <Container>
            <Row className="justify-content-md-around"> 
                <Col md={4} xs={11} className="mx-auto">
                <div  className="mx-auto shadow p-3 mb-5 mt-5 bg-white rounded">
                <h3 className="mx-auto d-flex justify-content-center"> Specify Route Details</h3>
            <Form onSubmit={handleSubmit}>
            <Form.Check 
                type="radio"
                label="New Asset"
                checked={newAsset ? "checked" : ""}
                onClick={()=>{
                    handleRadioClick(true)
                }}
            />
            <Form.Check 
                type="radio"
                label="Old Asset"
                checked={newAsset ? "" : "checked"}
                onClick={()=>{
                    handleRadioClick(false)
                }}
            />

               {!newAsset && (
                   <Form.Group controlId="">
                   <Form.Label>Asset ID</Form.Label>
                   <Form.Control required={!newAsset} type="number" placeholder="Enter Asset Id" value={assetId} onChange={handleAssetId} />
               </Form.Group>
               )}
            {newAsset && (
            <Form.Group controlId="">
                       {/* <br /> */}
                       <br/>
                   <Form.Label>Asset Type</Form.Label>
                <Form.Check 
                    type="radio"
                    label="Person"
                    name="type"
                    required
                    checked={assetType=="Person" ? "checked" : ""}
                    onClick={()=>{
                        handleTypeRadioClick("Person")
                    }}
                />
                <Form.Check 
                    type="radio"
                    label="Vehicle"
                    name="type"
                    required
                    checked={assetType=="Vehicle" ? "checked" : ""}
                    onClick={()=>{
                        handleTypeRadioClick("Vehicle")
                    }}
                />
                <Form.Check 
                    type="radio"
                    label="Other"
                    name="type"
                    required
                    checked={assetType=="Other" ? "checked" : ""}
                    onClick={()=>{
                        handleTypeRadioClick("Other")
                    }}
                />
               </Form.Group>

                
            )}
                <Form.Group controlId="">
                    <Form.Label>Trip Name</Form.Label>
                    <Form.Control required type="text" placeholder="Enter Trip Name" value={tripName} onChange={handleTripChange} />
                </Form.Group>
                <Form.Check 
                    type="radio"
                    label="Source"
                    checked={selectedSD=="s" ? "checked" : ""}
                    onClick={()=>{
                        handleSDClick((selectedSD=="s" ? "" : "s"))
                    }}
                />
                <Form.Check 
                    type="radio"
                    label="Destination"
                    checked={selectedSD=="d" ? "checked" : ""}
                    onClick={()=>{
                        handleSDClick((selectedSD=="d" ? "" : "d"))
                    }}
                />
                <Form.Group controlId="">
                    <Form.Label>Source</Form.Label>
                    <Form.Control required  type="number" onChange={handleSLat} value={sLocation.lat} step="any" placeholder="Latitiude" />
                    <Form.Control required type="number" onChange={handleSLng} value={sLocation.lng} step="any" placeholder="Longitude" />
                </Form.Group>
                <Form.Group controlId="">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control required type="number" onChange={handleDLat} value={dLocation.lat} step="any" placeholder="Latitiude" />
                    <Form.Control required type="number" onChange={handleDLng} value={dLocation.lng} step="any" placeholder="Longitude" />
                </Form.Group>
                <Button disabled={loading} variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>
        </div>
                </Col>
                <Col md={8} xs={11}>
                    <div className="mb-5 mt-5" >
                        <GeoFencing selectedSD={selectedSD} handleS={handleS} handleD={handleD}  />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default GeoRoute
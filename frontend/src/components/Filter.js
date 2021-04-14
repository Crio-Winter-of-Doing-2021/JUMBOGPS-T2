import React, {useState, useEffect} from 'react'
// import { Formik, Field, Form } from 'formik';
import {Row, Col, Container, Form, Button, Collapse, Table} from 'react-bootstrap'
import MapContainer from './Map'
import '../App.css'
function Filter(){
    const [loading, setLoading] = useState(true)
    
  const [assetId, setAssetID] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [idArr, setIDArr] = useState([])
  const [showAssetDetailButton, setShowAsset] = useState(false) 
  const [assetDetail, setAssetDetail] = useState([])  
  const [open, setOpen] = useState(false);
    const defaultCenter = {
        lat: 41.3851, lng: 2.1734
      }
      const locations = [
        {
          name: "Location 1",
          location: { 
            lat: 41.3954,
            lng: 2.162 
          },
        },
        {
          name: "Location 2",
          location: { 
            lat: 41.3917,
            lng: 2.1649
          },
        },
        {
          name: "Location 3",
          location: { 
            lat: 41.3773,
            lng: 2.1585
          },
        },
        {
          name: "Location 4",
          location: { 
            lat: 41.3797,
            lng: 2.1682
          },
        },
        {
          name: "Location 5",
          location: { 
            lat: 41.4055,
            lng: 2.1915
          },
        }
      ];
      const handleAssetId = (event)=>{
        setAssetID(event.target.value)
      }
      const handleRadioClick = (type)=>{
        setTypeFilter(type)
      }
      useEffect(()=>{
          fetch('https://jumbogps-t2-backend.herokuapp.com/assets',{
            method : 'GET',
            headers : {
              'authorization' : 'bearer '+localStorage.getItem('user'),
              'Content-Type' : 'application/json'
            }
          }).then(res => { return res.json()})
          .then((data)=>{
            // console.log(data)
            if(data.length==0){
              alert("No Asset is present")  
              setMarker([])
              setIDArr([])
              setShowAsset(false)
              setLoading(false)
              return
            }
            let activeArr = data.filter((item)=>{return item.status!=="non-active"})
              if(activeArr.length==0){
                setMarker([])
                setIDArr([])
                alert("Asset is not active")
              }else{
              let arr = []
              activeArr.forEach((item)=>{
                arr.push({
                  lat : +item.currLocation.lt,
                  lng : +item.currLocation.lg
                })
              })
              
              setIDArr(activeArr)
              setMarker(arr)
            }
            setAssetDetail(activeArr)
            setShowAsset(true)
            setLoading(false)
          })
      }, [])
      const [rMarker, setMarker] = useState([])
      const handleSubmit = (e)=>{
        e.preventDefault()
        // console.log(typeFilter)
            setLoading(true)
            fetch('https://jumbogps-t2-backend.herokuapp.com/assets?type='+typeFilter , {
              method : 'GET',
              headers : {
                'authorization' : 'bearer '+localStorage.getItem('user'),
                'Content-Type' : 'application/json'
              }
            }).then(res => {  return res.json()})
            .then((data)=>{
            // console.log(data)
            if(data.length==0){
              alert("No Such Asset is present")  
              setMarker([])
              setIDArr([])
              setShowAsset(false)
              setLoading(false)
              return
            }
            
            // if(Object.keys(data[0].currLocation).length === 0){
              let activeArr = data.filter((item)=>{return item.status!=="non-active"})
              if(activeArr.length==0){
                setMarker([])
                setIDArr([])
                alert("Asset is not active")
              }else{
              let arr = []
              activeArr.forEach((item)=>{
                arr.push({
                  lat : +item.currLocation.lt,
                  lng : +item.currLocation.lg
                })
              })
              
              setIDArr(activeArr)
              setMarker(arr)
            }
            setAssetDetail(activeArr)
            setShowAsset(true)
            setLoading(false)
          })
      }
      const handleIdClick = (e)=>{
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
              setMarker([])
              setIDArr([])
              setShowAsset(false)
              setLoading(false)
              return
            }
            if(data[0].status === 'non-active'){
              alert("Asset is not active")
              setIDArr([])
              setMarker([])
            }else{
              // console.log("else")
              let arr = []
              data.forEach((item)=>{
                arr.push({
                  lat : +item.currLocation.lt,
                  lng : +item.currLocation.lg
                })
              })
              setIDArr(data)
              setMarker(arr)
            }
            setAssetDetail(data)
            setShowAsset(true)
            setLoading(false)
          }).catch((err)=>{
            console.log("invalid")
            alert("Invalid asset Id")
            setIDArr([])
            setMarker([])
            setShowAsset(false)
            setLoading(false)
          })
  }
      // console.log(rMarker)
      const typeArr = ['Person', 'Vehicle', 'Other']
    return(
      <Container className="mt-4">
          <Row>
            <Col md={5} xs={11} className="mt-5 mx-auto">
            <Form onSubmit={handleIdClick}  className="mx-auto px-auto shadow p-3 mb-5 bg-white rounded h-auto">
             <h3 className="mx-auto d-flex justify-content-center"> Search by Asset ID</h3>
             <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">ID</span>
              </div>
              <input onChange={handleAssetId} type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
              
            </div>
            
          <button disabled={loading ?true : false} className="mx-auto d-flex justify-content-center btn btn-primary" type="submit">Submit</button>
         </Form>
            </Col>
            <Col md={5} xs={11} className="mt-5 mx-auto" >
            <Form className="mx-auto px-auto shadow p-3 mb-5 bg-white rounded" style={{height:"165px"}}  onSubmit={handleSubmit}>
            <h3 className="d-flex justify-content-center">Search By Asset Type</h3>
            <div className="mx-auto mt-3 mb-2  d-flex justify-content-center">
            {typeArr.map((item)=>{
              return(
                <Form.Check
                className="mr-2" 
                name="type"
                type="radio"
                required
                label={item}
                onClick={()=>{
                    handleRadioClick(item)
                }}
            />
              )
            })}
            </div>
                <Button className="mx-auto d-flex justify-content-center" disabled={loading ?true : false} variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>
         </Col>
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
            <Row>
            <Col md={12} xs={12} className="mx-auto">
          {loading ? 
          <div class="d-flex justify-content-center">
          <div class="spinner-grow text-success" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
          :
          
           <MapContainer rMarker={rMarker} showMarker={true} infoArr={idArr}/>
          }
            </Col>
          
            </Row>
      </Container>
    )
}
export default Filter
//  <Formik
//       initialValues={{
//         toggle: false,
//         checked: [],
//       }}
//       onSubmit={ ( values) => {
//         // e.preventDefault()
//         handleClick(values)
//       }}
//     >
//       {({ values }) => (
//         <Form className="mx-auto px-auto shadow p-3 mb-5 mt-5 bg-white rounded">
         
//           <div role="group"  aria-labelledby="checkbox-group">
//             <h3 className="mx-auto d-flex justify-content-center"> Search by Asset Type</h3>
//             <div className="mx-auto d-flex justify-content-center">
//             <label>
//               <Field type="checkbox" name="checked" value="Person" />
//               Person
//             </label>
//             <label>
//               <Field type="checkbox" name="checked" value="Vehicle" />
//               Vehicle
//             </label>
//             <label>
//               <Field type="checkbox" name="checked" value="Other" />
//               Other
//             </label>
//             </div>
//           </div>

//           <button disabled={loading ?true : false} className="mx-auto d-flex justify-content-center btn btn-primary" type="submit">Submit</button>
//         </Form>
//       )}
//     </Formik>
          
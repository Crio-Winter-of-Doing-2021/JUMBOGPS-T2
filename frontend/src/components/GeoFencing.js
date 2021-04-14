import React, {useEffect} from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import * as turf from '@turf/turf'
import MapboxDraw from "@mapbox/mapbox-gl-draw";
mapboxgl.accessToken = 'pk.eyJ1IjoicmFqazExMjEiLCJhIjoiY2ttb2UzZzRqMTBkYzJ3bjNxaDlweTBkOSJ9.K9d8LUGy_nbWXgjLnU4qdg';
// mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
var map, draw, points, done = false, selectedSD
const GeoFencing = (props)=>{
    // console.log(props)
    selectedSD = props.selectedSD
    const handleSDLat =(evt)=>{
                if(selectedSD=="s"){
                    // console.log("S")
                    props.handleS({target : {lat : evt.lngLat.lat, lng : evt.lngLat.lng}})
                }else if(selectedSD=="d"){
                    // console.log("D")
                    props.handleD({target : {lat : evt.lngLat.lat, lng : evt.lngLat.lng}})
                }
    }
    useEffect(()=>{
        

        map = new mapboxgl.Map({
        container: 'mapbox',
        style: 'mapbox://styles/mapbox/streets-v9',
        });
         
        draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true
            }
        });
        map.on('click', (evt) => {
            // console.log("click")
            if(done){
                // console.log(evt.lngLat);
                let pt = turf.point([evt.lngLat.lat, evt.lngLat.lng])
                setTimeout(()=>{
                    // console.log(pt)
// console.log(turf.polygon(points))
                    // console.log(turf.inside(pt, turf.polygon(points)))
                }, 1000)
            }else{
                // console.log("else","****************")
                handleSDLat(evt)
            }
        })
        
       map.addControl(draw);
       
       map.on('draw.create', createArea);
       map.on('draw.delete', deleteArea);
       map.on('draw.update', updateArea);
    },[])
    

    const drawPolygon = (points) => {
        map.addLayer({
            'id': 'maine',
            'type': 'fill',
            'source': {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': points
                    }
                }
            },
            'layout': {},
            'paint': {
                'fill-color': '#088',
                'fill-opacity': 0.3
            }
        });
    }
    
    const createArea = (e)=> {
          done = false
          let data = draw.getAll();
          const polygonData = data.features[0].geometry.coordinates;
        //   console.log(polygonData)
          let x = polygonData[0].map((item)=>{
              return [item[1], item[0]]
          })
          points = []
          points.push(x)
        //   console.log(points)
          done = true
          drawPolygon(polygonData);
    }
    

    
    const deleteArea=(e) => {
         let data = draw.getAll();
         map.removeLayer('maine').removeSource('maine');
         done=false
    }
    const updateArea = (e) => {
          let data = draw.getAll();
          map.removeLayer('maine').removeSource('maine');
          const polygonData = data.features[0].geometry.coordinates;
          drawPolygon(polygonData);
    }
return(
    
    <div id="mapbox" style={{borderRadius:"19px",height: "95vh",width:"auto"}}>Hello</div>

)
}
export default GeoFencing

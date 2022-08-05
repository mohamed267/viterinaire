import {useState, useEffect , useRef , useMemo} from "react"
import {Link} from "react-router-dom"
import {useSelector } from 'react-redux'
import { MapContainer, TileLayer, Marker , Popup , useMap  , Circle } from 'react-leaflet'
import {getForms , getMapForms, initForm } from "../../store/formReducer"
import "./map.scss"

const MapComponent = ()=>{
    
    const region = useSelector(state=>state.region)
    const forms = useSelector(state=>state.form.mapForms)

    
    

    

    

    const LocationMarker =()=>   {
        const [circleRegion , setCircleRegion]  =useState(null)
        const markerRef = useRef(null)
        const map = useMap()
        const handleOnLocationFound = (event)=>{
        }
    
    
    
        useEffect( ()=>{
            map.locate({setView: true});
            map.on('locationfound', handleOnLocationFound);
        }, [map])
      
        return  (
            <>
                {
                    !region.position  ?  null :
                        (
                            <Circle  
                                center={region.position} 
                                radius={region.radius ? region.radius * 1000 : 80000 }
                            >
                            </Circle >
                        )
                    }
                {
                forms && forms.map(form=>{
                    let address_fields = form && form.address_fields
                    let lat , lng = null

                    return (
                        address_fields && address_fields.map(field=>{
                            if(field.lat){
                                lat =  field.lat
                            }
                            if(field.lng){
                                lng =  field.lng
                            }

                            if(lat && lng){
                                return(
                                    <Marker position={{lat, lng}}>
                                        <Popup>
                                            <Link  to={`/works/${form.form_id}`}> plus d'informations </Link>
                                        </Popup>
                                    </Marker>
                                )
                            }


                        })
                    )
                })
              }
    
            </>
         )
    }
    return(
        <MapContainer className="map mb-4"  
            center={region.position ?region.position : null}
            >
            <TileLayer                
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />           
           <LocationMarker  />
        </MapContainer>
    )
}


export default MapComponent

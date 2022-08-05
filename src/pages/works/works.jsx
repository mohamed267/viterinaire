import {useState , useEffect} from "react"
import {useDispatch , useSelector} from "react-redux"
import Navbar from "../../components/navbar/navbar"
import TopFiter from "../../components/topFilter/topfilter"
import Map from "../../components/map/map"
import List from "../../components/list/list"
import Pagination from "../../layouts/pagination/pagination"
import {Container} from "reactstrap"
import {getRegions  } from "../../store/regionReducer"
import {getForms , getMapForms, initForm } from "../../store/formReducer"
import "./works.scss";


const Works = ()=>{
    const dispatch = useDispatch()
    const pages = useSelector(state=>state.form.pages)

    const [mapShow, setMapShow] = useState(true)
    const [page , setPage]= useState(1)
    const [position , setPosition] = useState(null)

    const [region_id , setRegion_id] =  useState(null)

    useEffect( ()=>{
        dispatch(getRegions({}))
    }, [])


    useEffect( ()=>{
        console.log("chaged here ", region_id)
        dispatch(getForms({region_id , page  , limit : 8}))
    }, [ page , region_id])

    return(
        <div className="flex wot=rks">
            <Navbar/>
            <Container>
                <TopFiter  
                  region_id={region_id} setRegion_id={setRegion_id}setPosition={setPosition}  mapShow={mapShow} setMapShow={setMapShow}  />
                {
                    mapShow ? <Map position={position}  setPosition={setPosition} /> : (
                        <>
                            <List page={page} pages={pages} />
                            <Pagination 
                                page={page} 
                                pages={pages}  
                                setPage={setPage} 
                                setPosition={setPosition} />
                        </>
                    )
                }

                

                
            </Container>
        </div>
    )
}


export default Works
import {useState , useEffect} from "react"
import {useSelector , useDispatch} from "react-redux"

import Select from 'react-select';
import {Row , Col} from "reactstrap"
import Switch from '@mui/material/Switch';
import {  setRegion} from "../../store/regionReducer"
import {getForms , getMapForms, initForm } from "../../store/formReducer"
import "./topfilter.scss"







const TopFilter = ({mapShow ,setMapShow , setPosition ,
    region_id , setRegion_id
})=>{
    const dispatch = useDispatch()
    const region = useSelector(state=>state.region)
    const page = useSelector(state=>state.form.page)
    const pages = useSelector(state=>state.form.pages)
    const formPages = useSelector(state=>state.form.formPages)
   

    const handleChangeRegion = (region)=>{
        console.log("region ", region)
        setPosition({lat : region.lat , lng : region.lng})
        setRegion_id(region.region_id)
        dispatch(setRegion(region))
    }

    useEffect( ()=>{
        dispatch(initForm({}))
    }, [region_id])

    useEffect( ()=>{
        console.log("we are  eher " , formPages, pages, page )
        if(!formPages.includes(page+1) && page < pages) {
            dispatch(getMapForms({region_id ,page : page+1 ,    limit : 8}))
        }

    }, [page])

    return (
        <Row  className='topfilter py-3 justify-content-between'>
            <Col md={3}>
                <Select
                    className="basic-single z-index-1000"
                    classNamePrefix="select"
                    getOptionLabel ={(option)=>option.region_name}
                    getOptionValue ={(option)=>option.region_id}    
                    isClearable={true}
                    name="rigion"
                    options={region.regions ? region.regions : []}
                    onChange={handleChangeRegion}
                />
            </Col>
            <Col md={3} className="d-flex  align-items-center justify-content-end">
                <p className="showstyle">map</p>
                <Switch checked={!mapShow} onChange={(el)=>{setMapShow(!mapShow)}}   />
                <p className="showstyle">list</p>
            </Col>
           
        </Row>
    )
}

export default TopFilter
import {useState , useEffect} from "react"
import {useDispatch , useSelector } from "react-redux"
import {useLocation  ,Link,   useParams} from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Navbar from "../../components/navbar/navbar"
import {Breadcrumb, Container , Row,Col ,Button,  BreadcrumbItem} from "reactstrap"
import "./document.scss"

import {getForm , setDataExtracted  , setFilteredData} from "../../store/formReducer"
import handleData from "../../utils/document"
import {toLocal} from "../../utils/date"




// const  handleData.extractData = (data)=>{
//     const {address_fields} = data
//     let filtObg ={}

//     address_fields && address_fields.length >0 &&
//     address_fields.map(field =>{
        
//     })



// }


const filterData  = (data) =>{
    const arr= [];
    var snap = [];
    var i = 0;
    data.map((el , key)=>{
        if(el.type=="title"){
            i=i+1;
        }


        if(i == 3 ){
            arr.push(snap)
            i = 1;
            snap=[];
        }
        if(key+1== data.length){
            snap.push(el);
            arr.push(snap)
            i = 1;
            snap=[];

        }
        
        snap.push(el);
         
    })

    return arr

}
function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
} 

const Document = ()=>{
    const dispatch = useDispatch()
    const {form_id} = useParams()
    const {form } = useSelector(state=>state.form.details)
    const [page , setPage] = useState(0)
    const [pages , setPages] = useState(0);
    const [isMobile, setIsMobile] = useState(true);
    const [filtereddata , setFiltereddata] = useState([])





    function handleWindowResize() {
        setIsMobile(getWindowSize().innerWidth < 600);
    }
    useEffect(() => {    
        setIsMobile(getWindowSize().innerWidth < 600);
        window.addEventListener('resize', handleWindowResize);
        dispatch(getForm({form_id}))
    }, []);
    useEffect(()=>{
        setPages(filtereddata.length ? filtereddata.length : 0)
    },[filtereddata ])

    useEffect( ()=>{
        let extracted = handleData.extractData(form)
        let filtered = isMobile ?filterData(extracted) : [extracted]
        setFiltereddata(filtered)
    }, [form , isMobile])

    



    return(
        <div className="flex document">
            <Navbar/>
                

            <Container className="py-4">
                <Row className="justify-content-between align-items-center">
                    <Breadcrumb className="col-xl-11">
                        <BreadcrumbItem>{form ?form.region ? form.region.region_name :"":"" }</BreadcrumbItem>
                        <BreadcrumbItem active>{form ?form.farm_name ? form.farm_name :"":"" }</BreadcrumbItem>
                    </Breadcrumb>
                </Row>
                <div className="document_details shadow">
                        <Row className="top p-3 justify-content-between">
                            <Col className="d-flex flex-wrap align-items-baseline">
                                <h1 className="title_enquete mr-3">enquete épidémiologique</h1>
                                <p className="ferme"> {form ?form.farm_name ? form.farm_name :"":"" }</p>
                            </Col>
                            <Col>
                                <h1 className="time">date : {form ?form.date ? toLocal(form.date):"":"" }</h1>
                            </Col>
                        </Row>
                        
                        <PerfectScrollbar style={{maxHeight : "500px" , overflow: "hidden"}}>
                            <Row className="details ">
                                    {
                                        filtereddata && 
                                        filtereddata[isMobile ? page : 0] && 
                                        filtereddata[isMobile ? page : 0].map(el=>{
                                            if(el.type=="title"){
                                                return (
                                                    <Col md={12} className='d-flex gap-3 align-items-center  '>
                                                        <p className="title_details">{el.label}</p>
                                                        <p className="divider mx-4"></p>
                                                    </Col>
                                                )
                                            }else if(el.type=="property"){
                                                return (
                                                    <Col  className='property d-flex my-4    gap-1 align-items-center flex-column  '>
                                                        <p className="prop_name">{el.name}</p>
                                                        <p className="prop_value">{el.value}</p>
                                                    </Col>
                                                )
                                            }else if(el.type=="gps"){
                                                return (
                                                    <Col  className='property d-flex my-4    gap-1 align-items-center flex-column  '>
                                                        <p className="prop_name">{el.name}</p>
                                                        <a href={`https://maps.google.com/?q=${el.value}`} target="_blank">
                                                            <Button className="gps-button">
                                                                <i className="las la-map-marker "></i>
                                                            </Button>
                                                        </a>
                                                    </Col>
                                                )
                                            }else if(el.type=="text"){
                                                return (
                                                    <PerfectScrollbar style={{maxHeight : "150px" , overflow : "hidden"}}>
                                                        <Col className='w-100 p-3 property_text d-flex  gap-3 align-items-center flex-column  '>
                                                            <p className="prop_text_value">{el.value}</p>
                                                        
                                                        </Col>
                                                    </PerfectScrollbar>
                                                )
                                            }
                                        })
                                    }
                            </Row>
                        
                        </PerfectScrollbar>
                        
                        
                    
                </div>
                {
                    isMobile ? 
                    <Row className="justify-content-center my-4">
                        {
                            (page !== 0) && 
                            <Col className="page-icon">
                                <i  
                                onClick={()=>{setPage(page-1)}}
                                className="las cursor-pointer la-angle-left"></i>
                            </Col>
                        }
                        {
                            (page !== pages) && 
                            <Col className="page-icon">
                                <i
                                onClick={()=>{setPage(page+1)}}
                                className=" cursor-pointer las la-angle-right"></i>
                            </Col>
                        }
                        
                        
                        
                    </Row> :  null
                }
            </Container>
        </div>
    )
}


export default Document
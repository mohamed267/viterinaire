import {useState , useEffect} from "react"
import Navbar from "../../components/navbar/navbar"
import {Breadcrumb, Container , Row,Col , BreadcrumbItem} from "reactstrap"
import "./document.scss"


const data = [
    {type : "title" , label : "rigion"},
    {type : "property" , name : "wilaya" , value : "khenchella"},
    {type : "property" , name : "daira" , value : "el-hama"},
    {type : "property" , name : "commune" , value : "beghai"},
    {type : "title" , label : "caractères"},
    {type : "property" , name : "climat" , value : "sec"},
    {type : "property" , name : "géographie" , value : "plateaux"},
    {type : "property" , name : "températeur" , value : "haux 32°"},
    {type : "title" , label : "propriétaire"},
    {type : "property" , name : "nom" , value : "boulague"},
    {type : "property" , name : "prénom" , value : "maamar"},
    {type : "property" , name : "age" , value : "60"},
    {type : "property" , name : "numéro de téléphone" , value : "068925154875"},
    {type : "property" , name : "address" , value : "rue douawdi abd elhamid khenchela algirir"},
    {type : "property" , name : "cordoné gps" , value : "N/A"},
    {type : "title" , label : "le traitement préventive"},
    {type : "property" , name : "produit contre le mouche" , value : "true"},
    {type : "property" , name : "déparasitage saisoni`re" , value : "true"},
    {type : "property" , name : "températeur" , value : "32°"},
    {type : "title" , label : "historique de l'animale"},
    {type : "text" ,  value : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
]


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
    const [page , setPage] = useState(0)
    const [pages , setPages] = useState(0);
    const [filterddata , setFilteredData] = useState([])
     const [isMobile, setIsMobile] = useState(true);
     useEffect(() => {
        function handleWindowResize() {
            setIsMobile(getWindowSize().innerWidth < 600);
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);

    useEffect( ()=>{
        setFilteredData(isMobile ?filterData(data) : [data])
    }, [isMobile])
    useEffect(()=>{
        setPages(filterddata.length ? filterddata.length : 0)
    },[filterddata ])

    return(
        <div className="flex document">
            <Navbar/>
            <Container className="py-4">
                <Row>
                    <Breadcrumb>
                        <BreadcrumbItem><a href="#">khenchela</a></BreadcrumbItem>
                        <BreadcrumbItem active>Ferme bouallage</BreadcrumbItem>
                    </Breadcrumb>
                </Row>
                <div className="document_details shadow">
                        <Row className="top p-3 justify-content-between">
                            <Col className="d-flex flex-wrap align-items-baseline">
                                <h1 className="title mr-3">enquete épidémiologique</h1>
                                <p className="ferme"> ferme boulage</p>
                            </Col>
                            <Col>
                                <h1 className="time">date : 10-06-2001</h1>
                            </Col>
                        </Row>
                        <Row className="details ">
                            {
                                filterddata && 
                                filterddata[isMobile ? page : 0] && 
                                filterddata[isMobile ? page : 0].map(el=>{
                                    if(el.type=="title"){
                                        return (
                                            <Col md={12} className='d-flex gap-3 align-items-center  '>
                                                <p className="title_details">{el.label}</p>
                                                <p className="divider mx-4"></p>
                                            </Col>
                                        )
                                    }else if(el.type=="property"){
                                        return (
                                            <Col  className='property d-flex mb-3  gap-1 align-items-center flex-column  '>
                                                <p className="prop_name">{el.name}</p>
                                                <p className="prop_value">{el.value}</p>
                                            </Col>
                                        )
                                    }else if(el.type=="text"){
                                        return (
                                            <Col className='w-100 p-3 property_text d-flex  gap-3 align-items-center flex-column  '>
                                                <p className="prop_text_value">{el.value}</p>
                                            
                                            </Col>
                                        )
                                    }
                                })
                            }
                        </Row>
                        
                        
                    
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
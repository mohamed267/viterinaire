import {Row , Col , Button} from "reactstrap"
import {Link} from "react-router-dom"
import {useDispatch , useSelector} from "react-redux"
import "./list.scss"
import { useEffect } from "react"
import {toLocal} from "../../utils/date"


const reformulateForm = (form)=>{
    let fields = []
    let regions = []

    form && form.map(field=>{
        let region = field.region.region_name
        if(!regions.includes(region)){
            fields.push({type : "title" , value :  region})
            regions.push(region)
        }
        const address_fields = field.address_fields
        
        let address = ""

        address_fields  && address_fields.map(add=>{
            if(add.address){
                address =  add.address
            }
        })

        fields.push({
            type : "enquet",
            date : field.date ,
            farm_name :  field.farm_name,
            address : address,
            form_id : field.form_id

        })
    

    })


    return fields
    


}




const List =()=>{
    const forms = useSelector(state=>state.form.forms)

    useEffect( ()=>{
        console.log("gokk ")
        console.log("ff " , reformulateForm(forms))
    }, [forms])


    return (
        <div className="list">
            {
                reformulateForm(forms).map(field=>{
                    if(field.type =="title"){
                        return (<Row ><p className="wilaya_title">{field.value}</p></Row>)
                    }else{
                        return(
                            <Row className="work_show mb-3 p-3">
                                <Col md={3}>
                                <p className="farme_name">{field.farm_name}</p>
                                </Col>
                                <Col className="work-details " md={9}>
                                    <p className="work_time ">
                                        {toLocal(field.date)}
                                    </p>
                                    <p className="work_place">
                                    <i className="las la-map-marker"></i>
                                        {field.address}
                                    </p>
                                    <Link to={`/works/${field.form_id}`}>
                                        <Button className="infos">
                                            plus d'informations
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        )

                    }
                })
            }
           
        </div>
    )
}


export default List
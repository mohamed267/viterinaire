import {Col} from "reactstrap"
import Navbar from "../../components/navbar/navbar"
import BgHome from "../../assets/images/bg.png"

import "./home.scss"
const Home = ()=>{
    return(
        <div className="flex home">
            <Navbar/>
            <div style={{backgroundImage: `url(${BgHome})`}} className="content_home">
                <div className="wrapper-home p-4">
                    <p className="pre">je suis</p>
                    <h1 className="name">djihad guessoum</h1>
                </div>
                
                <div className="desc w-100">
                    <Col md={5} className="liner ">
                    </Col>
                    <p>doctorant en microbiologie clinique</p>
                   
                    <Col md={2} className="liner ">
                    </Col>
                </div>
            </div>
        </div>
    )
}


export default Home
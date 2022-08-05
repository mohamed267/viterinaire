import {Col} from "reactstrap"
import Navbar from "../../components/navbar/navbar"
import Bgcontact from "../../assets/images/bg.png"

import "./contact.scss"
const contact = ()=>{
    return(
        <div className="flex contact">
            <Navbar/>
            <div style={{backgroundImage: `url(${Bgcontact})`}} className="content_contact">
                <div className="wrapper-container"></div>
                <div className="wrapper p-4">
                    <h1 className="title">contact</h1>
                    <p className="name">DR. Djihad Guessoum</p>
                   <div className="details">
                        <p className="pres">doctorant en microbiologie clinique</p>
                        <p className="pres">école national supérieur vétérinaire d'alger</p>
                        <ul>
                            <li className="listContact">
                            <a  href="tel:0656754189"><i className="las la-phone"></i></a>
                        
                                <p>0656754189</p>
                            </li>
                            <li className="listContact">
                                <a href={`mailto:d.guessoum@etud.ensv.dz`}>
                                <i className="las la-envelope"></i>
                                </a>
                                <p>d.guessoum@etud.ensv.dz</p>
                            </li>
                            <li className="listContact">
                            <a>
                            <i className="lab la-facebook-f"></i>
                            </a>
                                <p>djihad guessoum</p>
                            </li>
                            <li className="listContact">
                                <a>
                                    <i className="lab la-viber"></i>
                                </a>
                                <p>+213656754189</p>
                            </li>

                        </ul>
                   </div>
                </div>
                
            </div>
        </div>
    )
}


export default contact
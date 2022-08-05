import {useEffect, useState} from "react"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Row,
    Col,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { useLocation } from "react-router-dom";
import LogoTextWhite from  "../../assets/images/logoTextWhite.png"
import LogoEnsv from "../../assets/images/logo_ensv.png"
import LogoTextBlack from "../../assets/images/logoTextBlack.png"
import LogoConatct from "../../assets/images/logoContact.png"
import "./navbar.scss" 


const  navigation = [
    {
        value : "accueil",
        url : "/"
    },
    {
        value : "travails",
        url : "/works"
    },
    {
        value : "contact",
        url : "/contact"
    }
]


const DarkNavbar = ({toggle , isOpen , path})=>{
    return(
        <div>
            
            <Navbar  dark className="navbar row"  expand="md">
                {/* <Row> */}
                    <NavbarBrand  className="nav-brand p-4" href="/">
                        <img className='text-logo' width="200" src={LogoTextWhite} />
                        <p className="title-nav mt-1 mx-2">microbiologie clinique</p>

                    </NavbarBrand>
                    <Col className="togglerWrapper">
                        <NavbarToggler className="toogler" onClick={toggle} />
                    </Col>
                    <Col className=" px-4 pt-0" sm={12} md={12} lg={7}>
                        <Collapse className="h-100" isOpen={isOpen} navbar>
                            <Nav className="ml-auto w-100 h-100 flex" navbar>
                                {
                                    navigation && navigation.map(nav=>{
                                        return (
                                            <NavItem className={`col-md-4 listNav ${path==nav.url ? "selected" : ""}`}>
                                                <NavLink className="item-nav" href={`#${nav.url}`}>{nav.value}</NavLink>
                                            </NavItem>

                                        )
                                    })
                                }
                            
                            </Nav>
                        </Collapse>
                    </Col>
                {/* </Row> */}
            </Navbar>
        </div>
    )

}
const LightNavbar =({toggle , isOpen, path})=>{
    return(
        <div>
            
            <Navbar  className="navbar light row"  expand="md" light>
                {/* <Row> */}
                    <NavbarBrand  className="nav-brand p-4" href="/">
                        <img className='text-logo '  src={LogoTextBlack} />
                        <img className='img-logo'  src={LogoEnsv} />

                    </NavbarBrand>
                    <Col className="togglerWrapper">
                        <NavbarToggler className="toogler" onClick={toggle} />
                    </Col>
                    <Col className="px-4 pt-0" sm={12} md={12} lg={7}>
                        <Collapse className="h-100" isOpen={isOpen} navbar>
                            <Nav className="ml-auto w-100 h-100 flex" navbar>
                                 {
                                    navigation && navigation.map(nav=>{
                                        return (
                                            <NavItem className={`col-md-4 listNav ${path==nav.url ? "selected" : ""}`}>
                                                <NavLink className="item-nav" href={`#${nav.url}`}>{nav.value}</NavLink>
                                            </NavItem>

                                        )
                                    })
                                }
                            </Nav>
                        </Collapse>
                    </Col>
                {/* </Row> */}
            </Navbar>
        </div>
    )

}




const ContactNavbar =({toggle , isOpen, path})=>{
    return(
        <div>
            
            <Navbar  className="navbar  light row"  expand="md" light>
                {/* <Row> */}
                    <NavbarBrand  className="nav-brand contactNavBar " href="/">
                        <img className='text-logo '  src={LogoConatct} />

                    </NavbarBrand>
                    <Col className="togglerWrapper">
                        <NavbarToggler className="toogler" onClick={toggle} />
                    </Col>
                    <Col className="px-4 pt-0" sm={12} md={12} lg={7}>
                        <Collapse className="h-100" isOpen={isOpen} navbar>
                            <Nav className="ml-auto w-100 h-100 flex" navbar>
                                 {
                                    navigation && navigation.map(nav=>{
                                        return (
                                            <NavItem className={`col-md-4  listNav   ${path==nav.url ? "selected" : ""}`}>
                                                <NavLink className="item-nav" href={`#${nav.url}`}>{nav.value}</NavLink>
                                            </NavItem>

                                        )
                                    })
                                }
                            </Nav>
                        </Collapse>
                    </Col>
                {/* </Row> */}
            </Navbar>
        </div>
    )

}




const NavbarComponent = ()=>{
    const location =  useLocation()
    const [isOpen , setIsOpen] = useState(false)
    const toggle = ()=>{
        setIsOpen(!isOpen)
    }

    

    useEffect( ()=>{
        setIsOpen(false)
    }, [location])

    return (
        (location.pathname !== "/"  && location.pathname !== "/contact") && 
        <DarkNavbar toggle={toggle} isOpen={isOpen}  path={location.pathname}/>
        || (
            (location.pathname !== "/contact") &&
        <LightNavbar toggle={toggle} isOpen={isOpen} path={location.pathname} />
        || <ContactNavbar toggle={toggle} isOpen={isOpen} path={location.pathname}  />
        )
        
        
    )
    
}


export default NavbarComponent


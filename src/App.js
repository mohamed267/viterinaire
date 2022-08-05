// import firebase from  "firebase/compat/app"
// import "firebase/compat/auth"

// import {  getToken } from "firebase/messaging";
// import {  RecaptchaVerifier  ,signInWithPhoneNumber  } from "firebase/auth";
// import   { authentication  , messaging} from "./config/firebase-config"
// import {useState ,  useEffect} from  'react'


// function App() {
//   const [data , setData] =  useState({})
//   useEffect( ()=>{
//     // messaging.requestPermission().then(()=>{
//       getToken(messaging , {
//         vapidKey: "BKbLlEA4X6u_vLJMWSIGXLE-JEsj7GPqZvhl4LwaYx8MbL6ad9TO2_9djlkNUOzKpApuxNU3mXfZLBqSF-DNarw"}
//       ).then(currentToken=>{
//         console.log("our token is ", currentToken)
//       }).catch(err=>{
//         console.log("our error ", err)
//       });
//     })
//   // }, [])

//   return (
//     <div className="App">
      

//     </div>
//   );
// }

// export default App;

import {
  Routes,
  Route
} from "react-router-dom";

import Home from './pages/home/home'
import Works from './pages/works/works'
import Document from './pages/document/getdocs'
import Conatct from "./pages/contact/contact"
// import "./assets/icons/line-awesome/css/line-awesome.min.css"
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/icons/line-awesome/css/line-awesome.min.css"
import "./App.scss"
import "./variables.scss"


function App(){

  return (
    <Routes>
       <Route path="/" element={<Home/> } ></Route>
       <Route path="/contact" element={<Conatct/> } ></Route>
       <Route path="/works" >
          <Route index  element={<Works/> }></Route>
          <Route  path=":form_id" element={<Document />}/>
       </Route>
    </Routes>
      
  )

}


export default App




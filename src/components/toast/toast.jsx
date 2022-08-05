import {useState  , useEffect}  from "react"
import {useSelector , useDispatch} from "react-redux"
import { useToast, immediateToast } from 'izitoast-react'
import { clearMessage } from "../../store/apiMessageReducer";


import 'izitoast-react/dist/iziToast.css';

const Toast = () => {
    const dispatch = useDispatch()
    const apiMessage =  useSelector(state=> state.apiMessage);

    useEffect(() => {
        if(apiMessage.message){
            immediateToast(apiMessage.type, {
                message: apiMessage.message,
                position : "topRight"
            })
            setTimeout( ()=>{
                dispatch(clearMessage())
            }, 200)
        }
    } ,[apiMessage]);


  return (
    <>
    </>
  )
};


export default Toast
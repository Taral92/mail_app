import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setemails } from "../app/slice"

 const Usegetallemails = () => {

    const dispatch =useDispatch()
 useEffect(()=>{
       const fetchemails =async()=>{
        try {
            const res =await axios.get("http://localhost:8080/api/email/getallemail",{
                withCredentials:true
            })
            dispatch(setemails(res.data.emails))
            
        } catch (error) {
            console.log(error);
            
        }
       } 
       fetchemails()
 },[])
}
export default Usegetallemails;




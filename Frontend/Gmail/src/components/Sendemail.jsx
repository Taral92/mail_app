import { RxCross2 } from "react-icons/rx";
import { closemail } from "../app/slice";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
import { setemails } from "../app/slice";

const Sendemail = () => {
  const {emails}=useSelector(state=>state.z)
 const dispatch=useDispatch()
  const [formdata,setformdata]=useState({
    to:"",
    subject:"",
    message:""
  })
  const changehandler=(e)=>{
       setformdata({...formdata,[e.target.name]:e.target.value})  
  }
  const submithandler=async(e)=>{
         e.preventDefault();
         try {
          const res = await axios.post("https://mail-app-lkkb.onrender.com/api/email/create",formdata,{
            headers:{
              "Content-Type":"application/json"
            },
            withCredentials:true
          }
            
          )
          if(res.data.success){
            console.log(res.data);
            dispatch(setemails([...emails,res.data.messgaex]))
            toast.success("email created & sent")
            setformdata({ to: "", subject: "", message: "" });
            dispatch(closemail())
          }
         } catch (error) {
          console.log(error);
          toast.error("issue in server plz try again")
         }
  }
     const isopen = useSelector((state)=>state.z.value2)
     
    return(
      <div className={ `${isopen ? 'fixed':'hidden'} w-[450px] min-h-[450px] rounded-md bottom-10 right-10 z-[999999]   pointer-events-auto p-5   bg-white shadow-xl shadow-slate-600`}>
        <div className=" flex bg-[#F2F6FC] rounded-md px-3 py-2 justify-between items-center">
          <div className="">
            <h1>New Message</h1>
          </div>
          <div onClick={()=>dispatch(closemail())}className="p-2 rounded-full">
           <RxCross2  size={'25px'}/>
          </div>
        </div>
        <form className="flex flex-col p-3 gap-2" action="">
          <input onChange={changehandler} value={formdata.to} name="to" type="text" placeholder="Subject"/>
          <input onChange={changehandler} value={formdata.subject} name="subject" type="text" placeholder="To"/>
          <textarea  value={formdata.message} name="message" className="outline-none" autoFocus rows={'10'} cols={'30'}onChange={changehandler}></textarea>
          <button type="submit" onClick={submithandler} className="bg-blue-900 text-white rounded-full w-fit py-2 px-3">Send</button>
        </form>
      </div>
    )
};



export default Sendemail;
































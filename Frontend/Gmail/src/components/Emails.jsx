import { useSelector } from "react-redux";
import Usegetallemails from "../hooks/usegetallemails"
import Email from "./Email"
import { useEffect, useState } from "react";
const Emails = () => {
  Usegetallemails();

  const {emails,searchText}= useSelector(store=>store.z)
  const [filterdemail,setfilteredemail]=useState(emails)
  useEffect(()=>{
        const filterdemail=emails.filter((email)=>{
          
          return email.subject.toLowerCase().includes(searchText.toLowerCase()) || email.to.toLowerCase().includes(searchText.toLowerCase()) || email.message.toLowerCase().includes(searchText.toLowerCase())
        })
        setfilteredemail(filterdemail)
        console.log(filterdemail);
  },[searchText,emails])
  
    

  return (
   
    
    <div className="justify-center">
      {
        filterdemail && filterdemail?.map((email)=> <Email key={email.id} email={email}/>)
        
        
      }
      
     


    </div>
  )
}

export default Emails


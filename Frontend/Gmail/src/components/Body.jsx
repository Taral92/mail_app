import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"
const Body = () => {
  return (
    <div>
      <Navbar/>
    <div className='flex'>
    <Sidebar/>
    <Outlet/>
   
   

    </div>
    </div>
  )
}

export default Body
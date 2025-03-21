import './App.css';
import Inbox from './components/Inbox';
import Navbar from './components/Navbar';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import Mail from './components/Mail';
import Login from './Login';
import Signup from './Signup';
import Body from './components/Body'
import Sendemail from './components/Sendemail';
import { ToastContainer } from 'react-toastify';
import Speechtotext from './components/Speechtotext'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "",
        element: <Inbox />
      },
      {
        path: "mail/:id",
        element: <Mail />
      },
    ]
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  }
])

function App() {
  

  return (
    <div className='bg-[#F6F8FC] h-screen'>
      
      <RouterProvider router={appRouter} />
        <div>
          <Speechtotext/>
        </div>
      <div className='absolute w-[30%] bottom-0 right-20 z-10'>
        <Sendemail/>
      </div>
      <ToastContainer />

    </div>
  )
}

export default App;
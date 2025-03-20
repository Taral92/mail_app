import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAuthuser } from "./app/slice"; 

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const res = await axios.post(
        "https://mail-app-lkkb.onrender.com/api/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setAuthuser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="flex items-center lg:w-[50%] sm:w-[50%] md:w-[50%]  justify-center w-screen h-screen bg-gray-100">
      <form
        onSubmit={loginHandler}
        className="flex flex-col gap-3 lg:w-[50%] sm:w-[50%] md:w-[50%] bg-white p-6 shadow-lg rounded-lg border border-gray-300"
      >
        <h1 className="text-gray-800 text-center font-bold text-2xl uppercase">
          Login
        </h1>
        
        <input
          onChange={changeHandler}
          value={input.email}
          type="email"
          name="email"
          placeholder="Email"
          className="px-3 py-2 rounded-md outline-none border border-gray-300 focus:border-blue-500"
          required
        />
        <input
          onChange={changeHandler}
          value={input.password}
          type="password"
          name="password"
          placeholder="Password"
          className="px-3 py-2 outline-none rounded-md border border-gray-300 focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md p-2 my-2 hover:bg-blue-900 transition-all"
        >
          Login
        </button>
        <div className="gap-1">
        <span className="text-black ">Don't have account?</span> 
        <button  onClick={()=>navigate('/signup')}  className="bg-blue-200 text-white rounded-md p-1 hover:bg-blue-300 cursor-pointer ml-1">Signup</button>
        </div>
        
      </form>
    </div>
  );
};

export default Login;
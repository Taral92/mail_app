import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [inputval, setinputval] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const changehandler = (e) => {
    setinputval({ ...inputval, [e.target.name]: e.target.value });
  };

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/register",
        inputval,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed! Try again.");
    }
  };

  return (
    <div className="flex lg:w-[50%] sm:w-[50%] md:w-[50%] items-center justify-center w-screen h-screen">
      <form
        onSubmit={submithandler}
        className="flex flex-col gap-1 bg-white p-3 w-[20%] shadow-lg rounded-md"
      >
        <h1 className="text-black uppercase font-bold text-xl">Create New Account</h1>
        
        <input
          value={inputval.fullname}
          onChange={changehandler}
          type="text"
          name="fullname"
          placeholder="Full Name"
          className="px-2 py-1 rounded-md outline-none border border-gray-300"
          required
        />
        <input
          value={inputval.email}
          onChange={changehandler}
          type="email"
          name="email"
          placeholder="Email"
          className="px-2 py-1 rounded-md outline-none border border-gray-300"
          required
        />
        <input
          value={inputval.password}
          onChange={changehandler}
          type="password"
          name="password"
          placeholder="Password"
          className="px-2 py-1 outline-none rounded-md border border-gray-300"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md p-2 my-2 hover:bg-blue-700 transition-all"
        >
          Signup
        </button>
        <p className="text-gray-500">
          Already have an account? <Link to={"/login"} className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
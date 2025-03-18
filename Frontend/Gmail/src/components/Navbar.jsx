import { GiHamburgerMenu } from "react-icons/gi";
import { MdSearch } from "react-icons/md";
import { CiCircleQuestion } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { RiGeminiFill } from "react-icons/ri";
import { TbGridDots } from "react-icons/tb";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearemails, setAuthuser, setsearchText } from "../app/slice";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [text, settext] = useState("");
  const { user,emails } = useSelector((store) => store.z);
  const searchtext = useSelector((store) => store.z.searchText);
  console.log(searchtext);

  useEffect(() => {
    dispatch(setsearchText(text));
  }, [text]);
  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/logoout",
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        console.log("before logout",emails);
        
        dispatch(clearemails());
        console.log("after clearing email",emails);
        
        dispatch(setAuthuser(null));
        toast.success("Logged out successfully");
        console.log(emails);
        
        setTimeout(() => {
          navigate('/login')
        }, 100);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };
  return (
    <div className="flex items-center justify-between mx-3 h-16">
      <div className="flex items-center gap-10">
        <div className="flex  items-center gap-2">
          <div className="p-3 hover:bg-gray-200 rounded-full cursor-pointer">
            <GiHamburgerMenu />
          </div>
          <img
            className="w-8"
            src="https://logos-world.net/wp-content/uploads/2020/11/Gmail-Logo.png"
            alt="logo"
          />
          <h1 className="text-2xl text-gray-500">Gmail</h1>
        </div>
      </div>

      {user && (
        <>
          <div className="ml-14 mr-100 bg- w-[50%]">
            <div className="px-2 rounded-full py-3 flex items-center bg-[#EAF1FB]">
              <MdSearch size={"25px"} className="text-gray-800" />
              <input
                onChange={(e) => settext(e.target.value)}
                value={text}
                type="text"
                placeholder="search mail"
                className="rounded-full w-full bg-transparent outline-none  px-1"
              ></input>
            </div>
          </div>
          <div className="flex">
            <div className="p-3 hover:bg-gray-300 rounded-full">
              <CiCircleQuestion size={"25px"} />
            </div>

            <div className="p-3 hover:bg-gray-300 rounded-full">
              <IoSettingsOutline size={"25px"} />
            </div>
            <div className="p-3 hover:bg-gray-300 rounded-full">
              <RiGeminiFill size={"25px"} />
            </div>
            <div className="p-3 hover:bg-gray-300 rounded-full">
              <TbGridDots size={"25px"} />
            </div>
            <div className=" flex items-center justify-center">
              <span
                onClick={logoutHandler}
                className=" underline cursor-pointer ml-0.5"
              >
                Logout
              </span>
            </div>
            <div>
              <Avatar
                className="px-1"
                src={user.ProfilePhoto}
                size="45"
                round={true}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;

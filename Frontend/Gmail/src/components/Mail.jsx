import { IoMdArrowBack } from "react-icons/io";
import { IoMdMore } from "react-icons/io";
import { BiArchiveIn } from "react-icons/bi";
import {
  MdDeleteOutline,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
  MdOutlineMarkEmailUnread,
  MdOutlineReport,
  MdOutlineWatchLater,
} from "react-icons/md";

import { toast } from "react-toastify";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setemails } from "../app/slice";

const Mail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { emails } = useSelector((state) => state.z);

  const deletehandler = async () => {
    try {
      const res = await axios.delete(
        `https://taralxxxxx.netlify.app/api/email/delete/${params.id}`,
        { withCredentials: true }
      );

      toast.success(res.data.message);

      const updatedemails = emails.filter((email) => email._id !== params.id);
      dispatch(setemails(updatedemails));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const openmail = () => navigate("/");
  const selectedemail = emails.find((email) => email._id === params.id);

  return (
    <div className="flex-1 items-center rounded-xl mx-5 my-1 bg-white">
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-2 text-gray-800 py-2">
          <div
            onClick={openmail}
            className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer"
          >
            <IoMdArrowBack />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <BiArchiveIn />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <MdOutlineReport />
          </div>
          <div
            onClick={deletehandler}
            className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer"
          >
            <MdDeleteOutline />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <MdOutlineMarkEmailUnread />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <MdOutlineWatchLater />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <MdOutlineDriveFileMove />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <IoMdMore />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <MdOutlineAddTask />
          </div>
        </div>
        <div className="flex justify-end gap-2 mr-10">
          <span>1 to 50</span>
          <MdKeyboardArrowLeft size="25px" />
          <MdKeyboardArrowRight size="25px" />
        </div>
      </div>
      <div className="h-[90vh] overflow-y-auto p-5">
        <div className="flex justify-between bg-white items-center gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium">{selectedemail?.subject}</h1>
            <span className="text-small bg-gray-200 rounded-md px-2">
              Inbox
            </span>
          </div>
          <div className="flex-none text-gray-200 text-sm">
            <p>12 days ago</p>
          </div>
        </div>
        <div className="text-gray-300 text-sm">
          <h3 className="text-gray-500 text-sm">taral.patel37225@gmail.com</h3>
          <span>to me</span>
        </div>
        <div className="my-10">
          <p>{selectedemail?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Mail;

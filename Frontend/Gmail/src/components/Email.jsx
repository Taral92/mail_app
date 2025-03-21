import { MdCropSquare } from "react-icons/md";
import { IoMdStarOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RiGeminiFill } from "react-icons/ri";
const Email = ({ email, category }) => {
  const navigate = useNavigate();

  
  const openMail = () => {
    navigate(`/mail/${email._id}`);
  };

  const getDaysAgo = (createdAt) => {
    const createdDate = new Date(createdAt);
    const today = new Date();
    const differenceInMs = today - createdDate;
    const daysAgo = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    return daysAgo === 0 ? "Today" : `${daysAgo} days ago`;
  };

  return (
    <div className="flex border-b border-b-gray-200 px-5 py-3 text-small hover:cursor-pointer gap-2 w-[100%] hover:bg-gray-100">
      <div className="py-0.5 w-[2.5%]">
        <MdCropSquare size={"20px"} />
      </div>
      <div className="py-0.5 w-[2.5%] text-gray-300">
        <IoMdStarOutline size={"20px"} />
      </div>
      <div className="w-[70%] flex">
        <div className="w-[30%]">
          <h1>{email?.subject}</h1>
        </div>
        <div className="flex-1 ml-5 font-bold  text-black">
          <p onClick={openMail}>{email?.message}</p>
        </div>
      </div>

      <div className="flex justify-items-stretch gap-10 w-[25%]  font-bold ">
        <div className="w-[35%] px-5">
          <p className=" text-black">{getDaysAgo(email.createdAt)}</p>
        </div>
        <div className="w-[50%] flex gap-2 items-center text-blue-300">
          <p>
            <RiGeminiFill />
          </p>
          <p>[{category}]</p>
        </div>
      </div>
    </div>
  );
};

export default Email;

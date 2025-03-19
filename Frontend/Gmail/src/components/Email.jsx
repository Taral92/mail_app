import { MdCropSquare } from "react-icons/md";
import { IoMdStarOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

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
    <div className="flex border-b border-b-gray-200 px-5 py-3 text-small hover:cursor-pointer gap-2 hover:bg-gray-100">
      <div className="py-0.5">
        <MdCropSquare size={"20px"} />
      </div>
      <div className="py-0.5 text-gray-300">
        <IoMdStarOutline size={"20px"} />
      </div>
      <h1>{email?.subject}</h1>
      <div className="flex-1 ml-5 font-bold text-black">
        <p onClick={openMail}>{email?.message}</p>
      </div>
      <div className="flex-none text-gray text-small">
        <p>{getDaysAgo(email.createdAt)}</p>
        <p>{category}</p>
      </div>
    </div>
  );
};

export default Email;
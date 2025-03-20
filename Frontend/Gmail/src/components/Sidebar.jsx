import { LuPencil } from "react-icons/lu";
import { MdMoveToInbox } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa6";
import { MdSend, MdDrafts, MdExpandMore } from "react-icons/md";
import Sendemail from "./Sendemail";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../app/slice";

const sidebaritems = [
  { icon: <MdMoveToInbox size={"20px"} />, text: "Inbox" },
  { icon: <CiStar size={"20px"} />, text: "Starred" },
  { icon: <FaRegClock size={"20px"} />, text: "Snoozed" },
  { icon: <MdSend size={"20px"} />, text: "Sent" },
  { icon: <MdDrafts size={"20px"} />, text: "Drafts" },
  { icon: <MdExpandMore size={"20px"} />, text: "More" },
];

const Sidebar = () => {
  const rii = useSelector((state) => state.z.value2);
  const dispatch = useDispatch();

  return (
    <div className="h-full lg:w-64 md:w-56 sm:w-48 w-16 transition-all duration-300 bg-white shadow-lg p-2">
      {/* Compose Button */}
      <div className="px-2">
        <button
          onClick={() => dispatch(remove())}
          className="flex items-center gap-2 p-3 hover:shadow-md rounded-2xl cursor-pointer w-full bg-gray-100 lg:flex md:flex sm:flex hidden"
        >
          <LuPencil size={"25px"} />
          <span className="lg:block md:block sm:block hidden">Compose</span>
        </button>
      </div>

      <div className="text-gray-500 px-2 py-2 space-y-2">
        {sidebaritems.map((item, index) => (
          <button
            key={index}
            className="flex items-center gap-3 px-3 py-2 w-full hover:bg-gray-200 rounded-r-full transition-all"
          >
            {item.icon}
            <span className="lg:block md:block sm:block hidden">
              {item.text}
            </span>
          </button>
        ))}
      </div>

      {rii && <Sendemail />}
    </div>
  );
};

export default Sidebar;

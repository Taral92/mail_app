import { IoMdSquareOutline } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { IoMdMore } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { MdInbox } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

import { GoTag } from "react-icons/go";
import { useState } from "react";
import Emails from "./Emails";
const inboxicons = [
  {
    icon: <MdInbox size={"25px"} />,
    text: "Primary",
  },
  {
    icon: <GoTag size={"25px"} />,
    text: "Promotions",
  },
  {
    icon: <FaUserFriends size={"25px"} />,
    text: "Social",
  },
  {
    icon: <MdOutlineTipsAndUpdates size={"25px"} />,
    text: "Updates",
  },
];

const Inbox = () => {
  const [selected, setselected] = useState(0);
  return (
    <div className="flex-1 rounded-xl mx-5 py-1 ">
      <div className="flex items-center  px-4 gap-3">
        <div className="flex items-center gap-2 ">
          <IoMdSquareOutline size={"20px"} />
          <FaCaretDown size={"20px"} />
          <div className="hover:bg-gray-200 rounded-full cursor-pointer">
            <IoMdRefresh size={"20px"} />
          </div>
          <div>
            <IoMdMore size={"20px"} />
          </div>
        </div>
        <div className="flex items-center mr-30 gap-3 ml-auto">
          <span>1 to 50</span>
          <MdKeyboardArrowLeft size={"25px"} />
          <MdKeyboardArrowRight size={"25px"} />
        </div>
      </div>

      <div className="h-90vh overflow-y-auto">
        <div className="flex item-center gap-10  py-3">
          {inboxicons.map((items, index) => (
            <button
              onClick={() => setselected(index)}
              className={`${
                selected === index
                  ? "border-b-4 border-b-blue-400 text-blue-500"
                  : "border-b-transparent"
              } flex w-52 p-4 hover:bg-gray-200 items-center gap-2 cursor-pointer`}
              key={index}
            >
              {items.icon}
              <span>{items.text}</span>
            </button>
          ))}
        </div>
        <div>
          <Emails />
        </div>
      </div>
    </div>
  );
};

export default Inbox;




















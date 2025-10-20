/* eslint-disable react/prop-types */
import { BsGearFill, IoOptionsOutline } from "../../assets/icons";
import CreatePost from "../homepage/CreatePost";

export const RightContent = ({ user }) => {
  return (
    <>
      {/* Form Post */}
      <div>
        <CreatePost user={user} />
      </div>

      {/* Filter Postingan */}
      <div>
        <div className="flex justify-between items-center px-5 mb-5 bg-white border-[0.5px] border-slate-300 py-3 rounded-lg">
          {/* Title */}
          <div>
            <h1 className="font-bold text-xl">Postingan</h1>
          </div>

          {/* Button */}
          <div className="px-2 py-1 rounded-md flex gap-x-2">
            <a href="#" className="px-3 py-2 flex gap-x-2 items-center font-semibold bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300">
              <span>
                <IoOptionsOutline className="w-[20px] h-[20px]" />
              </span>
              Filter
            </a>
            <a href="#" className="px-3 py-2 flex gap-x-2 items-center font-semibold bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300">
              <span>
                <BsGearFill className="w-[17px] h-[17px]" />
              </span>
              Kelola Postingan
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

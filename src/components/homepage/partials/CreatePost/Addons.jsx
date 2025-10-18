/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BsFileImage, CgSmileMouthOpen, FaUserPlus, PiMapPinFill, PiDotsThreeOutlineFill, HiGif } from "../../../../assets/icons";

export const Addons = ({ onChange }) => {
  return (
    <div className="flex justify-between items-center border border-slate-300 p-3 rounded-lg">
      <p className="font-semibold">Add to your post</p>
      <div className="flex gap-x-3 items-center">
        {/* Upload Image */}
        <div>
          <input type="file" name="post_image" id="uploadImgPost" accept="image/jpg, image/jpeg, image/png" className="hidden" onChange={onChange} />
          <label htmlFor="uploadImgPost" className="cursor-pointer">
            <i>
              <BsFileImage className="text-green-400 w-[27px] h-[27px] hover:text-gray-500" />
            </i>
          </label>
        </div>

        <i className="cursor-pointer hover:brightness-50">
          <FaUserPlus className="text-blue-500 w-[27px] h-[27px]" />
        </i>

        <i className="cursor-pointer hover:brightness-50">
          <CgSmileMouthOpen className="text-orange-400 w-[27px] h-[27px]" />
        </i>

        <i className="cursor-pointer hover:brightness-50">
          <PiMapPinFill className="text-red-600 w-[27px] h-[27px]" />
        </i>

        <i className="cursor-pointer hover:brightness-50">
          <HiGif className="text-green-500 w-[27px] h-[27px]" />
        </i>

        <i className="cursor-pointer hover:brightness-50">
          <PiDotsThreeOutlineFill className="text-slate-400 w-[27px] h-[27px]" />
        </i>
      </div>
    </div>
  );
};

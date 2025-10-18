/* eslint-disable react/prop-types */
import { HeaderReels } from "./partials/Reels/HeaderReels";
import { ReelsList } from "./partials/Reels/ReelsList";

export default function Reels() {
  return (
    <>
      <div className="bg-white h-[280px] mb-5 rounded-md drop-shadow-sm z-0">
        {/* Header */}
        <div className="h-[20%] w-[96%] mx-auto flex justify-center items-center">
          <ul className="mt-3 w-full h-[70%] flex justify-around items-center">
            <HeaderReels />
          </ul>
        </div>
        {/* End Header */}

        {/* Reels Content */}
        <div className="w-full bg-reds-200 px-5 py-5 flex gap-x-3">
          <ReelsList profileImage={"profile-default.jpg"} />
        </div>
        {/* End Reels Content */}
      </div>
    </>
  );
}

import { reelsUser } from "./reelsUser";

export const ReelsList = ({ profileImage }) => {
  return (
    <>
      {/* Create Reels */}
      <div className="bg-slate-200 w-[160px] rounded-xl drop-shadow-lg hover:brightness-[0.85]">
        <a href="#" className="h-full flex flex-col justify-between">
          {/* Background Image Profile User */}
          <img src={profileImage ? `img/${profileImage}` : "img/profile-default.jpg"} alt="profile-image" className="rounded-t-xl h-[75%]" />
          {/* Circle Plus */}
          <div className="flex justify-center mt-[-35px]">
            <div className="bg-blue-600 border-2 border-white h-[18%] w-[28%] rounded-full flex justify-center items-center absolute">
              <p className="text-white text-3xl font-semibold pb-1">+</p>
            </div>
          </div>
          {/* Text Add Story */}
          <p className="bg-white flex font-semibold text-sm pb-1 justify-center items-end rounded-b-xl h-[25%]">Buat Cerita</p>
        </a>
      </div>

      {/* Reels List */}
      <div className=" h-[80%] w-full rounded-xl relative overflow-hidden">
        <ul className="h-full max-w-full flex gap-x-2 ml-2 overflow-x-auto scrollbar-hide">
          {reelsUser.map((reel, index) => {
            return (
              <li key={index} className="w-[120px] flex-none relative cursor-pointer hover:opacity-80">
                {/* Image Profile */}
                <div className="absolute inset-0 flex items-start justify-start py-3 px-3 ">
                  <a href="#">
                    <img
                      src={`img/${reel.profileImage}`}
                      alt="profile-image"
                      width={"38px"}
                      height={"38px"}
                      className="rounded-full border-4 border-blue-600"
                    />
                  </a>
                </div>
                {/* Background Reels Image */}
                <img src={`img/${reel.thumbnail}`} alt="thumbnail" className="object-cover w-full h-full rounded-xl" />
                {/* Display Name User */}
                <div className="absolute inset-0 flex items-end justify-start px-5 py-3">
                  <p className="text-white text-start font-bold align-bottom">{reel.username}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

import { IoSearch, BsThreeDots } from "../../../../assets/icons";

export const RightbarHeader = () => {
  return (
    <>
      <div>
        <p className="font-semibold text-slate-500">Kontak</p>
      </div>
      <div className="flex gap-5">
        <a href="#">
          <IoSearch className="h-[20px] w-[20px] text-slate-500" />
        </a>
        <a href="#">
          <BsThreeDots className="h-[20px] w-[20px] text-slate-500" />
        </a>
      </div>
    </>
  );
};

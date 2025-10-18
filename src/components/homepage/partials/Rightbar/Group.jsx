import { LuPlus } from "../../../../assets/icons";

export const Group = () => {
  return (
    <div className="mt-2 flex flex-col gap-2">
      <div className="px-5">
        <p className="font-bold text-slate-500">Percakapan grup</p>
      </div>

      <div className="py-3 px-5">
        <a href="#" className="flex items-center gap-2">
          <LuPlus className="h-[28px] w-[28px] bg-slate-300 rounded-full" />
          <p className="font-semibold text-slate-600">Buat Grup Baru</p>
        </a>
      </div>
    </div>
  );
};

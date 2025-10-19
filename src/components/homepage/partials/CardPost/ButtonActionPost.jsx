export const ButtonActionPost = ({ Icon, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="h-[85%] w-1/3 font-semibold text-slate-500 flex justify-center items-center gap-2 rounded-sm hover:bg-slate-200"
    >
      {Icon ? <Icon className="size-[20px]" /> : <MdOutlineDisabledByDefault className="size-[20px]" />}
      <p className="text-sm">{title}</p>
    </button>
  );
};

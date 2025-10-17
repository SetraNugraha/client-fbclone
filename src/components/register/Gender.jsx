export const Gender = ({ handleChange, hasErrors }) => {
  return (
    <div className="mt-5">
      <label className="text-[12px]">Gender</label>
      <div className="flex gap-5">
        {/* Male */}
        <div className="p-2 flex gap-10 justify-center items-center border-[1px] border-slate-300 rounded-md w-1/2">
          <label htmlFor="male">Male</label>
          <input type="radio" name="gender" id="male" value={"male"} onChange={handleChange} />
        </div>

        {/* Female */}
        <div className="p-2 flex gap-10 justify-center items-center border-[1px] border-slate-300 rounded-md w-1/2">
          <label htmlFor="female">Female</label>
          <input type="radio" name="gender" id="female" value={"female"} onChange={handleChange} />
        </div>
        {/* END GENDER */}
      </div>
      {/* END TITLE */}
      {hasErrors.gender && <p className="text-[14px] text-red-500 ml-1 mt-1">{hasErrors.gender[0]}</p>}
    </div>
  );
};

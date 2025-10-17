export const InputForm = ({ type = "text", name, value, placeholder, className, onChange, hasError }) => {
  const baseClassName = `
  border rounded-lg placeholder:text-slate-300 w-full
  ${hasError ? "border-red-500" : "border-slate-300"}
  ${className || ""}`;

  return (
    <div>
      <input type={type} name={name} value={value} placeholder={placeholder} className={baseClassName} onChange={onChange} />

      {hasError && <p className="text-[14px] text-red-500 ml-1 mt-1">{hasError[0]}</p>}
    </div>
  );
};

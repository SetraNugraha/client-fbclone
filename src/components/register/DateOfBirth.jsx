import { generateDates, monthList, generateYears } from "../../utils/handleBirthday";

export const DateOfBirth = ({ payload, handleChange, hasErrors }) => {
  return (
    <div className="mt-5">
      <label className="text-[12px]">Date of birth</label>
      <div className="flex gap-5">
        {/* DAY */}
        <select name="date" onChange={handleChange} className="w-1/3 rounded-lg border-[1px] border-slate-300 ">
          {/* Default Option */}
          <option value={null} disabled={payload.day !== ""}>
            Select Date
          </option>
          {generateDates().map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        {/* END DAY */}

        {/* MONTH */}
        <select name="month" onChange={handleChange} required className="w-1/3 rounded-lg border-[1px] border-slate-300 ">
          {/* Default Option */}
          <option value={null} disabled={payload.month !== ""}>
            Select Month
          </option>
          {monthList.map((item, index) => (
            <option key={index} value={(index + 1).toString().padStart(2, "0")}>
              {item}
            </option>
          ))}
        </select>
        {/* END MONTH */}

        {/* YEAR */}
        <select name="year" onChange={handleChange} className="w-1/3 rounded-lg border-[1px] border-slate-300 ">
          {/* Default Option */}
          <option value={null} disabled={payload.year !== ""}>
            Select Year
          </option>
          {generateYears(1980).map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        {/* END YEAR */}
      </div>
      {hasErrors.date && <p className="text-[14px] text-red-500 ml-1 mt-1">{hasErrors.date[0]}</p>}
      {hasErrors.month && <p className="text-[14px] text-red-500 ml-1 mt-1">{hasErrors.month[0]}</p>}
      {hasErrors.year && <p className="text-[14px] text-red-500 ml-1 mt-1">{hasErrors.year[0]}</p>}
    </div>
  );
};

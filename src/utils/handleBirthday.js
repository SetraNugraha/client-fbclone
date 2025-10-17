// Days
export const generateDates = () => {
  const dates = [];
  for (let i = 1; i <= 31; i++) {
    dates.push(i);
  }
  return dates;
};

// Month
export const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Years
export const generateYears = (startYear) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = startYear; i <= currentYear; i++) {
    years.push(i);
  }
  return years;
};

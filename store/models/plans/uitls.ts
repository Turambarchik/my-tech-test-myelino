import { PlansResponse } from "./plans.types";

export const updateMonthData = (monthData: PlansResponse["monthData"], eventId: string) => {
  const updatedMonthData = { ...monthData };

  Object.entries(updatedMonthData).forEach(([month, monthDetails]) => {
    Object.entries(monthDetails).forEach(([date, planGroup]) => {
      Object.entries(planGroup).forEach(([planTitle, events]) => {
        updatedMonthData[month][date][planTitle] = events.filter(
          (event) => event._id !== eventId
        );

        if (updatedMonthData[month][date][planTitle].length === 0) {
          delete updatedMonthData[month][date][planTitle];
        }
      });

      if (Object.keys(updatedMonthData[month][date]).length === 0) {
        delete updatedMonthData[month][date];
      }
    });

    if (Object.keys(updatedMonthData[month]).length === 0) {
      delete updatedMonthData[month];
    }
  });

  return updatedMonthData;
};

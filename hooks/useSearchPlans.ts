import { useState, useEffect, useMemo } from "react";
import { PlanDTO, PlansResponse } from "@/store/models/plans/plans.types";

type UseSearchPlansReturn = {
  searchText: string;
  setSearchText: (text: string) => void;
  filteredQuickPlans: PlanDTO[];
  filteredMonthData: PlansResponse["monthData"];
};

export const useSearchPlans = (
  quickPlans: PlanDTO[],
  monthData: PlansResponse["monthData"]
): UseSearchPlansReturn => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText.trim());
    }, 300);

    return () => clearTimeout(handler);
  }, [searchText]);

  const filteredQuickPlans = useMemo(() => {
    if (!debouncedSearch) return quickPlans;

    const searchLower = debouncedSearch.toLowerCase();
    return quickPlans.filter(
      (plan) =>
        plan.place?.placeName?.title?.toLowerCase().includes(searchLower) ||
        plan.place?.description?.toLowerCase().includes(searchLower)
    );
  }, [debouncedSearch, quickPlans]);

  const filteredMonthData = useMemo(() => {
    if (!debouncedSearch) return monthData;

    const searchLower = debouncedSearch.toLowerCase();
    return Object.entries(monthData).reduce((acc, [month, monthData]) => {
      const filteredMonth = Object.entries(monthData).reduce(
        (innerAcc, [date, planGroup]) => {
          const filteredPlans = Object.entries(planGroup).reduce(
            (groupAcc, [planTitle, events]) => {
              const filteredEvents = events.filter(
                (event) =>
                  event.place?.placeName?.title?.toLowerCase().includes(searchLower) ||
                  event.place?.description?.toLowerCase().includes(searchLower)
              );
              if (filteredEvents.length > 0) {
                groupAcc[planTitle] = filteredEvents;
              }
              return groupAcc;
            },
            {} as typeof planGroup
          );
          if (Object.keys(filteredPlans).length > 0) {
            innerAcc[date] = filteredPlans;
          }
          return innerAcc;
        },
        {} as typeof monthData
      );
      if (Object.keys(filteredMonth).length > 0) {
        acc[month] = filteredMonth;
      }
      return acc;
    }, {} as PlansResponse["monthData"]);
  }, [debouncedSearch, monthData]);

  return {
    searchText,
    setSearchText,
    filteredQuickPlans,
    filteredMonthData,
  };
};

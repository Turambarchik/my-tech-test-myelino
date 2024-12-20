import { axiosClient } from "@/config/axiosClient";
import { Action, action, Thunk, thunk } from "easy-peasy";
import { PlanDTO, PlansResponse } from "./plans.types";

export interface PlansModel {
  plans: PlansResponse | null;
  setPlans: Action<this, PlansResponse | null>;
  eventsDetails: PlanDTO[];
  setEventsDetails: Action<this, PlanDTO[]>;
   specificDateEvents: PlanDTO[]
  setSpecificDateEvents: Action<this, PlanDTO[]>;

  fetchPlans: Thunk<this>;
  deleteEvent: Thunk<this, string>;
  deletePlan: Thunk<this, string[]>;
  clearPlanner: Thunk<this>;
  loadPlannerMockData: Thunk<this>;
}

export const plansModel: PlansModel = {
  plans: null,
  setPlans: action((state, payload) => {
    state.plans = payload;
  }),
  eventsDetails: [],
  setEventsDetails: action((state, payload) => {
    state.eventsDetails = payload;
  }),
  specificDateEvents: [],
  setSpecificDateEvents: action((state, payload) => {
    state.specificDateEvents = payload;
  }),

fetchPlans: thunk(async (actions) => {
  try {
    const response = await axiosClient.get<PlansResponse>("/plan");
    actions.setPlans({
      ...response.data,
      monthData: response.data.monthData || {}, 
    });
    actions.setEventsDetails(response.data.allplans || []);
  } catch (error) {
    console.error("Error fetching plans", error);
  }
}),

deleteEvent: thunk(async (actions, eventId, { getState }) => {
  const currentState = getState();

  const updatedPlans = {
    ...currentState.plans,
    allplans: currentState.plans?.allplans.filter((event) => event._id !== eventId) || [],
    quickPlans: currentState.plans?.quickPlans.filter((event) => event._id !== eventId) || [],
    monthData: currentState.plans?.monthData || {},
  };

  actions.setPlans(updatedPlans);
  actions.setEventsDetails(updatedPlans.allplans);

  try {
    await axiosClient.delete(`/plan/event/${eventId}`);
  } catch (error) {
    console.error("Error deleting event", error);
    await actions.fetchPlans();
  }
}),


deletePlan: thunk(async (actions, eventIds, { getState }) => {
  const currentState = getState();

  if (!currentState.plans) {
    console.error("No plans data available");
    return;
  }
  const updatedMonthData = Object.entries(currentState.plans.monthData).reduce(
    (acc, [month, monthDetails]) => {
      const updatedMonthDetails = Object.entries(monthDetails).reduce(
        (innerAcc, [date, planGroup]) => {
          const updatedPlanGroup = Object.entries(planGroup).reduce(
            (groupAcc, [planTitle, events]) => {
              const filteredEvents = events.filter((event) => !eventIds.includes(event._id));
              if (filteredEvents.length > 0) {
                groupAcc[planTitle] = filteredEvents;
              }
              return groupAcc;
            },
            {} as typeof planGroup
          );

          if (Object.keys(updatedPlanGroup).length > 0) {
            innerAcc[date] = updatedPlanGroup;
          }
          return innerAcc;
        },
        {} as typeof monthDetails
      );

      if (Object.keys(updatedMonthDetails).length > 0) {
        acc[month] = updatedMonthDetails;
      }
      return acc;
    },
    {} as PlansResponse["monthData"]
  );

  const updatedPlans: PlansResponse = {
    allplans: currentState.plans.allplans.filter((event) => !eventIds.includes(event._id)),
    quickPlans: currentState.plans.quickPlans.filter((event) => !eventIds.includes(event._id)),
    monthData: updatedMonthData,
  };

  actions.setPlans(updatedPlans);
  actions.setEventsDetails(updatedPlans.allplans);

  try {
    await axiosClient.delete("/plan", {
      data: { plans: eventIds },
    });
  } catch (error) {
    console.error("Error deleting plan", error);
    await actions.fetchPlans();
  }
}),
  clearPlanner: thunk(async (actions) => {
    actions.setPlans(null);
    try {
      await axiosClient.delete("/plan/clear-planner");
    } catch (error) {
      console.error("Error clearing planner", error);
      await actions.fetchPlans();
    }
  }),

  loadPlannerMockData: thunk(async () => {
    try {
      await axiosClient.get("/plan/load-data");
    } catch (error) {
      console.error("Error loading planner mock data", error);
    }
  }),
};

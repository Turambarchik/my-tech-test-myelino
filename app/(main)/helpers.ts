import { PlanDTO } from "@/store/models/plans/plans.types";

export function groupPlansByDate(plans: PlanDTO[]) {
  return plans.reduce<Record<string, PlanDTO[]>>((groups, plan) => {
    const dateKey = new Date(plan.date).toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(plan);
    return groups;
  }, {});
}
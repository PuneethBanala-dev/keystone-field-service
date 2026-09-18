import api from "./axiosConfig";

export interface DashboardSummary {
  totalWorkOrders: number;
  openCount: number;
  assignedCount: number;
  inProgressCount: number;
  completedCount: number;
  cancelledCount: number;
  slaBreachedCount: number;
  totalTechnicians: number;
  availableTechnicians: number;
}

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const response = await api.get<DashboardSummary>("/dashboard/summary");
  return response.data;
};
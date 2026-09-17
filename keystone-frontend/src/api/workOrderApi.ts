import api from "./axiosConfig";

export interface WorkOrder {
  id: number;
  title: string;
  description: string;
  customerId: number;
  customerName: string;
  technicianId: number | null;
  technicianName: string | null;
  status: string;
  priority: string;
  slaDeadline: string | null;
  createdAt: string;
  updatedAt: string;
}

export const getAllWorkOrders = async (): Promise<WorkOrder[]> => {
  const response = await api.get<WorkOrder[]>("/work-orders");
  return response.data;
};
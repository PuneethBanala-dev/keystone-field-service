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
export interface WorkOrderLog {
  id: number;
  status: string;
  note: string;
  changedByName: string;
  timestamp: string;
}

export interface PartUsed {
  id: number;
  workOrderId: number;
  partName: string;
  quantity: number;
  cost: number;
}

export const getWorkOrderById = async (id: number): Promise<WorkOrder> => {
  const response = await api.get<WorkOrder>(`/work-orders/${id}`);
  return response.data;
};

export const getLogs = async (id: number): Promise<WorkOrderLog[]> => {
  const response = await api.get<WorkOrderLog[]>(`/work-orders/${id}/logs`);
  return response.data;
};

export const getParts = async (id: number): Promise<PartUsed[]> => {
  const response = await api.get<PartUsed[]>(`/work-orders/${id}/parts`);
  return response.data;
};

export const updateStatus = async (id: number, status: string): Promise<WorkOrder> => {
  const response = await api.put<WorkOrder>(`/work-orders/${id}/status`, { status });
  return response.data;
};
export interface CreateWorkOrderRequest {
  title: string;
  description: string;
  customerId: number;
  priority: string;
}

export const createWorkOrder = async (
  data: CreateWorkOrderRequest
): Promise<WorkOrder> => {
  const response = await api.post<WorkOrder>("/work-orders", data);
  return response.data;
};
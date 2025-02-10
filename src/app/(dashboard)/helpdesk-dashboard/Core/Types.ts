export interface KPIData {
  totalTickets: number;
  newToday: number;
  pending: number;
  resolved: number;
  avgResolutionTime: string;
  customerSatisfaction: string;
}

export interface Ticket {
  id: string;
  title: string;
  status: string;
  priority: string;
  assignedTo: string;
  dueDate: string;
  lastUpdate: string;
}

export interface CategoryData {
  name: string;
  value: number;
}

export interface StatusData {
  name: string;
  value: number;
}

export interface TimelineData {
  name: string;
  abiertos: number;
  cerrados: number;
}

export type SortKey = keyof Ticket;

export interface SortConfig {
  key: SortKey | null;
  direction: "ascending" | "descending";
}

export interface FilterState {
  status: string;
  priority: string;
  category: string;
}

import {
  CategoryData,
  KPIData,
  StatusData,
  Ticket,
  TimelineData,
} from "./Types";

// Datos de ejemplo (mantenidos igual que en la versión anterior)
export const kpiData: KPIData = {
  totalTickets: 150,
  newToday: 12,
  pending: 45,
  resolved: 95,
  avgResolutionTime: "2h 30m",
  customerSatisfaction: "4.5/5",
};

export const ticketData: Ticket[] = [
  {
    id: "1",
    title: "Error en login",
    status: "Nuevo",
    priority: "Alta",
    assignedTo: "Juan Pérez",
    dueDate: "2023-06-15",
    lastUpdate: "2023-06-10",
  },
  {
    id: "2",
    title: "Actualización de software",
    status: "En progreso",
    priority: "Media",
    assignedTo: "Ana García",
    dueDate: "2023-06-20",
    lastUpdate: "2023-06-11",
  },
  {
    id: "3",
    title: "Problema de rendimiento",
    status: "Pendiente",
    priority: "Baja",
    assignedTo: "Carlos Rodríguez",
    dueDate: "2023-06-18",
    lastUpdate: "2023-06-12",
  },
  {
    id: "4",
    title: "Fallo en la base de datos",
    status: "Crítico",
    priority: "Crítico",
    assignedTo: "María López",
    dueDate: "2023-06-14",
    lastUpdate: "2023-06-13",
  },
  {
    id: "5",
    title: "Solicitud de nueva función",
    status: "Cancelado",
    priority: "Baja",
    assignedTo: "Pedro Sánchez",
    dueDate: "2023-06-25",
    lastUpdate: "2023-06-10",
  },
];

export const categoryData: CategoryData[] = [
  { name: "Soporte Técnico", value: 65 },
  { name: "Desarrollo", value: 40 },
  { name: "Ventas", value: 25 },
  { name: "Otros", value: 20 },
];

export const statusData: StatusData[] = [
  { name: "Nuevo", value: 30 },
  { name: "En Progreso", value: 45 },
  { name: "Pendiente", value: 15 },
  { name: "Resuelto", value: 60 },
];

export const timelineData: TimelineData[] = [
  { name: "Lun", abiertos: 12, cerrados: 10 },
  { name: "Mar", abiertos: 19, cerrados: 15 },
  { name: "Mié", abiertos: 15, cerrados: 18 },
  { name: "Jue", abiertos: 22, cerrados: 20 },
  { name: "Vie", abiertos: 18, cerrados: 25 },
  { name: "Sáb", abiertos: 10, cerrados: 15 },
  { name: "Dom", abiertos: 8, cerrados: 12 },
];

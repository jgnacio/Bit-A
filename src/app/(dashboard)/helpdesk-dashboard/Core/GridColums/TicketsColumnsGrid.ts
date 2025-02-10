import { GridColDef } from "@mui/x-data-grid";

export const TicketsColumnsGrid: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", flex: 1 },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    valueFormatter: (value, row, column, apiRef) => {
      if (row.status === "Nuevo") {
        return "Nuevo";
      } else if (row.status === "Pendiente") {
        return "Pendiente";
      } else if (row.status === "Crítico") {
        return "Crítico ☠️";
      } else if (row.status === "En progreso") {
        return "En Progreso";
      } else if (row.status === "Resuelto") {
        return "Resuelto";
      } else if (row.status === "Cancelado") {
        return "Cancelado";
      }
      return "Unknown";
    },
    cellClassName: (params) => {
      params.row.status;
      // Aplica la clase CSS basada en el valor formateado
      if (params.row.status === "Nuevo") {
        return "text-primary";
      } else if (params.row.status === "Pendiente") {
        return "text-secondary";
      } else if (params.row.status === "Crítico") {
        return "text-destructive font-bold";
      } else if (params.row.status === "Resuelto") {
        return "text-success";
      } else if (params.row.status === "En progreso") {
        return "text-foreground font-thin";
      }
      return "text-muted-foreground";
    },
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 100,

    cellClassName: (params) => {
      // Aplica la clase CSS basada en el valor formateado
      if (params.row.status === "Crítico") {
        return "text-destructive font-bold";
      } else if (params.row.priority === "Alta") {
        return "text-warning";
      } else if (params.row.priority === "Media") {
        return "text-primary";
      } else if (params.row.priority === "Baja") {
        return "text-muted-foreground";
      }
      return "text-muted-foreground";
    },

    valueFormatter: (value, row, column, apiRef) => {
      if (row.priority === "Crítico") {
        return "Crítico ☠️";
      } else if (row.priority === "Alta") {
        return "Alta";
      } else if (row.priority === "Media") {
        return "Media";
      } else if (row.priority === "Baja") {
        return "Baja";
      }
      return "Unknown";
    },
  },

  { field: "assignedTo", headerName: "Assigned to", width: 200 },
  { field: "dueDate", headerName: "Due date", width: 120 },
  { field: "lastUpdate", headerName: "Last update", width: 120 },
];

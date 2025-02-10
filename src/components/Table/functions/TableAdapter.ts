import { Ticket } from "@/app/(dashboard)/helpdesk-dashboard/Core/Types";
import { TableRow } from "../Types";

export const MapTicketsToTableRows = (tickets: Ticket[]): TableRow[] => {
  return tickets.map((ticket) => ({
    id: ticket.id,
    cells: [
      { id: "id", type: "text", value: ticket.id },
      { id: "title", type: "text", value: ticket.title },
      { id: "status", type: "text", value: ticket.status },
      { id: "priority", type: "text", value: ticket.priority },
      { id: "assignedTo", type: "text", value: ticket.assignedTo },
      { id: "dueDate", type: "date", value: ticket.dueDate },
      { id: "lastUpdate", type: "date", value: ticket.lastUpdate },
    ],
  }));
};

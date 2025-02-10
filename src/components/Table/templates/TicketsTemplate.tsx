import { TemplateConfigCustomTable } from "../CustomTable";

export const TicketsTemplate: TemplateConfigCustomTable[] = [
  { title: "ID", type: "text", editable: true },
  { title: "Title", type: "text", editable: true },
  { title: "Status", type: "text", editable: true },
  { title: "Priority", type: "text", editable: true },
  { title: "Assigned to", type: "text", editable: true },
  { title: "Due date", type: "date", editable: true },
  { title: "Last update", type: "date", editable: true },
];

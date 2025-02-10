import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActiveView } from "@/zustand/Dashboard/useActiveView";
import { useState } from "react";
import { Ticket } from "../Core/Types";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DataGrid,
  GridRenderCellParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { ticketData } from "../Core/safeData";
import { TicketsColumnsGrid } from "../Core/GridColums/TicketsColumnsGrid";

function Tickets() {
  const [filters, setFilters] = useState<Ticket>({
    id: 0,
    title: "",
    status: "",
    priority: "",
    assignedTo: "",
    dueDate: "",
    lastUpdate: "",
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev: Ticket) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="flex justify-start items-center mb-8">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold">Tickets Activos</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 mb-4">
            <Input placeholder="Buscar tickets..." className="w-1/4" />

            <DataGrid
              rows={ticketData}
              columns={TicketsColumnsGrid}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
              checkboxSelection={false}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default Tickets;

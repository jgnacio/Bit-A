"use client";
import { TableRow } from "@/components/Table/Types";
import Tickets from "../Views/Tickets";

import { ticketData } from "../Core/safeData";
import CustomTable, {
  ConfigCustomTableProps,
} from "@/components/Table/CustomTable";
import { MapTicketsToTableRows } from "@/components/Table/functions/TableAdapter";
import { TicketsTemplate } from "@/components/Table/templates/TicketsTemplate";
function Page() {
  const data: TableRow[] = MapTicketsToTableRows(ticketData);

  const config: ConfigCustomTableProps = {
    showId: true,
    template: TicketsTemplate,
  };

  return (
    <>
      <CustomTable data={data} config={config} />
    </>
  );
}

export default Page;

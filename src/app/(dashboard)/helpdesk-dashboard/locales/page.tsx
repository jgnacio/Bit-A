"use client";
import CustomTable, {
  ConfigCustomTableProps,
} from "@/components/Table/CustomTable";
import { TableRow } from "@/components/Table/Types";

function page() {
  const data: TableRow[] = [
    {
      id: "1",
      cells: [
        { id: "1-1", type: "text", value: "Fila 1", editable: true },
        { id: "1-2", type: "number", value: 100, editable: true },
        {
          id: "1-3",
          type: "date",
          value: new Date(Date.UTC(2023, 5, 10)),
          editable: true,
        },
        {
          id: "1-4",
          type: "button",
          value: "Acción",
          onClick: () => alert("Botón clicado"),
        },
      ],
    },
    {
      id: "2",
      cells: [
        { id: "2-1", type: "text", value: "Fila 2", editable: true },
        { id: "2-2", type: "number", value: 200, editable: true },
        { id: "2-3", type: "date", value: new Date(), editable: true },
        {
          id: "2-4",
          type: "button",
          value: "Acción",
          onClick: () => alert("Botón clicado"),
        },
      ],
    },
  ];

  const config: ConfigCustomTableProps = {
    showId: true,
    template: [
      { title: "ID", type: "text" },
      { title: "Locale", type: "text" },
    ],
  };

  return <CustomTable data={data} config={config} />;
}

export default page;

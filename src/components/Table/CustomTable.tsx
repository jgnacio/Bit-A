"use client";
import {
  CellRenderer,
  transformValueToReactNode,
} from "@/lib/functions/Table/CellRenderer";
import { cn } from "@/lib/utils";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Eye, EyeOff, GripVertical } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

// Tipos de datos para las celdas
type CellType = "text" | "number" | "date" | "button";

// Definición de una celda
interface TableCell {
  id: string;
  type: CellType;
  value: string | number | Date;
  editable?: boolean;
  placeholder?: string;
  onClick?: () => void;
}

// Definición de una fila
interface TableRow {
  id: string;
  cells: TableCell[];
  actions?: {
    edit?: () => void;
    delete?: () => void;
    view?: () => void;
  };
}

export interface TemplateConfigCustomTable {
  title?: string;
  type: CellType;
  editable?: boolean;
  placeholder?: string;
  onClick?: () => void;
}

export interface ConfigCustomTableProps {
  showId?: boolean;
  template: TemplateConfigCustomTable[];
}

function CustomTable({
  data,
  config,
}: {
  data: TableRow[];
  config: ConfigCustomTableProps;
}) {
  const [rows, setRows] = useState<TableRow[]>(data);
  let arrayColumns = Array(config.template.length).fill(true);
  const IDIndex = config.template.findIndex(
    (item) => item.title?.toLocaleLowerCase() === "id"
  );
  if (IDIndex !== -1 && !config.showId) {
    arrayColumns[IDIndex] = false;
  }
  // Estado para controlar la visibilidad de las columnas
  const [visibleColumns, setVisibleColumns] = useState<boolean[]>(arrayColumns);
  if (!config || !config.template || !config.template.length || !data.length) {
    return null;
  }

  // Manejador de eventos cuando se termina de arrastrar una fila
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setRows((prevRows) => {
        const oldIndex = prevRows.findIndex((row) => row.id === active.id);
        const newIndex = prevRows.findIndex((row) => row.id === over.id);
        return arrayMove(prevRows, oldIndex, newIndex);
      });
    }
  };

  // Manejador para actualizar el valor de una celda
  const updateCellValue = (
    rowId: string,
    cellId: string,
    newValue: string | number | Date
  ) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              cells: row.cells.map((cell) =>
                cell.id === cellId ? { ...cell, value: newValue } : cell
              ),
            }
          : row
      )
    );
  };

  // Manejador para alternar la visibilidad de una columna
  const toggleColumnVisibility = (columnIndex: number) => {
    setVisibleColumns((prevVisibleColumns) =>
      prevVisibleColumns.map((visible, index) =>
        index === columnIndex ? !visible : visible
      )
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* Botones para alternar visibilidad */}

      <div className="flex flex-col gap-4">
        <div className="flex justify-end gap-2 w-full">
          {config.template.map((column, index) => (
            <Button
              key={index}
              variant={"outline"}
              className={cn(
                " justify-start text-left font-normal",
                !column.title && "text-muted-foreground"
              )}
              onClick={() => toggleColumnVisibility(index)}
              disabled={IDIndex === index && config.showId === false}
            >
              {visibleColumns[index] ? <Eye /> : <EyeOff />} {column.title}
            </Button>
          ))}
        </div>
        {/* Encabezado */}
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="w-0"></th>
              {config.template.map(
                (column, index) =>
                  visibleColumns[index] && (
                    <th key={index} className="border p-2">
                      {column.title}
                    </th>
                  )
              )}
            </tr>
          </thead>
          {/* Cuerpo */}
          <tbody>
            <SortableContext
              items={rows.map((row) => row.id)}
              strategy={verticalListSortingStrategy}
            >
              {rows.map((row) => (
                <SortableRow
                  key={row.id}
                  id={row.id}
                  cells={row.cells}
                  visibleColumns={visibleColumns}
                  template={config.template}
                  updateCellValue={updateCellValue}
                />
              ))}
            </SortableContext>
          </tbody>
        </table>
      </div>
    </DndContext>
  );
}

// Componente para cada fila arrastrable
const SortableRow = ({
  id,
  cells,
  visibleColumns,
  template,
  updateCellValue,
}: {
  id: string;
  cells: TableCell[];
  visibleColumns: boolean[];
  template: TemplateConfigCustomTable[];
  updateCellValue: (
    rowId: string,
    cellId: string,
    newValue: string | number | Date
  ) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1, // Opacidad reducida mientras se arrastra
  };
  return (
    <tr ref={setNodeRef} style={style} className="group">
      {/* Grip */}
      <td className="" {...attributes} {...listeners}>
        <GripVertical className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500" />
      </td>
      {/* Celdas */}
      {cells.map(
        (cell, index) =>
          visibleColumns[index] && (
            <td key={cell.id} className="border p-2 bg-background text-left">
              {template[index].editable ? (
                <CellRenderer
                  cell={cell}
                  onChange={(newValue) =>
                    updateCellValue(id, cell.id, newValue)
                  }
                />
              ) : (
                <span>{transformValueToReactNode(cell.value)}</span>
              )}
            </td>
          )
      )}
    </tr>
  );
};

export default CustomTable;

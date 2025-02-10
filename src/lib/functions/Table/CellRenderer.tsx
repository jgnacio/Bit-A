import { TableCell } from "@/components/Table/Types";
import { ToggleInput } from "@/components/ui/Custom/custom-input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

// Función para transformar valores en nodos JSX válidos
export const transformValueToReactNode = (
  value: string | number | Date
): React.ReactNode => {
  if (value instanceof Date) {
    return value.toLocaleDateString(); // Convierte la fecha a un formato legible
  }
  return value; // Texto o número se pueden renderizar directamente
};

export const CellRenderer = ({
  cell,
  onChange,
}: {
  cell: TableCell;
  onChange: (newValue: string | number | Date) => void;
}) => {
  switch (cell.type) {
    case "text":
      return (
        <ToggleInput
          type="text"
          value={cell.value as string}
          onChange={(newValue) => onChange(newValue as any)}
        />
      );

    case "number":
      return (
        <ToggleInput
          type="number"
          value={cell.value as number}
          onChange={(newValue) => onChange(newValue as any)}
        />
      );

    case "date":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !cell.value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {cell.value ? (
                format(cell.value as Date, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={cell.value as Date}
              onSelect={(date) => {
                if (date) {
                  onChange(date); // Solo llama a onChange si hay una fecha seleccionada
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );

    case "button":
      return (
        <Button
          variant={"outline"}
          className={cn(
            " justify-start text-left font-normal",
            !cell.value && "text-muted-foreground"
          )}
          onClick={cell.onClick}
        >
          {transformValueToReactNode(cell.value)}
        </Button>
      );

    default:
      return <span>{transformValueToReactNode(cell.value)}</span>;
  }
};

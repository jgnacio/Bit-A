type CellType = "text" | "number" | "date" | "button";

export interface TableCell {
  id: string;
  type: CellType;
  value: string | number | Date;
  editable?: boolean;
  placeholder?: string;
  onClick?: () => void;
}

export interface TableRow {
  id: string;
  cells: TableCell[];
}

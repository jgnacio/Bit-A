"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export interface MultiSelectItem {
  value: string;
  label: string;
}

interface MultiSelectProps {
  items: MultiSelectItem[];
  onSelectionChange: (selectedItems: MultiSelectItem[]) => void;
}

export function MultiSelect({ items, onSelectionChange }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<MultiSelectItem[]>(
    []
  );

  React.useEffect(() => {
    onSelectionChange(selectedItems);
  }, [selectedItems, onSelectionChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedItems.length > 0
            ? `${selectedItems.length} item${
                selectedItems.length > 1 ? "s" : ""
              } seleccionado${selectedItems.length > 1 ? "s" : ""}`
            : "Seleccionar items..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar item..." />
          <CommandList>
            <CommandEmpty>No se encontraron items.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => {
                    setSelectedItems((prev) =>
                      prev.some((item) => item.value === item.value)
                        ? prev.filter((item) => item.value !== item.value)
                        : [...prev, item]
                    );
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedItems.some((item) => item.value === item.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      <div className="mt-3">
        {selectedItems.map((item) => (
          <Badge key={item.value} variant="secondary" className="mr-1 mb-1">
            {item.label}
          </Badge>
        ))}
      </div>
    </Popover>
  );
}

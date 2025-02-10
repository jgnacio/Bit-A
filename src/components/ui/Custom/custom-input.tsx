import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import * as React from "react";
type ToggleInputProps = Omit<React.ComponentProps<"input">, "onChange"> & {
  onChange?: (value: string | number | undefined) => void;
};

const ToggleInput = React.forwardRef<HTMLInputElement, ToggleInputProps>(
  (
    { className, value: initialValue, onChange, onBlur, type, ...props },
    ref
  ) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [value, setValue] = React.useState(initialValue || "");

    const saveTimeoutRef = React.useRef<number | null>(null);

    const handleSave = () => {
      setIsEditing(false);
      if (onChange) {
        const finalValue =
          type === "number" ? Number(value) || undefined : value;
        onChange(finalValue as any);
      }
    };

    const handleCancel = () => {
      setIsEditing(false);
      setValue(initialValue || "");

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };

    return isEditing ? (
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex items-center space-x-2"
      >
        <input
          type={type || "text"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Check />
        </motion.button>
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          onClick={(e) => {
            e.preventDefault();
            handleCancel();
          }}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancelar
        </motion.button>
      </motion.div>
    ) : (
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onClick={() => setIsEditing(true)}
        className="cursor-pointer text-muted-foreground hover:text-foreground"
      >
        {initialValue || "Click para editar"}
      </motion.span>
    );
  }
);

ToggleInput.displayName = "ToggleInput";

export { ToggleInput };

import type { RowData } from "@tanstack/react-table";
import type { FilterOperator, FilterVariant } from "./constants";

declare module "@tanstack/react-table" {
  // biome-ignore lint/correctness/noUnusedVariables: TValue is used in the ColumnMeta interface
  interface ColumnMeta<TData extends RowData, TValue> {
    label?: string;
    placeholder?: string;
    variant?: FilterVariant;
    options?: Option[];
    range?: [number, number];
    unit?: string;
    filterKey?: string; // Dot-notation path for filter path
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    className?: string; // Header class
  }
}

export interface Option {
  label: string;
  value: string;
  count?: number;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface ExtendedColumnFilter<TData> {
  id: string;
  operator: FilterOperator;
  value: any;
}

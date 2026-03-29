"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Table } from "@tanstack/react-table";
import { X, Search } from "lucide-react";
import type * as React from "react";

interface DataTableToolbarProps<TData> extends React.ComponentProps<"div"> {
  table: Table<TData>;
  searchKey?: string;
}

export function DataTableToolbar<TData>({
  table,
  children,
  className,
  searchKey,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-2 font-mono",
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 items-center gap-2">
        {searchKey && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search for ${searchKey}...`}
              value={
                (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(searchKey)?.setFilterValue(event.target.value)
              }
              className="h-9 w-64 pl-9 rounded-xl bg-card/50"
            />
          </div>
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-9 px-3 lg:px-4 rounded-xl"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

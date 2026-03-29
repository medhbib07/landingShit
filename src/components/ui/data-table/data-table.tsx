"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCommonPinningStyles } from "./utils";
import { cn } from "@/lib/utils";
import { useDataTableStore } from "./store";
import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";
import type * as React from "react";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

interface DataTableProps<TData> extends React.ComponentProps<"div"> {
  table: TanstackTable<TData>;
  isLoading?: boolean;
  // Context Menu Content
  actions?: React.ReactNode;
}

export function DataTable<TData>({
  table,
  isLoading,
  children,
  className,
  actions,
  ...props
}: DataTableProps<TData>) {
  const { setRightClickData } = useDataTableStore();

  return (
    <div className={cn("flex w-full flex-col", className)} {...props}>
      <div className="hidden md:block">{children}</div>
      {/* Desktop Table View */}
      <div className="hidden flex-1 flex-col overflow-hidden rounded-md border md:flex">
        <div className="h-full min-w-full max-w-0 flex-1 overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 z-20 bg-background font-mono ring ring-border">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className="border-b" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      colSpan={header.colSpan}
                      key={header.id}
                      style={{
                        ...getCommonPinningStyles({ column: header.column }),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody
              className={cn(
                "font-mono first:border-t-0",
                !isLoading && "last:border-b",
              )}
            >
              {isLoading ? (
                <TableRow className="border-b-0 hover:bg-background">
                  <TableCell
                    className="h-96 text-center"
                    colSpan={table.getAllColumns().length}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-center gap-1">Loading...</div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <ContextMenu
                        key={cell.id}
                        onOpenChange={() =>
                          setRightClickData(row.id, cell.id, cell.renderValue())
                        }
                      >
                        <ContextMenuTrigger asChild>
                          <TableCell
                            className="h-fit"
                            key={cell.id}
                            style={{
                              ...getCommonPinningStyles({
                                column: cell.column,
                              }),
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        </ContextMenuTrigger>
                        {actions}
                      </ContextMenu>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-b-0 hover:bg-background">
                  <TableCell
                    className="h-64 text-center"
                    colSpan={table.getAllColumns().length}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      No results.
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* (Mobile card view omitted for brevity/porting complexity, can add later) */}
    </div>
  );
}

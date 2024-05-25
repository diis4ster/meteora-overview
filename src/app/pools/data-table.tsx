"use client"
import { Input } from "@/components/ui/input"

import * as React from "react"
import {
    ColumnDef,
    SortingState,
    ColumnFiltersState,
    flexRender,
    getFilteredRowModel,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "./data-table-pagination"
import { useEffect } from "react"
import DataTableFilters from "./data-table-filters"
import { Label } from "@/components/ui/label"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            columnFilters,
            sorting,
        },
    });
    useEffect(() => {
        table.setPageSize(30);
        table.getColumn("liquidity")?.toggleSorting(true);
        table.getColumn("liquidity")?.setFilterValue(5);
    }, [table]);
    return (
        <div>
            <div className="flex flex-wrap items-center justify-between py-3 w-full">
                <div className="flex flex-wrap items-center justify-between py-3 w-full md:w-auto">
                    <div className="flex items-center py-3">
                        <Label htmlFor="name" className="whitespace-nowrap text-sm mr-2">Name</Label>
                        <Input
                            placeholder="Filter by name..."
                            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("name")?.setFilterValue(event.target.value)
                            }
                            className="w-32 mr-5 sm:w-64"
                            id="name"
                            autoFocus
                        />
                    </div>
                    {/* <DataTableFilters table={table} /> */}
                    <div className="flex items-center py-3">
                        <Label htmlFor="min-liq" className="whitespace-nowrap text-sm mr-2">Min $TVL</Label>
                        <Input
                            type="number"
                            placeholder="0"
                            value={(table.getColumn("liquidity")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("liquidity")?.setFilterValue(event.target.value)
                            }
                            id="min-liq"
                            className="w-16 mr-5 sm:w-32"
                        />
                    </div>
                </div>
                <div className="ml-auto mt-3 md:mt-0">
                    <DataTablePagination table={table} />
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}
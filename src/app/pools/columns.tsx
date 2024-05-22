"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { Button, buttonVariants } from "@/components/ui/button"

import {
    ExternalLinkIcon,
    CaretSortIcon,
  } from "@radix-ui/react-icons"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Pool = {
    address: string,
    name: string,
    liquidity: number,
    today_fees: number,
    base_fee_percentage: number,
    cumulative_trade_volume: number,
    bin_step: number,
    ratio: number,
}
 
export const columns: ColumnDef<Pool>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "bin_step",
    header: "Bin step",
  },
  {
    accessorKey: "base_fee_percentage",
    header: "Base Fee",
    cell: ({ row }) => {
      return <div>{row.getValue("base_fee_percentage")}%</div>;
  }
  },
  {
    accessorKey: "cumulative_trade_volume",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Volume 24h
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
        const value = parseFloat(row.getValue("cumulative_trade_volume"))
   
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value)

        return formatted;
    },
  },
  {
    accessorKey: "liquidity",
    
    filterFn: (row, columnId, filterValue) => {
      return parseFloat(row.getValue("liquidity")) > filterValue;
    },
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            TVL
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
        const value = parseFloat(row.getValue("liquidity"))
   
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value)

        return formatted;
    },
  },
  {
    accessorKey: "today_fees",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fees
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
        const value = parseFloat(row.getValue("today_fees"))
   
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value)

        return formatted;
    }
  },
  {
    accessorKey: "ratio",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fees/TVL
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) => {
        const value = parseFloat(row.getValue("ratio"));
        
        const formatted = (Math.round(value * 100) / 100).toFixed(3);

        return <div>{formatted}%</div>;
    }
  },
  {
    accessorKey: "address",
    header: "Link",
    cell: ({ row }) => {
        const link = "https://app.meteora.ag/dlmm/" + row.getValue("address");
        return <div>
            <a href={link} target="_blank">
                <ExternalLinkIcon/>
            </a>
        </div>;
    }
  },
]
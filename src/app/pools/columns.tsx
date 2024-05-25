"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

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
  fees_24h: number,
  base_fee_percentage: number,
  cumulative_trade_volume: number,
  bin_step: number,
  ratio: number,
  mint_x: string,
  mint_y: string
}

//Get birdeye link
function getBirdeyeAddr(mint_x: string, mint_y: string) {
  if (mint_x == "So11111111111111111111111111111111111111112") return mint_y;
  return mint_x;
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
    accessorKey: "fees_24h",
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
      const value = parseFloat(row.getValue("fees_24h"))

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
    header: "Links",
    cell: ({ row }) => {
      const met = "https://app.meteora.ag/dlmm/" + row.getValue("address");
      const rug = "https://rugcheck.xyz/tokens/" + row.getValue("address");
      const dex = "https://dexscreener.com/solana/" + row.getValue("address");
      const bird = `https://birdeye.so/token/${getBirdeyeAddr(row.getValue("mint_x"), row.getValue("mint_y"))}/${row.getValue("address")}?chain=solana`;
      return <div className="flex items-center justify-center">
        <a className="outline bg-secondary outline-1 outline-secondary/90 p-1 rounded-sm mr-2" href={bird} target="_blank">
          <abbr title="Birdeye">
            <img width={13} src="/icon-bird.ico" alt="birdeye" />
          </abbr>
        </a>
        <a className="outline bg-secondary outline-1 outline-secondary/90 p-1 rounded-sm mr-2" href={dex} target="_blank">
          <abbr title="DexScreener">
            <img width={13} src="/icon-dex.png" alt="dexscreener" />
          </abbr>
        </a>
        <a className="outline bg-secondary outline-1 outline-secondary/90 p-1 rounded-sm mr-2" href={rug} target="_blank">
          <abbr title="RugCheck">
            <img width={13} src="/icon-rug.jpg" alt="rugcheck" />
          </abbr>
        </a>
        <a className="outline bg-secondary outline-1 outline-orange-500/90 p-1 rounded-sm mr-2" href={met} target="_blank">
          <abbr title="Meteora">
            <img width={13} src="/icon-met.svg" alt="meteora" />
          </abbr>
        </a>
      </div>;
    }
  },
  {
    accessorKey: "mint_x",
    header: ({ column }) => {column.toggleVisibility();},
  },
  {
    accessorKey: "mint_y",
    header: ({ column }) => {column.toggleVisibility();},
  },
]
"use client"

import { formatDistanceToNow } from 'date-fns';
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

import {
  ExternalLinkIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons"
import { CombinedPair } from "@/lib/interfaces"

import { kFormatter } from '@/lib/utils';

//Get birdeye link
function getBirdeyeAddr(mint_x: string, mint_y: string) {
  if (mint_x == "So11111111111111111111111111111111111111112") return mint_y;
  return mint_x;
}

export const columns: ColumnDef<CombinedPair>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "created",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Age
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const created = new Date(row.getValue("created"));
      const timeAgo = formatDistanceToNow(new Date(created), { addSuffix: false });
      return <div>{timeAgo}</div>;
    }
  },
  {
    accessorKey: "bin_step",
    header: () => {
      return (
        <div className="flex whitespace-nowrap">Bin Step</div>
      )
    },
  },
  {
    accessorKey: "base_fee_percentage",
    header: () => {
      return (
        <div className="flex whitespace-nowrap">Base Fee</div>
      )
    },
    cell: ({ row }) => {
      return <div>{row.getValue("base_fee_percentage")}%</div>;
    }
  },
  {
    accessorKey: "vol_m5",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vol. 5m
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("vol_m5"))

      // Format the amount as a dollar amount
      const formatted = kFormatter(value);

      return formatted;
    },
  },
  {
    accessorKey: "vol_h1",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vol. 1h
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("vol_h1"))

      const formatted = kFormatter(value);

      return formatted;
    },
  },
  {
    accessorKey: "vol_h6",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vol. 6h
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("vol_h6"))

      const formatted = kFormatter(value);

      return formatted;
    },
  },
  {
    accessorKey: "vol_h24",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vol. 24h
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("vol_h24"))

      const formatted = kFormatter(value);

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

      const formatted = kFormatter(value);

      return formatted;
    },
  },
  {
    accessorKey: "fees_h24",
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
      const value = parseFloat(row.getValue("fees_h24"))

      const formatted = kFormatter(value);

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
            <img className="min-w-7 w-7 sm:min-w-4 sm:w-4" src="/icon-bird.ico" alt="birdeye" />
          </abbr>
        </a>
        <a className="outline bg-secondary outline-1 outline-secondary/90 p-1 rounded-sm mr-2" href={dex} target="_blank">
          <abbr title="DexScreener">
            <img className="min-w-7 w-7 sm:min-w-4 sm:w-4" src="/icon-dex.png" alt="dexscreener" />
          </abbr>
        </a>
        <a className="outline bg-secondary outline-1 outline-secondary/90 p-1 rounded-sm mr-2" href={rug} target="_blank">
          <abbr title="RugCheck">
            <img className="min-w-7 w-7 sm:min-w-4 sm:w-4" src="/icon-rug.jpg" alt="rugcheck" />
          </abbr>
        </a>
        <a className="outline bg-secondary outline-1 outline-orange-500/90 p-1 rounded-sm mr-2" href={met} target="_blank">
          <abbr title="Meteora">
            <img className="min-w-7 w-7 sm:min-w-4 sm:w-4" src="/icon-met.svg" alt="meteora" />
          </abbr>
        </a>
      </div>;
    }
  },
  {
    accessorKey: "mint_x",
    header: ({ column }) => {column.toggleVisibility();},
    cell: ({row}) => {}
  },
  {
    accessorKey: "mint_y",
    header: ({ column }) => {column.toggleVisibility();},
    cell: ({row}) => {}
  },
]
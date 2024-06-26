import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Crosshair2Icon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { Table } from "@tanstack/react-table"

interface DataTableFiltersProps<TData> {
    table: Table<TData>
}

export default function DataTableFilters<TData>({
    table,
}: DataTableFiltersProps<TData>) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    onClick={() => { }}
                >
                    <Crosshair2Icon className="mr-2 h-4 w-4" />
                    <span className="block sm:hidden">Filters</span>
                    <span className="hidden sm:block">Advanced Filters</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex items-center space-x-2 mt-4">
                    <Label htmlFor="min-liq" className="whitespace-nowrap text-sm">Min $TVL:</Label>
                    <Input
                        type="number"
                        placeholder="0"
                        value={(table.getColumn("liquidity")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("liquidity")?.setFilterValue(event.target.value)
                        }
                        id="min-liq"
                    />
                </div>
                <Badge variant="outline" className="bg-warning text-warning-foreground max-w-sm mt-5">* This menu is experimental and it can break. Additional filters will be added.</Badge>
            </PopoverContent>
        </Popover>
    );
}
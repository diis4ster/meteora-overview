import { ModeToggle } from "@/components/ui/dark-mode-toggle";
import { columns } from "./pools/columns";
import { DataTable } from "./pools/data-table";
import Goose from "@/components/ui/goose";
import { getCombinedPairs } from "@/lib/dexscreener";

async function getData() {

  try {
    const combinedPairs = await getCombinedPairs();
    return combinedPairs;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between space-x-2 py-4">
        {/* Meteora gradient: 87deg, #FF2189 -36.79%, #FF9D00 114.4%*/}
        <div>
          <h1 className="text-2xl font-bold inline-block text-transparent bg-clip-text md:text-3xl"
            style={{ backgroundImage: 'linear-gradient(87deg, #FF2189 -36.79%, #FF9D00 114.4%)' }}>
            Meteora Liquidity Pools Overview
          </h1>
        </div>
        <ModeToggle />
      </div>
      <DataTable columns={columns} data={data} />
      <footer className="flex items-center justify-between space-x-2 py-4 text-sm text-slate-500">
        <div className="flex flex-wrap">
          <span className="mr-1">Made for the Meteora community,</span>
          <span>with love by <span className="font-bold text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(87deg, #FF2189 -36.79%, #FF9D00 114.4%)' }}>Diisaster</span>.</span>
            <Goose/>
        </div>
        <div>2024</div>
      </footer>
    </div>
  );
}
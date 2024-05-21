import { ModeToggle } from "@/components/ui/dark-mode-toggle";
import { Pool, columns } from "./pools/columns";
import { DataTable } from "./pools/data-table";

async function getData(): Promise<Pool[]> {
  try {
    const response = await fetch('https://dlmm-api.meteora.ag/pair/all', {
      next: { revalidate: 30 } // Revalidate the data every 30 seconds
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data: Pool[] = await response.json();
    data.forEach(el => {
      el["ratio"] = (el.today_fees / el.liquidity) * 100 || 0;
    });
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; 
  }
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between space-x-2 py-4">
        <div><h1 className="text-2xl font-bold">Meteora Liquidity Pools Overview</h1></div>
        <ModeToggle/> 
      </div>
      <DataTable columns={columns} data={data} />
      <footer className="flex items-center justify-between space-x-2 py-4 text-sm text-slate-500">
            <div>Made for the Meteora community, with love by <span className="font-bold">Diisaster</span>.</div>
            <div>2024</div>
      </footer>
    </div>
  );
}
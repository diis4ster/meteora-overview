import { MeteoraPair } from './interfaces';

const METEORA_URL = 'https://dlmm-api.meteora.ag/pair/all';

export async function getMeteoraPairs(): Promise<MeteoraPair[]> {
  try {
    const response = await fetch(METEORA_URL,  { next: { revalidate: 120 } });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: MeteoraPair[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Meteora pairs:', error);
    throw error;
  }
}
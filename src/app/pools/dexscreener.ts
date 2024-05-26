import { PairsResponse, Pair, MeteoraPair } from './interfaces';
import { splitArrayIntoChunks } from '../../lib/utils';
import { getMeteoraPairs } from './meteora';

export const revalidate = 120;

const BASE_URL = 'https://api.dexscreener.com/latest/dex';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getDexPairs(pairAddresses: string[]): Promise<{ [address: string]: Pair }> {
  const chunks = splitArrayIntoChunks(pairAddresses, 30);
  const pairsByAddress: { [address: string]: Pair } = {};

  for (const chunk of chunks) {
    const url = `${BASE_URL}/pairs/solana/${chunk.join(',')}`;
    try {
      const response = await fetch(url, { next: { revalidate: 120 } });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: PairsResponse = await response.json();
      data.pairs?.forEach(pair => {
        pairsByAddress[pair.pairAddress] = pair;
      });
    } catch (error) {
      console.error('Error fetching pairs:', error);
    }
    await delay(50);
  }

  return pairsByAddress;
}

export async function getCombinedPairs(): Promise<any[]> {
  try {
    const meteoraPairs = await getMeteoraPairs();
    const pairAddresses: string[] = meteoraPairs.map(pair => pair.address);
    const dexPairs = await getDexPairs(pairAddresses);

    const meteoraPairsByAddress: { [address: string]: MeteoraPair } = {};
    meteoraPairs.forEach(pair => {
      meteoraPairsByAddress[pair.address] = pair;
    });

    const combinedPairs: any[] = [];

    for (const [address, dexPair] of Object.entries(dexPairs)) {
      const meteoraPair = meteoraPairsByAddress[address];
      if (meteoraPair) {
        combinedPairs.push({
          address: address,
          name: meteoraPair.name,
          fees_h24: meteoraPair.fees_24h,
          bin_step: meteoraPair.bin_step,
          base_fee_percentage: meteoraPair.base_fee_percentage,
          vol_h24: dexPair.volume.h24,
          vol_h6: dexPair.volume.h6,
          vol_h1: dexPair.volume.h1,
          vol_m5: dexPair.volume.m5,
          ratio: dexPair.liquidity?.usd ? (meteoraPair.fees_24h / dexPair.liquidity?.usd) * 100 : 0,
          liquidity: dexPair.liquidity?.usd ? dexPair.liquidity?.usd : 0,
          created: dexPair.pairCreatedAt,
          mint_x: meteoraPair.mint_x,
          mint_y: meteoraPair.mint_y,
        });
      } else {
        combinedPairs.push(dexPair);
      }
    }

    return combinedPairs;
  } catch (error) {
    console.error('Error combining pairs:', error);
    throw new Error('Failed to combine pairs');
  }
}
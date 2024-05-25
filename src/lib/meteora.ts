import axios from 'axios';

import { MeteoraPair } from './interfaces';


const METEORA_URL = 'https://dlmm-api.meteora.ag/pair/all';

export async function getMeteoraPairs(): Promise<MeteoraPair[]> {
  try {
    const response = await axios.get<MeteoraPair[]>(METEORA_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching Meteora pairs:', error);
    throw error;
  }
}
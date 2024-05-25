import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function splitArrayIntoChunks<T>(array: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

export function kFormatter(num: number) {
  if (Math.abs(num) >= 1000000000) {
    return "$" + (Math.sign(num) * Math.abs(num) / 1000000).toFixed(1) + 'T';
  } else if (Math.abs(num) >= 1000000) {
    return "$" + (Math.sign(num) * Math.abs(num) / 1000000).toFixed(1) + 'B';
  } else if (Math.abs(num) >= 1000000) {
    return "$" + (Math.sign(num) * Math.abs(num) / 1000000).toFixed(1) + 'M';
  } else if (Math.abs(num) >= 1000) {
    return "$" + (Math.sign(num) * Math.abs(num) / 1000).toFixed(1) + 'K';
  } else {
    return "$" + (Math.sign(num) * Math.abs(num)).toFixed(2);
  }
}
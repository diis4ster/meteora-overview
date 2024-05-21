"use client"
import { PulseLoader } from "react-spinners";

export default function Loading() {
    return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div>
            <PulseLoader
            color="#686977"
            loading
            size={20}
            />
        </div>
        <div className="mt-4">Loading...</div>
      </div>
    );
}
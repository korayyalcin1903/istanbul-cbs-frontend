import type { ApiResponse } from "../types/ApiResponse";
import type { ResultParkVeYesilAlanByIlceId } from "../types/CevreTypes";
import axiosInstance from "./axiosInstance";

export async function fetchParkVeYesilAlanByIlceId(id:number): Promise<ResultParkVeYesilAlanByIlceId[]> {
    const response = await axiosInstance.get<ApiResponse<ResultParkVeYesilAlanByIlceId[]>>(
        "/Cevre/park_yesil_alan/" + id
    )

    if(response.data.success){
        return response.data.data;
    } else {
        throw new Error(response.data.error || response.data.message || "Hata")
    }
}

export async function fetchGetParkVeYesilAlanDetay(id:number): Promise<string> {
    const response = await axiosInstance.get<ApiResponse<string>>(
        "/Cevre/park_yesil_alan_detay/" + id
    )

    if(response.data.success){
        return response.data.data;
    } else {
        throw new Error(response.data.error || response.data.message || "Hata")
    }
}
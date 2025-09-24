import type { ApiResponse } from '../types/ApiResponse';
import type { ResultIlceById, ResultIlceler } from '../types/GenelIstanbulTypes';
import axiosInstance from './axiosInstance';


export async function fetchIlceler(): Promise<ResultIlceler[]> {
    const response = await axiosInstance.get<ApiResponse<ResultIlceler[]>>(
        "/Genel/ilceler"
    );
    if(response.data.success){
        return response.data.data;
    } else {
        throw new Error(response.data.error || response.data.message || "Hata")
    }
}

export async function fetchIlceById(id:number): Promise<ResultIlceById> {
    const response = await axiosInstance.get<ApiResponse<ResultIlceById>>(
        "/Genel/ilce/" + id
    )

    if(response.data.success){
        return response.data.data;
    } else {
        throw new Error(response.data.error || response.data.message || "Hata")
    }
}
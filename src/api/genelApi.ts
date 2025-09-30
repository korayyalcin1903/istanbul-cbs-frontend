import type { ApiResponse } from '../types/ApiResponse';
import type { ResultIlceler, ResultMahalleListByIlceId } from '../types/GenelIstanbulTypes';
import axiosInstance from './axiosInstance';

export async function fetchIlcelerGeom(): Promise<string> {
    const response = await axiosInstance.get<ApiResponse<string>>(
        "/Genel/ilceler-geom"
    );
    if(response.data.success){
        return response.data.data;
    } else {
        throw new Error(response.data.error || response.data.message || "Hata")
    }
}

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

export async function fetchIlceById(id:number): Promise<string> {
    const response = await axiosInstance.get<ApiResponse<string>>(
        "/Genel/ilce/" + id
    )

    if(response.data.success){
        return response.data.data;
    } else {
        throw new Error(response.data.error || response.data.message || "Hata")
    }
}

export async function fetchMahalleListByIlceId(id:number): Promise<ResultMahalleListByIlceId[]> {
    const response = await axiosInstance.get<ApiResponse<ResultMahalleListByIlceId[]>>(
        "/Genel/mahalleler/" + id
    )

    if(response.data.success){
        return response.data.data;
    } else {
        throw new Error(response.data.error || response.data.message || "Hata")
    }
}

export async function fetchMahalleByMahalleId(id:number): Promise<string> {
    const response = await axiosInstance.get<ApiResponse<string>>(
        "/Genel/mahalle/" + id
    )
    
    if(response.data.success){
        return response.data.data;
    } else {
        throw new Error(response.data.error || response.data.message || "Hata")
    }
}
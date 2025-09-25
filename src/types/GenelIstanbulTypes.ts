export interface ResultIlceler{
    id:number,
    ilceAdi: string
}

export interface ResultIlceById{
    id:number,
    ilceAdi: string,
    geometry: string
}

export interface ResultMahalleListByIlceId{
    id: number,
    mahalleAdi: string
}

export interface ResultMahalleByMahalleId{
    id: number,
    mahalleAdi: string,
    geometry: string
}
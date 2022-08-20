import {fetch,Body,ResponseType} from "@tauri-apps/api/http";


export async function pStreamExtractor(url){
    const request = await fetch(url,{
        method:"GET",
        responseType:ResponseType.type
    });
    const response = request.data;
    return response
}
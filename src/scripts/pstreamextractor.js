import {fetch,ResponseType} from "@tauri-apps/api/http";


export async function pStreamExtractor(url){
    const request = await fetch(url,{
        method:"GET",   
        headers:{
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
            "Accept-Language": "fr,fr-FR;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6"
        },

        responseType:ResponseType.Text
    });
    const response = request.data;
    const parser = new DOMParser();
    const doc = parser.parseFromString(response,"text/html");
    var scripts = doc.getElementsByTagName('script');
    for (const script of scripts) {
        if (script.src.includes('/u/player-script?v=')) {
            var content = await fetch(script.src,{
                method:"GET",   
                headers:{
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
                    "Accept-Language": "fr,fr-FR;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6"
                },
        
                responseType:ResponseType.Text
            });
        }
    }
    var encoded = content.data.split('jQuery(document).ready(')[1].split('.setCaptions(')[0].split('jwplayer("main-player")')[0].split('("')[1].split('")')[0];
    if (encoded) {
            var decoded = atob(encoded);
            decoded = decoded.substring(2);
            var json = JSON.parse(decoded);
            var link = json.mmmmmmmmmmmmmmmmmmmm;
    }
    return link;
}
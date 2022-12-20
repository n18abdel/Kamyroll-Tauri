import axios from "axios";
import axiosTauriApiAdapter from "axios-tauri-api-adapter";

const client = axios.create({
    adapter: axiosTauriApiAdapter,
});
const linkRegex = /'robotlink'\)\.innerHTML = '(.+?)'\+ \('(.+?)'\)/


export default async function streamtapeExtractor(url) {
    let response = await client.get(url,{
        responseType: "text"
    }).then((response) => {
        return response;
    }).catch((error) => {
        console.log(error);
    });

    let parser = new DOMParser();
    let doc = parser.parseFromString(response.data, "text/html");
    let bodyMatch = doc.body.innerHTML.match(linkRegex);
    let link = 'https:' + bodyMatch[1] + bodyMatch[2].substring(3);
    console.log(link);
    return link;
}
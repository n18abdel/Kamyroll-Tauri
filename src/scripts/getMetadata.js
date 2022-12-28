import { chan,channelPage } from "./channel_id.js";
import { fetch } from '@tauri-apps/api/http';
import axios from 'axios';
import axiosTauriApiAdapter from 'axios-tauri-api-adapter';
const client = axios.create({ adapter: axiosTauriApiAdapter });



const TOKEN = localStorage.getItem('token');
async function getMetadata(slug){
    channelPage();
    let url = `https://api.kamyroll.tech/content/v1/media?id=${slug}&channel_id=${chan}`;
    let options = {
      headers: {
        'User-Agent': `Kamyroll/${process.env.APP_VERSION.replaceAll('"','')}-${process.env.CHANNEL.replaceAll('"','')} Tauri-Rust`,
        'Authorization': `Bearer ${TOKEN}`,
      },
      method: "GET",
      timeout: 5000
    }
    
    let result = await client.get(url, options).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
    return result;
}
export default getMetadata;
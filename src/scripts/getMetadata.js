import { chan,channelPage } from "./channel_id.js";
import { fetch } from '@tauri-apps/api/http';

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
    }
    let response = await fetch(url, options);
    if (response.status != 200) {
        console.log(response);
        return;
    }
    let result = response.data;
    return result;
}
export default getMetadata;
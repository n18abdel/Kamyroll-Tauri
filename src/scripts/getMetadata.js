import {infoAnime}  from "./constructor.js";
import { chan,channelPage } from "./channel_id.js";
import { fetch } from '@tauri-apps/api/http';
import {token} from './token.js';
async function getMetadata(slug){
    channelPage();
    let url = `https://api.kamyroll.tech/content/v1/media?id=${slug}&channel_id=${chan}`;
    let options = {
      headers: {
        'User-Agent': 'Kamyroll/3.17.0 Android/7.1.2 okhttp/4.9.1',
        'Authorization': `Bearer ${token}`,
      },
      method: "GET",
    }
    let response = await fetch(url, options);
    if (response.status != 200) {
        console.log(response);
        return;
    }
    let result = response.data;
    let title = result.title;
    let image = "";
    try{
      try {
        image = result.images.poster_tall[2].source;
      } catch (error) {
        image = result.images.poster_tall.pop().source;
      }
    }catch(e){
      image = result.images.thumbnail.pop().source;
    }
    
    let description = result.description;
    let type = result.__class__;
    if(description==''){
      description = 'No description was given for this show'
    }
    let is_dubbed = result.is_dubbed;
    let is_subbed = result.is_subbed;
    let is_mature = result.is_mature;
    let is_simulcast = result.is_simulcast;
    let maturity_ratings = result.maturity_ratings;
    return new infoAnime(title, slug, image, description,type, is_dubbed, is_subbed, is_mature, is_simulcast,maturity_ratings);
}
export default getMetadata;
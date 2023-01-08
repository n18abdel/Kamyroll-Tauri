import axios from 'axios';
import axiosTauriApiAdapter from 'axios-tauri-api-adapter';
const client = axios.create({ adapter: axiosTauriApiAdapter });
import { fetch } from '@tauri-apps/api/http';

let addsix = new Date();
addsix.setHours( addsix.getHours() + 6);
addsix = Math.floor( addsix.getTime() / 1000);

async function testToken(token){
  const url = 'https://api.kamyroll.tech/content/v1/search';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if(response.data.code == 'bad_channel_id'){
    return true;
  }else{
    return false;
  }
}

function createRandomId (){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 16; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

async function getToken(){
    const url = 'https://api.kamyroll.tech/auth/v1/token';
    const APP_TOKEN = 'HMbQeThWmZq4t7w';
    let app_identifier = 'com.nabil.kamyroll';
    let device_id = localStorage.getItem('device_id');
    if (device_id == undefined) {
        device_id = createRandomId();
        localStorage.setItem('device_id', device_id);
    }
    let body = `?device_id=${device_id}&device_type=${app_identifier}&access_token=${APP_TOKEN}`;
    let response = await client.get(url+body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': `Kamyroll/${process.env.APP_VERSION.replaceAll('"','')}-${process.env.CHANNEL.replaceAll('"','')} Tauri-Rust`
      }
    });
    if(response.status == 200){
      console.log(response)
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('token_expire', response.data.expires_in);
      localStorage.setItem('token_valid', addsix);
      return true;
    }else{
      return response.data;
    }
}

async function generateNewToken(){
  localStorage.removeItem('token');
  localStorage.removeItem('token_expire');
  localStorage.removeItem('token_valid');
  let state = await getToken();
  return state;
}

export {getToken,testToken,generateNewToken};

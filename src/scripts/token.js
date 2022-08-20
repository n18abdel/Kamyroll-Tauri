import{fetch,Body} from "@tauri-apps/api/http";
import {reactive} from 'vue';

async function getToken() {
    const url = 'https://kamyroll.herokuapp.com/auth/v1/token';
    const headers = {
      'Authorization': 'Basic vrvluizpdr2eby+RjSKM17dOLacExxq1HAERdxQDO6+2pHvFHTKKnByPD7b6kZVe1dJXifb6SG5NWMz49ABgJA==',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    try {
      var body = Body.text(
        'refresh_token=IV%2BFtTI%2BSYR0d5CQy2KOc6Q06S6aEVPIjZdWA6mmO7nDWrMr04cGjSkk4o6urP%2F6yDmE4yzccSX%2FrP%2FOIgDgK4ildzNf2G%2FpPS9Ze1XbEyJAEUyN%2BoKT7Gs1PhVTFdz%2FvYXvxp%2FoZmLWQGoGgSQLwgoRqnJddWjqk0ageUbgT1FwLazdL3iYYKdNN98BqGFbs%2Fbaeqqa8aFre5SzF%2F4G62y201uLnsElgd07OAh1bnJOy8PTNHpGqEBxxbo1VENqtYilG9ZKY18nEz8vLPQBbin%2FIIEjKITjSa%2BLvSDQt%2F0AaxCkhClNDUX2uUZ8q7fKuSDisJtEyIFDXtuZGFhaaA%3D%3D&grant_type=refresh_token&scope=offline_access'
      )
      const response = await fetch(url, {
        method: "POST",
        body: body,
        headers: headers

      })
      let result = response.data;
      return result;
    } catch (e) {
      console.log(e);
    }
  }



export const token = await getToken()
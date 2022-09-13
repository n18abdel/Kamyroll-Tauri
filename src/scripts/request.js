// Language: javascript
// Path: src\scripts\request.js
import {fetch,Body} from "@tauri-apps/api/http";
async function ModuleRequest (url,method,body,headers,responsetype){
    if(responsetype==undefined){
        responsetype = 'json'
    }
    const response = await fetch(url, {
        method: method,
        body: Body.text(body),
        headers: headers,
        responseType: responsetype,
    })
    let result = response.data;
    return result;
}

export default ModuleRequest
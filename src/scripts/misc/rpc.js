import {invoke} from '@tauri-apps/api/tauri'
import {getChannelinUse,channel} from "../channel_id.js";

async function defaultRPC(page, doing) {
    await invoke('set_activity', {
        state : getChannelinUse(channel).short_label,
        page : page,
        channel : channel,
        doing : doing
    });
}

async function watchRPC_series(titleSeries,episode_number,season_number,endVideo) {
    await invoke('set_activity_watch_timestamp', {
        title: titleSeries,
        state: `Season ${season_number}, Episode ${episode_number}`,
        page: `${titleSeries} `,
        channel: channel,
        doing: getChannelinUse(channel).short_label,
        start: Date.now(),
        end: endVideo
    });
}

async function watchRPC_film(titleFilm,endVideo) {
    await invoke('set_activity_watch_timestamp', {
        title: titleFilm,
        state: getChannelinUse(channel).short_label,
        page: `${titleFilm} `,
        channel: channel,
        doing: getChannelinUse(channel).short_label,
        start: Date.now(),
        end: endVideo
    });
}

async function idleRPC() {
    await invoke('set_activity', {
        state : getChannelinUse(channel).short_label,
        page : "Doing nothing",
        channel : channel,
        doing : "Idle"
    });
}

async function watchEvent(title,message){
    await invoke('set_activity_watch_notimestamp', {
        title: title,
        state : message,
        page : title,
        channel : channel,
        doing : getChannelinUse(channel).short_label
    });
}

export {defaultRPC,watchRPC_series,watchRPC_film,idleRPC,watchEvent}
import Dexie from 'dexie';

export const db = new Dexie('Kamyroll');
db.version(1).stores({
  anime_saved: '++id, title, prov_id, channel, episodes_seen', // Primary key and indexed props
});

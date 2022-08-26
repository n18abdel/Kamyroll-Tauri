<script setup>
import { channelId } from '../scripts/channel_id';


</script>

<template>

    <select name="channel-id" id="channel-id" v-model="channelId.id" @change="changeId($event)">
        <option value="crunchyroll">crunchyroll</option>
        <option value="animedigitalnetwork" >ADN</option>
        <option value="neko-sama">neko-sama</option>
    </select>
        
</template>

<script>
export default {
    methods: {
        changeId(id) {
         if(id=="animedigitalnetwork"){
            channelId.adn()
         } else if (id=="crunchyroll"){
            channelId.crunchyroll()
         } else if (id=="neko-sama"){
            channelId.neko()
         }
    },
        crunchyroll() {
            console.log(channel)
            channelId.id = 'crunchyroll';
        },
        adn() {
            channelId.idchannelId.id = 'animedigitalnetwork';
        },
        neko() {
            this.channelId = 'neko-sama';
        }
    }
}
</script>
<style scoped>

   #channel-id {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 0;
        color: rgb(255, 255, 255);
        font-size: 1.5rem;
        font-weight: bold;
        padding: 0.5rem;
        outline: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }

</style>
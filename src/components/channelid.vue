<script setup>
    import {channel,channels,setChannel} from '../scripts/channel_id';
</script>
    
    <template>
        <select name="channel-id" id="channel-id" v-if="inRightPlace==true" v-model="channel" @change="setChannel($event.target.value)">
            <option v-for="prov of channels" :value="prov.name">{{prov.label}}</option>
        </select>
        <!--back button-->
        <!-- <button v-else @click="this.$router.go(-1)">Back</button> -->
        

            
    </template>
<script>
export default {
    data() {
        return {
            inRightPlace: false,
        }
    },
    beforeMount: async function () {
        if(window.location.href.includes('/search') || window.location.href.split('/').pop().length == 0){
            this.inRightPlace = true;
        }
    },

}
</script>
    
    <style scoped>
    
       #channel-id {
            border: none;
            border-radius: 0;
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
            padding: 0.5rem;
            background-color: #1b1a26;
            outline: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }
        #back-button {
            border: none;
            border-radius: 0;
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
            padding: 0.5rem;
            background-color: #1b1a26;
            outline: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }
    
    </style>
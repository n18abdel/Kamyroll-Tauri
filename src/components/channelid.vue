<script setup>
    import {chan,channels,setChannel} from '../scripts/channel_id';
</script>
    
    <template>
    
        <select name="channel-id" id="channel-id" v-model="chan" @change="setChannel($event.target.value)">
            <option v-for="prov of channels" :value="prov.name">{{prov.label}}</option>
        </select>
            
    </template>
    
    <style scoped>
    
       #channel-id {
            width: 100%;
            height: 100%;
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
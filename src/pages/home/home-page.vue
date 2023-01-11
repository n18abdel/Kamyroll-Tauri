<template>  
        <trending></trending>   
        <continue></continue>
        <LastEpisodes></LastEpisodes>
        
</template>

<script>
// load the component before the page is rendered
import { defineAsyncComponent } from 'vue';
import { defaultRPC } from '../../scripts/misc/rpc.js';
const Trending = defineAsyncComponent(() => import('../../components/tendance.vue'),{
    timeout : 1000,
});

// load lastepisodes only when trending is loaded
const LastEpisodes = defineAsyncComponent(() => import('../../components/lastepisodes.vue'), {
  delay: 3000,
  timeout: 3000,
  suspend: true
})

const Continue = defineAsyncComponent(() => import('../../components/continue.vue'), {
  delay: 3000,
  timeout: 3000,
  suspend: true
})

export default {
  components: {
    Trending,
    LastEpisodes,
    Continue
  },
  mounted : async function (){
     await defaultRPC('On Home Page','Looking at the home page')
  }
}


</script>
<style scoped>
*, ::before, ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;
    border-radius: 10px;
}
</style>
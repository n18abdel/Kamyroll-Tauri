<template>  
        <trending></trending>   
        <LastEpisodes></LastEpisodes>
</template>

<script>
// load the component before the page is rendered
import { defineAsyncComponent } from 'vue';
const Trending = defineAsyncComponent(() => import('../../components/tendance.vue'),{
    timeout : 1000,
});

// load lastepisodes only when trending is loaded
const LastEpisodes = defineAsyncComponent(() => import('../../components/lastepisodes.vue'), {
  delay: 3000,
  timeout: 3000,
  suspend: true
})


export default {
  components: {
    Trending,
    LastEpisodes
  }
}


</script>
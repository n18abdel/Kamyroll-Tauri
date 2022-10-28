<script setup>

// import Counter from '../../components/counter.vue';
// import ColorChecker from '../../components/color-checker.vue';
// import Requester from '../../components/requester.vue';
// import { moduleExpression } from '@babel/types';
// import Requester from '../../components/requester.vue';
import building from '../../components/building.vue';
import DarkModeToggle from '../../components/DarkModeToggle.vue';

</script>
<template>  
        <trending></trending>   
        <LastEpisodes></LastEpisodes>
</template>

<script>
// load the component before the page is rendered
import { defineAsyncComponent } from 'vue';
const Trending = defineAsyncComponent(() => import('../../components/tendance.vue'));

// load lastepisodes only when trending is loaded
const LastEpisodes = defineAsyncComponent(() => import('../../components/lastepisodes.vue'), {
  delay: 3000,
  timeout: 3000,
  suspend: true
})


</script>
<script setup>

// import Counter from '../../components/counter.vue';
// import ColorChecker from '../../components/color-checker.vue';
// import Requester from '../../components/requester.vue';
// import { moduleExpression } from '@babel/types';
// import Requester from '../../components/requester.vue';
import Trending from '../../components/tendance.vue';
import building from '../../components/building.vue';
import DarkModeToggle from '../../components/DarkModeToggle.vue';

</script>
<template>  
        <trending></trending>   
        <!-- <lastepisodes></lastepisodes> -->
</template>

<script>
        export default {
                components: {
                        Trending,
                        building,
                        DarkModeToggle
                },
                
        }
</script>

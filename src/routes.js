import {
  createRouter,
  createWebHistory
} from "vue-router";

import HomePage from './pages/home/home-page.vue';
import List from './pages/contact/list-page.vue';
import ADN from './pages/info/adn-page.vue';
import Crunchyroll from './pages/info/crunchyroll-page.vue';
import NekoSama from './pages/info/nekosama-page.vue';
import Error from './pages/error/error-page.vue';
import Watch from './pages/watch/watch-page.vue';
import Search from './pages/search/search-page.vue';



export default createRouter({
  history: createWebHistory(),
  routes: [{
      path: '/',
      component: HomePage
    },
    {
      path: '/liste',
      component: List
    },
    {
      path: '/crunchyroll/:id',
      component: Crunchyroll
    },
    {
      path: '/adn/:id',
      component: ADN
    },
    {
      path: '/neko-sama/:id',
      component: NekoSama
    },
    {
      path: '/crunchyroll/watch/:id',
      component: Watch
    },
    {
      path:'/adn/watch/:id',
      component: Watch
    },
    {
      path:'/nekosama/watch/:id',
      component: Watch
    },
    {
      path: '/search/',
      component: Search
    }

  ]
});
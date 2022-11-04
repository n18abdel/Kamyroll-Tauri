import {
  createRouter,
  createWebHistory
} from "vue-router";

import Home from './pages/home/home-page.vue';
import Kamyroll from './pages/info/kamyroll-page.vue';
import Error from './pages/error/error-page.vue';
import Watch from './pages/watch/watch-page.vue';
import Search from './pages/search/search-page.vue';



export default createRouter({
  history: createWebHistory(),
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/crunchyroll/:id',
      component: Kamyroll
    },
    {
      path: '/crunchyroll/:id/:title',
      component: Kamyroll
    },
    {
      path: '/adn/:id',
      component: Kamyroll
    },
    {
      path: '/nekosama/:id',
      component: Kamyroll
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
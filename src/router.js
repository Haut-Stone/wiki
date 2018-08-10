import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    { //首页
      path: '/home',
      name: 'home',
      component: Home
    },
    { //女武神
      path: '/valkyria',
      name: 'valkyria',
      component: () => import('./views/Valkyria/Valkyria.vue'),
      children: [  //这里就是二级路由的配置
        {
          path: 'overview',
          name: 'overview',
          component: () => import('./views/Valkyria/Overview.vue'),
        }
      ]
    },
    { //圣痕
      path: '/stigmata',
      name: 'stigmata',
      component: () => import('./views/Stigmata/Stigmata.vue')
    },
    { //武器
      path: '/weapon',
      name: 'weapon',
      component: () => import('./views/Weapon/Weapon.vue')
    }
  ]
});

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name:'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/onboarding',
    name:'onboarding',
    component: () => import('../views/Onboarding.vue')
  },
  {
    path: '/profile',
    name:'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/setting',
    name:'setting',
    component: () => import('../views/Setting.vue')
  },
  {
    path: '/interest-setting',
    name:'interestSetting',
    component: () => import('../views/InterestSetting.vue')
  },
  {
    path: '/photoeditor',
    name:'photoEditor',
    component: () => import('../views/PhotoEditor.vue')
  },
  {
    path: '/pair',
    name:'pair',
    component: () => import('../views/Pair.vue')
  },
  {
    path: '/achievement',
    name:'achievement',
    component: () => import('../views/Achievement.vue')
  },
  {
    path: '/chatlist',
    name:'chatList',
    component: () => import('../views/ChatList.vue')
  },
  {
    path: '/chatroom',
    name:'chatRoom',
    component: () => import('../views/ChatRoom.vue')
  },
]



const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log('to',to);
  if(to.name == 'index' && to.query.token) next();
  else if (to.name == 'testAdmin') next();
  else if (to.name !== 'login' && (window.$cookies.get("auth") == null || window.$cookies.get("auth") == 'null')) next({ name: 'login' })
  else next()
})
export default router

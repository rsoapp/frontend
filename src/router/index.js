import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/../public/mystyle.css'

import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Ad from '../views/Ad.vue'
import Profile from '../views/Profile.vue'
import CreateAd from '../views/CreateAd.vue'
import EditAd from '../views/EditAd.vue'

Vue.use(BootstrapVue)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ads/:id',
    name: 'Ad',
    component: Ad
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/createAd',
    name: 'CreateAd',
    component: CreateAd
  },
  {
    path: '/editAd/:id',
    name: 'EditAd',
    component: EditAd
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

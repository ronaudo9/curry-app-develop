import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'
import OrderHistory from '../views/OrderHistory.vue'
import ItemDetail from '../views/ItemDetail.vue'
import Login from '../views/Login.vue'
import OrderComp from '../views/OrderComp.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/orderhistory',
    name: 'OrderHistory',
    component: OrderHistory
  },
  {
    path: '/itemdetail/:item_id',
    name: 'ItemDetail',
    component: ItemDetail
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/ordercomp',
    name: 'OrderComp',
    component: OrderComp
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

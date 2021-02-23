import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
import signup from '../views/signup.vue'
import carrito from '../views/carrito.vue'
import administrationPanel from '../views/administrationPanel.vue'
import {correo} from '../App.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Log in',
    component: login
  },
  {
    path:'/signup',
    name:'Sign up',
    component:signup
  },
  {
    path:'/carrito',
    name:'Carrito',
    component: carrito
  },
  {
    path:'/administracion',
    name:'Administracion',
    component: administrationPanel,
    meta:{
      admin:true
    }
  }
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if(to.name=='Administracion'){
    if(correo=="jacoblomas@hotmail.com"){
      next()
    }
    else{
      next({name:'Log in'});
    }
  }else{
    next();
  }
  if(to.name==""){
    next({name:'Home'})
  }
})

export default router

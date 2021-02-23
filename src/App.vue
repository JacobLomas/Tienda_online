<template>
  <div id="app">
    <notifications position="top center"/>
    <nav id="nav" class="sticky-top navbar navbar-expand-md navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">
      <img src="https://firebasestorage.googleapis.com/v0/b/tienda-online-15565.appspot.com/o/favicon.png?alt=media&token=c612aa6d-49e5-404f-9890-adddf97c1ac5" width="30" height="30" class="d-inline-block align-top" alt="">
      + Que Bolsos
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item" v-if="authenticated && adminUser">
          <router-link to="/administracion" class="nav-link">Panel de Administración</router-link>
        </li>
        <li class="nav-item" v-if="!authenticated">
          <router-link to="/login" class="nav-link">Iniciar sesión</router-link>
        </li>
        <li class="nav-item" v-if="!authenticated">
          <router-link to="/signup" class="nav-link">Registrarse <i class="fas fa-sign-in-alt"></i></router-link>
        </li>
        <li class="nav-item" v-if="authenticated">
          <a class="nav-link" @click="logout">Cerrar Sesión <i class="fas fa-sign-out-alt"></i></a>
        </li>
        <li class="nav-item">
          <router-link to="/carrito" class="btn-outline-primary btn nav-link"><i class="mr-1 fas fa-shopping-cart"></i> 
            <span v-if="carritoLength!=0" class="d-inline-block bg-light text-primary pl-1 pr-1">
              {{carritoLength}} - ({{totalCarrito}})€
            </span>
          </router-link>
        </li>
      </ul>
    </div>
    </nav>

    <div class="router-view">
      <router-view/>
    </div>
    
    <pie/>
  
  </div>
</template>
<script>
import Firebase from './db'
import {db} from './db'
import pie from './components/pie'
var correo="";
export default {
  name:"App",
  components:{
    pie
  },
  data(){
    return{
      uid:"CSfBHsR8lDXFudzBokFshuianOj2",
      user: {
          loggedIn: false,
          data: {
            uid:"CSfBHsR8lDXFudzBokFshuianOj2"
          }
      },
      carrito:null
    }
  },
  methods:{
    logout(){
      Firebase.logout();
      this.$router.replace({path:'/'})
    }
  },
  computed:{
    authenticated(){
      return this.user.loggedIn
    },
    adminUser(){
      return this.user.data.uid=="CSfBHsR8lDXFudzBokFshuianOj2"
    },
    totalCarrito(){
      var total=0;
      this.carrito.forEach(prod => {
        total+=parseFloat(prod.precio)*parseFloat(prod.cantidad)
      });
      return total
    },
    carritoLength(){
      return this.carrito.length
    }
  },
  mounted(){
    Firebase.auth.onAuthStateChanged( user => {
        if (user) {
          this.user.loggedIn = true;
          this.user.data = user;
          correo=this.user.data.email;
          this.$router.replace({path:"/"});
          this.$notify({
            title: 'Inicio de sesión',
            type: 'success',
            text: 'Hola '+this.user.data.email+' bienvenido'
          });
          this.$bind('carrito', db.collection('carritos').where("idCliente", "==", this.user.data.uid))
        }
        else {
          this.user.loggedIn = false;
          this.user.data = {};
          this.$bind('carrito', db.collection('carritos').where("idCliente", "==",""))
        }
      })
  },
  firestore(){
    return {
      carrito: db.collection('carritos').where("idCliente", "==", this.user.data.uid),
    }
  }
}
export {correo}
</script>
<style lang="css">
@import './assets/css/main.css'
</style>

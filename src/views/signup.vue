<template>

  <section class="signup">
    <img class="signup-img" src="https://firebasestorage.googleapis.com/v0/b/tienda-online-15565.appspot.com/o/handbag-1478814_1920.jpg?alt=media&token=183a2f75-755d-4f87-bfbe-6147f6a0577b" alt="">
    <div class="signup-form pt-5">
      <h1 class="text-center">Registrarse</h1>
      <div class="form ml-auto mr-auto w-75 d-flex flex-column justify-content-center">
        <div class="form-group w-100">
          <label for="">Correo electrónico</label>
          <input type="email" class="form-control" placeholder="Correo electrónico" v-model="email">
        </div>
        <div class="form-group w-100">
          <label for="">Contraseña</label>
          <input type="password" class="form-control" placeholder="Contraseña" v-model="contraseña">
        </div>
        <div class="form-group w-100">
          <label for="">Escribe la contraseña de nuevo</label>
          <input type="password" class="form-control" placeholder="Repetir contraseña" v-model="repContraseña">
        </div>
        <input type="submit" value="Subscribirse" class="btn btn-primary" :disabled="todoCorrecto" @click="signUp">
      </div><hr class="w-75">
      <div class="signup-form-social">
        <h6 class="text-center">O bien</h6>
        <div class="signup-form-social-item" @click="loginGoogle"><i class="fab fa-google"></i></div>
        <div class="signup-form-social-item" @click="loginFacebook"><i class="fab fa-facebook"></i></div>
      </div>

    </div>
    
  </section>

</template>

<script lang="js">
  import Firebase from '../db'
  export default  {
    name: 'signup',
    props: [],
    mounted () {
      
    },
    data () {
      return {
        contraseña:"",
        repContraseña:"",
        email:""
      }
    },
    methods: {
      signUp(){
        Firebase.signUpEmail(this.email, this.contraseña);
      },
      loginGoogle(){
        Firebase.loginGoogle()
      },
      loginFacebook(){
        Firebase.loginFacebook();
      }
    },
    computed: {
      todoCorrecto(){
          return !(this.contraseña==this.repContraseña & this.contraseña.length>0 && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email));
      }
    }
}


</script>

<style scoped>
  .signup {

  }
</style>

<template lang="html">

  <section class="signup">
    <img class="signup-img" src="https://firebasestorage.googleapis.com/v0/b/tienda-online-15565.appspot.com/o/handbag-1478814_1920.jpg?alt=media&token=183a2f75-755d-4f87-bfbe-6147f6a0577b" alt="">
    <div class="signup-form p-5">
      <h1 class="text-center">Iniciar sesión</h1>
      <div class="form-group">
        <label for="">Correo electrónico</label>
        <input v-model="email" type="email" class="form-control" placeholder="Correo electrónico">
      </div>
      <div class="form-group">
        <label for="">Contraseña</label>
        <input v-model="pass" type="password" class="form-control" placeholder="Contraseña">
      </div>
      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" @click="recordarme=!recordarme" :checked="recordarme" class="custom-control-input" id="customCheck" name="example1">
        <label class="custom-control-label" for="customCheck">Recordar mi correo electrónico</label>
      </div>
      <button class="mt-3 btn btn-primary" @click="login">Iniciar sesión</button>
      <hr class="w-75">
      <div class="signup-form-social">
        <h6 class="text-center">O bien iniciar con:</h6>
        <div class="signup-form-social-item" @click="loginGoogle"><i class="fab fa-google"></i></div>
        <div class="signup-form-social-item" @click="loginFacebook"><i class="fab fa-facebook"></i></div>
      </div>
    </div>
    
  </section>
  
</template>

<script lang="js">
import Firebase from '../db'
  export default  {
    name: 'login',
    props: [],
    mounted () {
      if(this.getCookie("usuarioRecordado")){
        this.recordarme=true;
        this.email=this.getCookie("usuarioRecordado");
      }
    },
    data () {
      return {
        email:"",
        pass:"",
        recordarme:false
      }
    },
    methods: {
      
      login(){
        if(Firebase.loginEmailPass(this.email, this.pass)=="ERROR")
          this.$notify("CACA")
        if(this.recordarme)
          this.setCookie("usuarioRecordado", this.email, 7);
        else
          this.setCookie("usuarioRecordado", this.email, 0)
      },
      loginGoogle(){
        Firebase.loginGoogle();
      },
      loginFacebook(){
        Firebase.loginFacebook();
      },
      setCookie(name, value, days){
        let expires = "";
        if (days) {
          let date = new Date();
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
          expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
      },
      getCookie(name){
        let nameEQ = name + "=";
        let ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === " ") c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      }
    },
      
    computed: {
      
    }
}


</script>

<style scoped>
  .login {

  }
</style>

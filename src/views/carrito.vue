<template>

  <section class="carrito">
    <div class="card-horizontal mt-1 pb-2" v-for="(prod,index) in carrito" :key="index">
      <div class="card-horizontal">
        <img class="card-img-top" :src="prod.imagen" alt="Card image cap">
        <div class="card-body">
          <h4 class="card-title">
            {{prod.nombreProd}}
          </h4>
          <div class="card-text form-group">
            <label>Cantidad</label>
            <input type="number" min="1" :max="prod.stock" 
            v-model="prod.cantidad" 
            @change="actualizarCantidad(prod)" 
            class="form-control w-25" >
          </div>
          <button class="btn btn-outline-danger" @click="eliminarCarrito(prod)">Quitar de la cesta</button>
        </div>
      </div>
    </div>

    <div class="w-75 mt-5">
      <router-link to="/" class="btn btn-secondary mr-5">Seguir comprando</router-link>
      <button class="btn btn-primary ml-5">Finalizar pedido <span class="bg-light pl-1 pr-1">{{totalCarrito}}€</span></button>
    </div>

  </section>

</template>

<script>
import {db} from '../db'
import Firebase from '../db'
  export default  {
    name: 'carrito',
    mounted () {
      Firebase.auth.onAuthStateChanged((user)=>{
        if(user){
          this.userUID=user.uid
          this.$bind('carrito', db.collection('carritos').where('idCliente','==',this.userUID))
        }
        else{
          this.userUID="";
          this.$bind('carrito', db.collection('carritos').where('idCliente','==',this.userUID))
        }
          
      });
    },
    data () {
      return {
        userUID:"",
        carrito:"",
      }
    },
    methods:{
      eliminarCarrito(prod){
        db.collection('carritos').doc(prod.id).delete()
        .then(()=>{
          this.$notify("Producto eliminado del carrito")
        }).catch(()=>{
          this.$notify({
            type:'error',
            text:'No se ha podido eliminar el producto del carritoo'
          })
        })
      },
      actualizarCantidad(prod){
        db.collection('carritos').doc(prod.id).update(prod)
      }
    },
    computed: {
      totalCarrito(){
      var total=0;
      this.carrito.forEach(prod => {
        total+=parseFloat(prod.precio)*parseFloat(prod.cantidad)
      });
      return total
    },
    },
    firestore(){
      return {
        carrito: db.collection('carritos').where('idCliente','==',this.userUID),
      }
    }
}


</script>

<style scoped>
.carrito{
  padding-left:5vw ;
}
</style>

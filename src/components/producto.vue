<template>
  <div class="producto mr-3 mt-3" :class="{'card-horizontal': cardHorizontal, card:!cardHorizontal}" v-if="indice>2 || admin">
    <img class="card-img-top" :src="productoJSON.imagen" :alt="productoJSON.nombre">
    <div class="card-body">
      <h2 class="card-title">{{productoJSON.nombre}}</h2>
      <p :class="{'text-danger': productoJSON.stock<5, 'text-warning': productoJSON.stock<8, 'text-success': productoJSON.stock>=8}">Hay {{productoJSON.stock}} artículos en stock</p>
      <p class="card-text">{{productoJSON.descripcion}}</p>
    </div>
    <div class="card-bottom p-4">
      <h4 class="d-inline-block card-precio w-50">{{productoJSON.precio}}€</h4>
      <button v-if="!admin"
        class=" w-50 btn btn-primary"
        :disabled="!loggedIn || productoJSON.stock<=0"
        @click="anadirCarrito(productoJSON)" >
        <i class="fas fa-cart-plus"></i> Añadir al carrito
      </button>
      <!-- Editar producto -->
      <button v-if="admin"
        data-toggle="modal" :data-target="'#'+productoJSON.id"
        class=" w-50 btn btn-primary"
        @click="editar(productoJSON)" >
        Editar
      </button>
    </div>

<!-- Modal para editar el producto -->
    <div v-if="admin" class="modal fade" :id="productoJSON.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" :id="productoJSON.id">{{this.prodEditar.nombre}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form">
                <div class="form-group">
                  <label>Nombre</label>
                  <input type="text" class="form-control" v-model="prodEditar.nombre" :placeholder="productoJSON.nombre">
                </div>
                <div class="form-group">
                  <label>Descripción</label>
                  <textarea type="text" class="form-control" v-model="prodEditar.descripcion" :placeholder="productoJSON.descripcion"></textarea>
                </div>
                <div class="d-flex justify-content-between p-4">
                  <div class="form-group">
                    <label>Stock</label>
                    <input type="number" min="0" class="form-control" v-model="prodEditar.stock">
                  </div>
                  <div class="form-group">
                    <label>Precio</label>
                    <input type="text" pattern="^[+-]?[0-9]{1,9}(?:.[0-9]{1,2})?$" class="form-control" v-model="prodEditar.precio">
                  </div>
                </div>
                <div class="d-flex justify-content-around flex-wrap p-2">
                  <label class="w-100 text-center">Imagen</label>
                  <img class="m-3 w-50" :src="prodEditar.imagen" :alt="prodEditar.nombre+' foto'">
                  <div class="w-75">
                    <div class="custom-file">
                      <input type="file" class="custom-file-input" id="customFile" @change="previewImg">
                      <label class="custom-file-label" for="customFile">{{label}}</label>
                    </div>
                    <div v-if="imageData!=null" class="d-flex flex-row flex-wrap">
                      <img class="mr-auto w-100" :src="img1">
                      <button class=" btn btn-outline-danger mt-3" @click="quitarFoto">Eliminar &times;</button>
                    </div>
                  </div>
                </div>
                <div v-if="admin && uploading" class="progress-bar progress-bar-striped progress-bar-animated"
                  :style="'width:'+uploadValue+'%'">
                  Subiendo...
                </div> 
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger mr-auto" data-toggle="modal" data-target="#confirmacion">Eliminar Producto</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" @click="manejadorUpdateBD">Guardar</button>
            </div>
          </div>
        </div>
      </div>
    

      <!-- Modal de confirmación de eliminación -->
      <div class="modal fade" id="confirmacion" data-backdrop="static" style="z-index:7732" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Confirmación</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h2>¿Estás seguro de eliminar el producto permanentemente?</h2>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>
              <button type="button" class="btn btn-outline-danger" @click="eliminarBD">Sí</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Firebase from '../db'
import {storage, db} from '../db'
import $ from 'jquery'
export default {
  name: 'producto',
  data () {
    return {
      loggedIn:false,
      userUID:"",
      prodEditar:{ },
      uploadValue:0,
      uploading:false,
      imageData:null,
      img1:null,
      label:"Elige una foto"
    }
  },
  methods:{
    manejadorUpdateBD(){
      if(this.imageData!=null)
        this.subirFoto();
      else
        this.actualizarBD()
        
    },
    actualizarBD(){
      db.collection('productos').doc(this.productoJSON.id).update(this.prodEditar)
        .then(()=>{
          this.$notify({
            title:'Actualización',
            type:'info',
            text:'Producto actualizado'
          });
        }).catch((error)=>{
          console.log(error)
        })
    },
    eliminarBD(){
      db.collection('productos').doc(this.productoJSON.id).delete()
      .then(()=>{
        this.$notify("Producto eliminado")
      }).catch(()=>{
        this.$notify({
          type:'error',
          text:'No se ha podido eliminar el productos'
        })
      })
    },
    quitarFoto(){
      this.prodEditar.imagen=this.productoJSON.imagen;
      this.img1=null;
      this.imageData=null;
      this.label="Elige una foto"
    },
    subirFoto(){
      const storageRef= storage.ref(this.imageData.name).put(this.imageData);
  
      storageRef.on('state-changed', snapshot =>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        this.uploading=true;
      },error =>{
          console.log(error.message);
          this.uploading=false;
          this.$notify({
            title:'Error',
            type:'error',
            text:'No se ha podido subir la fotografía'
          })
        },
      ()=>{
        this.uploading=false;
        this.uploadValue=0;
        this.label="Elige una foto"
        $('#'+this.productoJSON.id).modal('hide');
        
        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
          this.prodEditar.imagen=url;
          this.actualizarBD();
          this.image1= null;
          this.imageData = null;
          this.$notify({
            title:'Fotografía subida',
            type:'succes',
            text:'El archivo se ha subido correctamente'
          })
        });
      })
    },
    previewImg(event){
      var fileName = event.target.value.split("\\").pop();
      this.label=fileName;

      this.uploadValue=0;
      this.imageData = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (e) =>{
        this.img1 = e.target.result
      };
      reader.readAsDataURL(this.imageData)
    },
    editar(p){
      $('#'+p.id).modal()
      this.prodEditar=Object.assign({},p)
    },
    anadirCarrito(prod){
      var doc={
        cantidad:1,
        idProd:prod.id,
        idCliente:this.userUID,
        nombreProd:prod.nombre,
        imagen:prod.imagen,
        precio:prod.precio,
        stock:prod.stock
      }
      db.collection('carritos').add(doc)
    }
  },
  mounted(){
    Firebase.auth.onAuthStateChanged((user)=>{
      if(user){
        this.loggedIn=true
        this.userUID=user.uid
      }
      else
        this.loggedIn=false
    })
  },
  props:['productoJSON', 'admin', 'indice', 'cardHorizontal']
}
</script>

<style scoped lang="scss">

</style>

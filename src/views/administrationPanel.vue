<template>
  <div class="administration-panel">
    <div class="deck mt-3 mr-3">
      <div class="w-100 position-sticky sticky-top">
        <button class="btn btn-primary mt-2" data-toggle="modal" data-target="#modalAnadir"><i class="far fa-plus-square"></i> Nuevo</button>
      </div><br>
      <producto v-for="(prod, index) in productos" :key="index" :productoJSON="prod" :admin="true"></producto>
    </div>


    <div class="modal fade" id="modalAnadir" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialogue" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" >Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form">
                  <div class="form-group">
                    <label>Nombre</label>
                    <input type="text" class="form-control" v-model="productoAnadir.nombre" :placeholder="productoAnadir.nombre">
                  </div>
                  <div class="form-group">
                    <label>Descripción</label>
                    <textarea type="text" class="form-control" v-model="productoAnadir.descripcion" :placeholder="productoAnadir.descripcion"></textarea>
                  </div>
                  <div class="d-flex justify-content-between p-4">
                    <div class="form-group">
                      <label>Stock</label>
                      <input type="number" min="0" class="form-control" v-model="productoAnadir.stock">
                    </div>
                    <div class="form-group">
                      <label>Precio</label>
                      <input type="text" pattern="^[+-]?[0-9]{1,9}(?:.[0-9]{1,2})?$" class="form-control" v-model="productoAnadir.precio">
                    </div>
                  </div>
                  <div class="d-flex justify-content-around flex-wrap p-2">
                    <label class="w-100 text-center">Imagen</label>
                    <img class="m-3 w-50" :src="productoAnadir.imagen">
                    <div class="w-75">
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" id="customFile" @change="previewImg">
                        <label class="custom-file-label" for="customFile">{{label}}</label>
                      </div>
                      <div v-if="imageData!=null" class="d-flex m-3 flex-row flex-wrap">
                        <img class="mr-auto w-100" :src="img1">
                        <button class=" btn btn-outline-danger mt-3" @click="quitarFoto">Eliminar &times;</button>
                      </div>
                    </div>
                  </div>
                  <div v-if="uploading" class="progress-bar progress-bar-striped progress-bar-animated"
                    :style="'width:'+uploadValue+'%'">
                    Subiendo...
                  </div> 
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" @click="manejadorUpdateBD" data-dismiss="modal"><i class="far fa-plus-square"></i> Añadir</button>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import { storage, db }  from '../db'
import firebase from 'firebase/app'

import producto from '../components/producto'
export default {
  name: 'administrationPanel',
  components: {
    producto
  },
  data () {
    return {
      productos: [],
      uploadValue:0,
      uploading:false,
      imageData:null,
      img1:null,
      label:"Elige una foto",
      productoAnadir:{
        nombre:"Nombre",
        descripcion:"Descripción",
        fechaCreacion:"",
        imagen:"",
        precio:13.2,
        stock:1
      }
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
      this.productoAnadir.fechaCreacion=firebase.firestore.FieldValue.serverTimestamp()
      db.collection('productos').add(this.productoAnadir)
        .then(()=>{
          this.$notify({
            title:'Base de datos',
            type:'info',
            text:'Producto subido'
          });
        }).catch((error)=>{
          console.log(error)
        })
    },
    quitarFoto(){
      this.productoAnadir.imagen="";
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
        this.label="Elige una foto";        
        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
          this.productoAnadir.imagen=url;
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
  },
  firestore: {
    productos: db.collection('productos'),
  },
}
</script>

<style scoped></style>

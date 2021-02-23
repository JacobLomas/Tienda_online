<template>
  <div class="home">
    <transition name="fade">
      <div v-if="productos.length==0" class="cssload-thecube">
        <div class="cssload-cube cssload-c1"></div>
        <div class="cssload-cube cssload-c2"></div>
        <div class="cssload-cube cssload-c4"></div>
        <div class="cssload-cube cssload-c3"></div>
      </div>
    </transition>
	<!--Carousel Wrapper-->
	<h1 class="mt-5 text-center">¡Novedades!</h1>
<div id="multi-item-example" class="mt-4 carousel slide carousel-multi-item" data-ride="carousel">

  <!--Controls-->
  <div class="controls-top">
    <a class="carousel-control-prev bg-secondary" href="#multi-item-example" data-slide="prev">
		<i class="fas fa-chevron-left"></i>
	</a>
    <a class="carousel-control-next bg-secondary" href="#multi-item-example" data-slide="next"><i
        class="fas fa-chevron-right"></i></a>
  </div>
  <!--/.Controls-->

  <!--Indicators-->
  <ol class="carousel-indicators">
    <li data-target="#multi-item-example" data-slide-to="0" class="active"></li>
    <li data-target="#multi-item-example" data-slide-to="1"></li>
	<li data-target="#multi-item-example" data-slide-to="2"></li>
  </ol>
  <!--/.Indicators-->

  <!--Slides-->
  <div class="carousel-inner" role="listbox">

    <!--First slide-->
    <div v-for="(prod, index) in productosNov" :key="index" :class="{active:index==0}" class="carousel-item">
		<div class="slide w-100 p-5 d-flex flex-row flex-wrap">
			<div class="slide-img">
				<img class="w-100" :src=prod.imagen alt="">
			</div>
			<div class="slide-body">
				<h1 class="slide-body-titulo">{{prod.nombre}}</h1>
				<p class="slide-body-descripcion">{{prod.descripcion}}</p>
				<h4 class="slide-bottom-precio">{{prod.precio}}€  <small class="ml-3"> {{prod.stock}} unidades</small></h4>
				<button class="btn btn-primary">
					<i class="fas fa-cart-plus"></i>
					Comprar
				</button>
			</div>
		</div>

    </div>
    <!--/.First slide-->
   

  </div>
  <!--/.Slides-->

</div>
<!--/.Carousel Wrapper-->
    <div class="deck mt-3 mr-3">
      <div class="w-100 d-flex justify-content-end">
        <button class="btn" 
		:class="{'btn-dark':vistaLista, 'btn-outline-dark':!vistaLista}"
		@click="vistaLista=true">
			<i class="fas fa-list"></i> Lista
		</button>
        <button class="ml-2 mr-3 btn"
		:class="{'btn-dark':!vistaLista, 'btn-outline-dark':vistaLista}"
		@click="vistaLista=false">
			<i class="fas fa-th"></i> Cuadrícula
		</button>
      </div><br>
      <producto v-for="(prod, index) in productos" :key="index" :cardHorizontal="vistaLista" :indice="index" :productoJSON="prod"></producto>
    </div>
  </div>

  
</template>

<script>
import { db }  from '../db'
import producto from '../components/producto'
export default {
  name: 'Home',
  components: {
    producto
  },
   data() {
    return {
      productos: [],vistaLista:false
    }
  },
  computed:{
    productosNov(){
		return this.productos.slice(0,3)
	}
  },
  firestore: {
    productos: db.collection('productos').orderBy("fechaCreacion","desc"),
  },
}
</script>
<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .6s;
}
.cssload-thecube {
	width: 73px;
	height: 73px;
  z-index: 1000;
  left: 50vw;
  top: 30vh;
	position: absolute;
	transform: rotateZ(45deg);
		-o-transform: rotateZ(45deg);
		-ms-transform: rotateZ(45deg);
		-webkit-transform: rotateZ(45deg);
		-moz-transform: rotateZ(45deg);
}
.cssload-thecube .cssload-cube {
	position: relative;
	transform: rotateZ(45deg);
		-o-transform: rotateZ(45deg);
		-ms-transform: rotateZ(45deg);
		-webkit-transform: rotateZ(45deg);
		-moz-transform: rotateZ(45deg);
}
.cssload-thecube .cssload-cube {
	float: left;
	width: 50%;
	height: 50%;
	position: relative;
	transform: scale(1.1);
		-o-transform: scale(1.1);
		-ms-transform: scale(1.1);
		-webkit-transform: scale(1.1);
		-moz-transform: scale(1.1);
}
.cssload-thecube .cssload-cube:before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(221,161,255,0.98);
	animation: cssload-fold-thecube 2.76s infinite linear both;
		-o-animation: cssload-fold-thecube 2.76s infinite linear both;
		-ms-animation: cssload-fold-thecube 2.76s infinite linear both;
		-webkit-animation: cssload-fold-thecube 2.76s infinite linear both;
		-moz-animation: cssload-fold-thecube 2.76s infinite linear both;
	transform-origin: 100% 100%;
		-o-transform-origin: 100% 100%;
		-ms-transform-origin: 100% 100%;
		-webkit-transform-origin: 100% 100%;
		-moz-transform-origin: 100% 100%;
}
.cssload-thecube .cssload-c2 {
	transform: scale(1.1) rotateZ(90deg);
		-o-transform: scale(1.1) rotateZ(90deg);
		-ms-transform: scale(1.1) rotateZ(90deg);
		-webkit-transform: scale(1.1) rotateZ(90deg);
		-moz-transform: scale(1.1) rotateZ(90deg);
}
.cssload-thecube .cssload-c3 {
	transform: scale(1.1) rotateZ(180deg);
		-o-transform: scale(1.1) rotateZ(180deg);
		-ms-transform: scale(1.1) rotateZ(180deg);
		-webkit-transform: scale(1.1) rotateZ(180deg);
		-moz-transform: scale(1.1) rotateZ(180deg);
}
.cssload-thecube .cssload-c4 {
	transform: scale(1.1) rotateZ(270deg);
		-o-transform: scale(1.1) rotateZ(270deg);
		-ms-transform: scale(1.1) rotateZ(270deg);
		-webkit-transform: scale(1.1) rotateZ(270deg);
		-moz-transform: scale(1.1) rotateZ(270deg);
}
.cssload-thecube .cssload-c2:before {
	animation-delay: 0.35s;
		-o-animation-delay: 0.35s;
		-ms-animation-delay: 0.35s;
		-webkit-animation-delay: 0.35s;
		-moz-animation-delay: 0.35s;
}
.cssload-thecube .cssload-c3:before {
	animation-delay: 0.69s;
		-o-animation-delay: 0.69s;
		-ms-animation-delay: 0.69s;
		-webkit-animation-delay: 0.69s;
		-moz-animation-delay: 0.69s;
}
.cssload-thecube .cssload-c4:before {
	animation-delay: 1.04s;
		-o-animation-delay: 1.04s;
		-ms-animation-delay: 1.04s;
		-webkit-animation-delay: 1.04s;
		-moz-animation-delay: 1.04s;
}



@keyframes cssload-fold-thecube {
	0%, 10% {
		transform: perspective(136px) rotateX(-180deg);
		opacity: 0;
	}
	25%,
				75% {
		transform: perspective(136px) rotateX(0deg);
		opacity: 1;
	}
	90%,
				100% {
		transform: perspective(136px) rotateY(180deg);
		opacity: 0;
	}
}

@-o-keyframes cssload-fold-thecube {
	0%, 10% {
		-o-transform: perspective(136px) rotateX(-180deg);
		opacity: 0;
	}
	25%,
				75% {
		-o-transform: perspective(136px) rotateX(0deg);
		opacity: 1;
	}
	90%,
				100% {
		-o-transform: perspective(136px) rotateY(180deg);
		opacity: 0;
	}
}

@-ms-keyframes cssload-fold-thecube {
	0%, 10% {
		-ms-transform: perspective(136px) rotateX(-180deg);
		opacity: 0;
	}
	25%,
				75% {
		-ms-transform: perspective(136px) rotateX(0deg);
		opacity: 1;
	}
	90%,
				100% {
		-ms-transform: perspective(136px) rotateY(180deg);
		opacity: 0;
	}
}

@-webkit-keyframes cssload-fold-thecube {
	0%, 10% {
		-webkit-transform: perspective(136px) rotateX(-180deg);
		opacity: 0;
	}
	25%,
				75% {
		-webkit-transform: perspective(136px) rotateX(0deg);
		opacity: 1;
	}
	90%,
				100% {
		-webkit-transform: perspective(136px) rotateY(180deg);
		opacity: 0;
	}
}

@-moz-keyframes cssload-fold-thecube {
	0%, 10% {
		-moz-transform: perspective(136px) rotateX(-180deg);
		opacity: 0;
	}
	25%,
				75% {
		-moz-transform: perspective(136px) rotateX(0deg);
		opacity: 1;
	}
	90%,
				100% {
		-moz-transform: perspective(136px) rotateY(180deg);
		opacity: 0;
	}
}
</style>

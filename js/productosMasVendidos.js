import { listaProductos } from './obtenerProductos.js';

const contenedorProductosMasVendidos = document.getElementById('mostrar-productos-baratos');

// Recoge los productos más vendidos
const productosMasVendidos = listaProductos.sort((v1 , v2) => {return v2.ventas - v1.ventas; });

let arrayProductosMostrar = [];
for (let i = 0; i < 3; i ++) {
    arrayProductosMostrar.push(productosMasVendidos[i]);
} 

const mostrarProductosBaratos = arrayProductosMostrar.map(pro => `
        <div id="producto-individual" data-cardproducto="" class="col-4 m-2">
            <a href="verProducto.html?id=${pro.id}" class="card text-center">
            <img src="${pro.imagen}" class="card-img-top" alt="...">
            
            <div class="card-body">
                <h5 class="card-title">${pro.nombreProducto}</h5>
                <p class="card-text">${pro.descripcion}</p>
                <p class="card-price fs-3">${pro.precio} €</p>
            </div>
        </a>
        </div>`).join('');

        contenedorProductosMasVendidos.innerHTML = `<div id="lista-card-productos" class="d-flex justify-content-around">`
        + mostrarProductosBaratos + `</div>`;



/*const listaComprasLS = localStorage.getItem("compras");
const arrayListaCompraSL = JSON.parse(listaComprasLS);

let productosMasVendidos = new Map();

// Pone el numero de repeticiones de cada compra de un producto
for (let i = 0; i < arrayListaCompraSL.length; i ++) {
    for (let u = 0; u < arrayListaCompraSL[i].listaProductos.length ; u ++) {
        console.log(arrayListaCompraSL[i].listaProductos[u]);
        if (productosMasVendidos.get(arrayListaCompraSL[i].listaProductos[u].nombreProducto) === 1) {
            let repeticionProducto = productosMasVendidos.get(arrayListaCompraSL[i].listaProductos[u].nombreProducto);
            productosMasVendidos.set(arrayListaCompraSL[i].listaProductos[u].nombreProducto , repeticionProducto + 1);
        } else {
            productosMasVendidos.set(arrayListaCompraSL[i].listaProductos[u].nombreProducto , 1);
        }
    }
}

// Ordena el mapa para obtener los productos más vendidos
const productosMasVendidosOrdenados = new Map( [...productosMasVendidos].sort((x, y) => x[1] + y[1]));



let productosMasVendidosArray = [];

// Añade los productos más vendidos en un array
for (let [key , value] of productosMasVendidosOrdenados) {
    for (let o = 0; o < listaProductos.length; o ++) {
        if (listaProductos[o].nombreProducto === key) {
            productosMasVendidosArray.push(listaProductos[o]);
        }
    }
}


// La página solo mostrara los 3 productos más vendidos
const contenedorCarrouselProductosBaratos = document.getElementById('mostrar-productos-baratos');
const tituloCarrouselProductos = document.getElementById('titulo-productos-vendidos');

if (productosMasVendidosArray.length === 0) {
    contenedorCarrouselProductosBaratos.innerHTML = '';
    tituloCarrouselProductos.innerHTML = '';
} else {
    // Deja solo los tres primeros del array
    if (productosMasVendidosArray.length > 3) {
        for (let p = 3; p < productosMasVendidosArray.length; p ++) {
            productosMasVendidosArray.pop();
        } 
    }
    const mostrarProductosBaratos = productosMasVendidosArray.map(pro => `
        <div data-cardproducto="" class="col-4 m-4">
            <a href="verProducto.html?id=${pro.id}" class="card text-center">
            <img src="${pro.imagen}" class="card-img-top" alt="...">
            
            <div class="card-body">
                <h5 class="card-title">${pro.nombreProducto}</h5>
                <p class="card-text">${pro.descripcion}</p>
                <p class="card-price fs-3">${pro.precio} €</p>
            </div>
        </a>
        </div>`).join('');

    contenedorCarrouselProductosBaratos.innerHTML = `<div class="d-flex justify-content-around">`
        + mostrarProductosBaratos + `</div>`;
}*/


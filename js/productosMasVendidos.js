import { listaProductos } from './obtenerProductos.js';

const contenedorProductosMasVendidos = document.getElementById('mostrar-productos-baratos');

// Recoge los productos más vendidos
const productosMasVendidos = listaProductos.sort((v1 , v2) => {return v2.ventas - v1.ventas; });

// Recoge los tres productos más vendidos en un nuevo array
let arrayProductosMostrar = [];
for (let i = 0; i < 3; i ++) {
    arrayProductosMostrar.push(productosMasVendidos[i]);
} 
// Muestra los productos más vendidos en la página principal
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





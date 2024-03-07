import { listaProductos } from './obtenerProductos.js';
import { maxProductosPorPagina } from './paginacion.js';



// Obtener el valor del enlace
const valorEnlace = location.href.split('?')[1];

// Filtro de busqueda
let filtroBusqueda = "";

// Poner el titulo en la página
document.getElementById("titulo-producto").innerHTML = "Productos de " + valorEnlace;



const filtraProductosPorPagina = (pagina=1)=>{
    const listaCardProductos = document.getElementById('listado-productos');

    if ( !listaCardProductos ) return;  
  
    //console.log(listaCardProductos.querySelectorAll('[data-cardproducto]'));

    const filasSinFiltradoTexto =  Array
                                  .from(listaCardProductos.querySelectorAll('[data-cardproducto]'))
                                  .filter(f=>!f.classList.contains('filtradoTexto'));

  
    const nFilas = filasSinFiltradoTexto.length;
    const paginas = Math.ceil(nFilas/maxProductosPorPagina);
  
    const primerProductoAMostrar = (pagina-1) * maxProductosPorPagina;
    const ultimoProductoAMostrar = pagina * maxProductosPorPagina - 1;
    
    for (let i=0;i< filasSinFiltradoTexto.length; i++){
        if (i>=primerProductoAMostrar && i<=ultimoProductoAMostrar) {
            filasSinFiltradoTexto[i].classList.remove('d-none');
        }
        else {
          filasSinFiltradoTexto[i].classList.add('d-none');
        }
    }
    /*for (let i=0;i< filasSinFiltradoTexto.length; i++){
        
        console.log(filasSinFiltradoTexto[i]);
        
    }*/

    obtenPaginacion(pagina,paginas);
    
};

function mostrarProductos(listadoProductos) {
    const contenedorListado = document.getElementById('listado-productos');

    // Si no hay ningún producto se muestra el aviso de error
    // La condición es sobre todo para la función de busqueda
    if (listadoProductos.length === 0) {
        contenedorListado.innerHTML = `
        <div class="alert alert-danger w-100" role="alert">
            No hay productos para mostrar
        </div>`;
        return;
    }
    
    // Filtra por el nombre de producto
    const productosFiltrados = filtrarCategoria(listadoProductos);
    console.log("productos filtrados")
    console.log(productosFiltrados);
    // Obtener el elemento html para la paginación
    const paginas = Math.ceil(productosFiltrados.length/maxProductosPorPagina);
    console.log("paginas" + paginas);
    const paginacionHTML = obtenPaginacion(1,paginas);
    console.log("paginacion obtener")
    console.log(paginacionHTML);
    
    const productoIndividual = productosFiltrados.map(pro => 
        `<div data-cardproducto="" class="col-4">
                <a href="verProducto.html?id=${pro.id}" class="card text-center">
                    <img src="${pro.imagen}" class="card-img-top" alt="...">
                    
                    <div class="card-body">
                        <h5 class="card-title">${pro.nombreProducto}</h5>
                        <p class="card-text">${pro.descripcion}</p>
                        <p class="card-price fs-3">${pro.precio} €</p>
                    </div>
                </a>
        </div>`).join('');

        if (productoIndividual === '') {
            contenedorListado.innerHTML = `
            <div class="alert alert-danger w-100" role="alert">
                No hay productos para mostrar
            </div>`;
            return;
        }
        

    contenedorListado.innerHTML = productoIndividual + paginacionHTML;


    contenedorListado.addEventListener('click', e =>{
        if (e.target.tagName !== 'A') return;
        if (!e.target.closest('#navPaginacion')) return;
        if (!e.target.parentElement.dataset.pagina) return;
        console.log(e.target.parentElement.dataset.pagina);
        filtraProductosPorPagina(+e.target.parentElement.dataset.pagina);
      });

      filtraProductosPorPagina (1);

      
};

function obtenPaginacion(pagina, paginas){
    const navPaginacion = document.getElementById('navPaginacion');
  
    let lis = '';
        for (let i=1; i<=paginas;i++){
        if (i===1 || i===paginas || i===pagina ||
            i=== Math.floor(pagina/2) || i=== Math.floor((pagina+paginas)/2)) {
            lis += `<li data-pagina="${i}" class="page-item ${i===pagina?'active':''}">
                        <a class="page-link" href="#" >${i}</a>
                    </li>`; 
        }
    }
    const outerHTML =  `
        <nav id="navPaginacion" aria-label="Page navigation">
            <ul class="pagination justify-content-end ">
            <li data-pagina="${pagina-1}" class="page-item ${pagina===1?'disabled':''}">
                <a class="page-link">&lt;</a>
            </li>
            ${lis}
            <li data-pagina="${pagina+1}" class="page-item ${pagina===paginas?'disabled':''}">
                <a class="page-link" href="#">&gt;</a>
            </li>
            </ul>
        </nav>`;
    
    
    if (navPaginacion){
      navPaginacion.outerHTML = outerHTML;
      // en la línea anterior navPaginacion sale del DOM
    } else {
      return outerHTML;
    }
    return outerHTML;    
}



mostrarProductos(listaProductos);

function ordenarPrecioMenorMayor(listadoProductos) {
    
    const productosFiltrados = filtrarCategoria(listadoProductos);
    
    const productosMenorMayor = productosFiltrados.sort((v1 , v2) => {
        return v1.precio - v2.precio;
    });

    mostrarProductos(productosMenorMayor);
}

function ordenarPrecioMayorMenor(listadoProductos) {
    
    const productosFiltrados = filtrarCategoria(listadoProductos);
    
    const productosMayorMenor = productosFiltrados.sort((v1 , v2) => {
        return v2.precio - v1.precio;
    });

    mostrarProductos(productosMayorMenor);
}

function ordenarPorNombre(listadoProductos) {

    const productosFiltrados = filtrarCategoria(listadoProductos);
    
    const productosOrdenadosPorNombre = productosFiltrados.sort((v1 , v2) => {
        return v1.nombreProducto.localeCompare(v2.nombreProducto);
    });
    
    mostrarProductos(productosOrdenadosPorNombre);
}

function ordenarPorMasVendidos(listadoProductos) {
    const listaComprasLS = localStorage.getItem("compras");
    const arrayListaCompraSL = JSON.parse(listaComprasLS);

    let productosMasVendidos = new Map();

    // Pone el numero de repeticiones de cada compra de un producto
    for (let i = 0; i < arrayListaCompraSL.length; i ++) {
        for (let u = 0; u < arrayListaCompraSL[i].listaProductos.length ; u ++) {
            
            if (productosMasVendidos.get(arrayListaCompraSL[i].listaProductos[u].nombreProducto) === 1) {
                let repeticionProducto = productosMasVendidos.get(arrayListaCompraSL[i].listaProductos[u].nombreProducto);
                productosMasVendidos.set(arrayListaCompraSL[i].listaProductos[u].nombreProducto , repeticionProducto + 1);
            } else {
                productosMasVendidos.set(arrayListaCompraSL[i].listaProductos[u].nombreProducto , 1);
            }
        }
    }

    // Ordena el mapa para obtener los productos más vendidos por el número de ventas
    const productosMasVendidosOrdenados = new Map( [...productosMasVendidos].sort((x, y) => x[1] + y[1]));

    let productosMasVendidosArray = [];

    // Añade los productos más vendidos en un array
    for (let [key , value] of productosMasVendidosOrdenados) {
        for (let o = 0; o < listadoProductos.length; o ++) {
            if (listadoProductos[o].nombreProducto === key) {
                productosMasVendidosArray.push(listadoProductos[o]);
            }
        }
    }
    
    mostrarProductos(productosMasVendidosArray);
}


function filtrarCategoria (listadoProductos) {
    const productosFiltrados = listadoProductos.filter(pro => pro.nombreCategoria === valorEnlace);
    return productosFiltrados;
}

function filtrarProductosPorBusqueda (texto , listadoProductos , filtroBusqueda) {
    const textoMinuscula = texto.toLowerCase();
    let productosBusqueda;
    // Filtra por la categoria
    const productosFiltrados = filtrarCategoria(listadoProductos);

    if (filtroBusqueda === 'nombre') {
        productosBusqueda = productosFiltrados.filter(producto => producto.nombreProducto.toLowerCase().includes(textoMinuscula));
    } else if (filtroBusqueda === 'descripcion') {
        productosBusqueda = productosFiltrados.filter(producto => producto.descripcion.toLowerCase().includes(textoMinuscula));
    } else  {
        productosBusqueda = productosFiltrados.filter(producto => producto.nombreProducto.toLowerCase().includes(textoMinuscula));
    }
    
    mostrarProductos(productosBusqueda);

}

// Se prohibe que los dos filtros se seleccionen a la vez
document.getElementById('filtrosBusqueda').addEventListener('click' , e => {
    if (e.target.tagName !== 'INPUT') return;

    const seleccionBusqueda = e.target.dataset.busqueda;
    
    if (seleccionBusqueda === 'nombre') {
        document.getElementById('busqueda-descripcion').checked = false;
    }
    if (seleccionBusqueda === 'descripcion') {
        document.getElementById('busqueda-nombre').checked = false;
    }

    filtroBusqueda = seleccionBusqueda;
    
    
});

document.getElementById('input-buscador').addEventListener('input' , (evento) => {
    
    filtrarProductosPorBusqueda(evento.target.value , listaProductos , filtroBusqueda);
});


document.getElementById('ordenarPrecio').addEventListener('input' , (evento) => {

    if (evento.target.dataset.precio === 'menor-mayor') {

        ordenarPrecioMenorMayor(listaProductos);

    } else if (evento.target.dataset.precio === 'mayor-menor') {

        ordenarPrecioMayorMenor(listaProductos);
        
    } else if (evento.target.dataset.orden === 'nombre') {

        ordenarPorNombre(listaProductos);

    } else if (evento.target.dataset.orden === 'masvendidos') {

        ordenarPorMasVendidos(listaProductos);

    }
});









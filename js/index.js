import {categoria} from './obtenerCategorias.js';

// Muestra las categorias en la barra principal de navegación
function mostrarCategorias (categoria) {
    const barra = document.getElementById('bar-nav1');
    const categoriaPrincipal = categoria.map(categoria => {
        const elementoA = document.createElement('a');
        elementoA.setAttribute("href" , 'listadoProductos.html?' + categoria.nombreCategoria);
        elementoA.id = 'bar-elem';
        elementoA.className = "bar-elem icono-flecha py-2 mx-3";
        elementoA.innerHTML = categoria.nombreCategoria;
        barra.append(elementoA);
    });
}

mostrarCategorias(categoria);


    

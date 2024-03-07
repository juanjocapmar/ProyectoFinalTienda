import {categoria} from './obtenerCategorias.js';


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

/*function listarSubcategorias(subCategoria) {
    const ul = document.createElement('ul');
    const subCategorias = subCategoria.map(elem => {
        const a = document.createElement('a');
        const li = document.createElement('li');
        ul.className = "dropdown-menu";
        a.setAttribute("href" , "contenido.html");
        li.append(a);
        a.innerHTML = elem;
        ul.append(li);        
    });
    return ul;
}*/
    

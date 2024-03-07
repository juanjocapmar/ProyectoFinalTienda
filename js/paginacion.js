const maxProductosPorPagina = 3;

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
  
    console.log('obtenPaginacion: pagina ' + pagina + ', paginas ' + paginas)
    console.log("hola")
    console.log(navPaginacion);
    if (navPaginacion){
      navPaginacion.outerHTML = outerHTML;
      // en la línea anterior navPaginacion sale del DOM
    } else {
      return outerHTML;
    }    
}

const filtraProductosPorPagina = (pagina=1)=>{
    const listaCardProductos = document.getElementById('listado-productos');

    if ( !listaCardProductos ) return;  
  
    console.log(listaCardProductos);

    /*const filasSinFiltradoTexto =  Array
                                  .from(tabla.tBodies[0].rows)
                                  .filter(f=>!f.classList.contains('filtradoTexto'));
  
    const nFilas = filasSinFiltradoTexto.length;
    const paginas = Math.ceil(nFilas/maxProductosPorPagina);
  
    const primerProductoAMostrar = (pagina-1) * maxProductosPorPagina;
    const ultimoProductoAMostrar = pagina * maxProductosPorPagina - 1;
    
    for (let i=0;i< filasSinFiltradoTexto.length; i++){
        if (i>=primerProductoAMostrar && i<=ultimoProductoAMostrar) {
            filasSinFiltradoTexto[i].classList.remove('ocultoPaginacion');
        }
        else {
          filasSinFiltradoTexto[i].classList.add('ocultoPaginacion');
        }
    }
    obtenPaginacion(pagina,paginas)*/
};

export{obtenPaginacion , maxProductosPorPagina  };
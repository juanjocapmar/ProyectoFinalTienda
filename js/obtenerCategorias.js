const res = await fetch('../js/json/categorias.json');
const datos = await res.json();
const categoria = datos.categorias;
export {categoria};



/*fetch('../js/json/categorias.json')
    .then(res => res.json())
    .then(categoria => mostrarCategorias(categoria.categorias))*/
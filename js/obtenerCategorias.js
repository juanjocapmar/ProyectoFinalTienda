const res = await fetch('http://localhost:3000/categorias');
const datos = await res.json();
const categoria = datos;
export {categoria};



/*fetch('../js/json/categorias.json')
    .then(res => res.json())
    .then(categoria => mostrarCategorias(categoria.categorias))*/
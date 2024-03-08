const res = await fetch('http://localhost:3000/productos');
const datos = await res.json();
const listaProductos = datos;

export { listaProductos };


/* fetch('../js/json/productos.json')
    .then(res => res.json())
    .then(res => listaProductos(res.productos))
 */
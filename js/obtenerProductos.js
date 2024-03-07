const res = await fetch('../js/json/productos.json');
const datos = await res.json();
const listaProductos = datos.productos;
console.log(listaProductos);
export { listaProductos };


/* fetch('../js/json/productos.json')
    .then(res => res.json())
    .then(res => listaProductos(res.productos))
 */
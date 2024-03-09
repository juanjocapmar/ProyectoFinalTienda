// Obtiene los productos desde un archivo json
const res = await fetch('http://localhost:3000/productos');
const datos = await res.json();
const listaProductos = datos;

export { listaProductos };


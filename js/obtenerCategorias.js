const res = await fetch('http://localhost:3000/categorias');
const datos = await res.json();
const categoria = datos;
export {categoria};




const res = await fetch('http://localhost:3000/comentarios');
const datos = await res.json();
const comentarios = datos;
export {comentarios};
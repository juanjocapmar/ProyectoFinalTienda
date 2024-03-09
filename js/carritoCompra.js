// Coge los productos de la cesta del localStorage
let arrayProductosCesta = localStorage.getItem('cesta');
arrayProductosCesta = JSON.parse(arrayProductosCesta);

// Modifica el numero del icono del carrito
document.getElementById('icono-cantidad-productos').innerHTML = arrayProductosCesta.length; 

// Muestra los productos en el carrito
const mostrarProductosCarrito = (listaProductos) => {


    const contenedorCestaProductos = document.getElementById('lista-productos');
    
    const listaProductosCesta = listaProductos.map(pro => 
     `<div class="d-flex">
            <img src="${pro.imagenProducto}">
            <p id="nombre">${pro.nombreProducto}</p>
        </div>
        <p id="precio"> ${pro.numeroProductoComprar} x ${pro.precioProducto} €</p>
        <div id="separador"></div>
        <p id="total">Total: ${pro.precioTotal} €</p>`
   ).join('');
    
    contenedorCestaProductos.innerHTML = listaProductosCesta;

}

mostrarProductosCarrito(arrayProductosCesta);
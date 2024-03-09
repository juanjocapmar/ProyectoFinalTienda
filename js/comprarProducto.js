import { listaProductos } from "./obtenerProductos.js";


// Muestra el producto en la página
const productoComprar = (listaProductos) => {
    const contenedorProducto = document.getElementById('producto-comprar');
    // Obtiene el id del producto mediante el enlace
    const idEnlace = +location.href.split('=')[1];
    
    const productoId = listaProductos.filter(pro =>{
        return +pro.id === idEnlace;
    });
    
    
    const mostrarProductoIndividual = productoId.map(pro =>
        `<div>
            <img id="imagen-producto" class="imagen-producto-comprar" src="${pro.imagen}">
        </div>
        <div  class="w-25 producto-comprar-individual">
            <div class="d-flex flex-column">
                <h1 id="nombre-producto">${pro.nombreProducto}</h1>
                <p id="precio-producto">${pro.precio} €</p>
            </div>
            <div class="d-flex justify-content-between">
                <div id="stock-producto" class="w-25 stock">
                    EN STOCK
                    <span>${pro.stock} Und</span>
                </div>
                <div class="w-75 d-flex justify-content-end">
                    <div class="button-product d-flex">
                        <span>UNIDADES</span>
                        <button id="disminuir-puntuacion">-</button>
                        <div id="cantidad-productos">1</div>
                        <button id="aumentar-puntuacion">+</button>
                    </div>
                    <div class="boton-favoritos">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
                    </div>
                </div>
            </div>
            <button id="comprar-producto-boton" class="btn btn-primary my-4">Añadir a la cesta</button>
            <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  Descripcion
                </button>
              </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">${pro.descripcion}</div>
              </div>
            </div>
        </div>`).join('');

        contenedorProducto.innerHTML = mostrarProductoIndividual;

        // Si el producto no tiene stock cambia el mensaje por Sin Stock
        productoId.map(pro => {
            if (pro.stock === 0) {
                document.getElementById('stock-producto').innerHTML = "SIN STOCK";
            }
        });
};

productoComprar(listaProductos);

// Aumenta la cantidad de un productos a comprar
function aumentar () {
    const contenedor = document.getElementById('cantidad-productos');
    const cantidadProductosComprar = +document.getElementById('cantidad-productos').textContent;
    contenedor.innerHTML = cantidadProductosComprar + 1;
}
// Reduce en uno la cantidad de un productos a comprar
function disminuir () {
    const contenedor = document.getElementById('cantidad-productos');
    const cantidadProductosComprar = +document.getElementById('cantidad-productos').textContent;
    if (cantidadProductosComprar <= 1) {
        contenedor.innerHTML = 1;
    } else {
        contenedor.innerHTML = cantidadProductosComprar - 1;
    }
}
// Evento botón aumentar
document.getElementById('aumentar-puntuacion').addEventListener('click' , () => {
    aumentar();
});
// Evento botón reducir
document.getElementById('disminuir-puntuacion').addEventListener('click' , () => {
    disminuir();
});

// Añade un nuevo objeto al localStorage referente al producto a comprar
document.getElementById('comprar-producto-boton').addEventListener('click' , () => {
    const cantidadProductosComprar = +document.getElementById('cantidad-productos').textContent;
    let precioProducto = document.getElementById('precio-producto').textContent;
    const nombreProducto = document.getElementById('nombre-producto').textContent;
    const imagenProducto = document.getElementById('imagen-producto').getAttribute('src');
    
    precioProducto = +precioProducto.slice(0,precioProducto.length - 2);

    let arrayProductosUsuario = [];
    let precioTotalProducto = Math.round(precioProducto * cantidadProductosComprar);
    let precioTotal = precioTotalProducto.toFixed(2);
    precioTotal = +precioTotal;

    const producto = {
        nombreProducto: nombreProducto,
        precioProducto: precioProducto,
        numeroProductoComprar: cantidadProductosComprar,
        imagenProducto: imagenProducto,
        precioTotal:precioTotal  
    }
    
    // Si el producto no existe guarda el objeto en el localstorage
    if (localStorage.getItem('cesta') === null) {

        arrayProductosUsuario[0] = producto;

        localStorage.setItem('cesta' , JSON.stringify(arrayProductosUsuario));

    } else {
        
        anadirProductoCesta(producto);

    }

});

function anadirProductoCesta (producto) {
        let salir = false;
        let arrayProductosAnadir = localStorage.getItem('cesta');

        arrayProductosAnadir = JSON.parse(arrayProductosAnadir);

        arrayProductosAnadir.map(pro => {
            if (pro.nombreProducto === producto.nombreProducto) {
                pro.numeroProductoComprar += producto.numeroProductoComprar;
                // Actualiza el precio del producto al incrementar su cantidad
                pro.precioTotal = Math.round(pro.numeroProductoComprar) * Math.round(pro.precioProducto);
                salir = true;
            } 
        });
        

        if (salir === true) {

            localStorage.setItem('cesta' , JSON.stringify(arrayProductosAnadir));

            return;

        } else {

            arrayProductosAnadir.push(producto);

            localStorage.setItem('cesta' , JSON.stringify(arrayProductosAnadir));

        }

        return ;

}












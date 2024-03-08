
// Obtiene el cliente a comprar
const comprador = localStorage.getItem("cliente-comprar");
const compradorArray = JSON.parse(comprador);
// Obtener los productos de la cesta
const listaProductos = localStorage.getItem("cesta");
const listaProductosArray = JSON.parse(listaProductos);

const metodoPago = localStorage.getItem("metodo-pago");
const formaEnvio = localStorage.getItem("entrega-domicilio");

const contenedorMenuDireccion = document.getElementById('datos-direccion');

// Muestra los datos de dirección
const listaDatosDireccion = compradorArray.map( dir => 
    `<span><strong>Nombre:</strong> ${dir.nombreCliente}</span>
    <span><strong>Apellido:</strong> ${dir.apellidoCliente}</span>
    <span><strong>Dirección:</strong> ${dir.nombreDireccion}</span>
    <span><strong>Pais:</strong> ${dir.pais}</span>
    <span><strong>Telefono:</strong> ${dir.telefonoCliente}</span>`
);

contenedorMenuDireccion.innerHTML = listaDatosDireccion;

// Muestra el método de envio
const contenedorMenuPago = document.getElementById('metodo-pago');

contenedorMenuPago.innerHTML = `<span><strong>${metodoPago}</strong></span>`;

const contenedorMenuFormaEnvio = document.getElementById('entrega');
const contenedorGastosEnvio = document.getElementById('precio-envio');


// Suma total del precio al realizar el pago
let sumaPrecioTotal = (listaProductosArray.length > 1) ? listaProductosArray.reduce((acumulador , valorProducto) => acumulador + valorProducto.precioTotal , 0) : listaProductosArray[0].precioTotal;
// Precio total más IVA
let gastosIVA = sumaPrecioTotal * 0.21;
// Precio total más gastos de envio
let gastosEnvio = sumaPrecioTotal * 0.04;
        
let sumaPrecioTotalEnvio = Math.round((sumaPrecioTotal + gastosEnvio) + gastosIVA).toFixed(2);

// Si no es con entrega a domicilio se quitan los gastos de envío
if (formaEnvio === 'false') {
    sumaPrecioTotalEnvio = Math.round(sumaPrecioTotalEnvio - gastosEnvio);
}


// Muestra la tabla al finalizar la compra
const tablaFinalizarCompra = document.getElementById('lista-productos-finalizar');

const mostrarListaProductos = listaProductosArray.map(pro => `
    <tr>
        <td><img src="${pro.imagenProducto}" width=120px height=80px></td>
        <td>${pro.nombreProducto}</td>
        <td>${pro.numeroProductoComprar}</td>
        <td>${Math.round(pro.precioProducto)}</td>
        <td>${pro.precioTotal}</td>
    </tr>`).join('');

const mostrarPrecio = `
    <tr>
        <th colspan="3">Suma total</th>
        <td>${sumaPrecioTotal}</td> 
    </tr>
    <tr>
        <th colspan="3">Gastos de IVA (21%)</th>
        <td>${Math.round(gastosIVA)}</td> 
    </tr>
    <tr id="gastos-envio">
        <th colspan="3">Gastos de envio 4%</th>
        <td>${Math.round(gastosEnvio)}</td> 
    </tr>
    <tr>
        <th colspan="3">Precio total</th>
        <td>${Math.round(sumaPrecioTotalEnvio)}</td> 
    </tr>`;
    
contenedorGastosEnvio.innerHTML = `<span>${gastosEnvio}</span>`;
tablaFinalizarCompra.innerHTML = mostrarListaProductos + mostrarPrecio;

if (formaEnvio === 'true') {
    contenedorMenuFormaEnvio.innerHTML = `<span><strong>Entrega a domicilio</strong></span>
                                        <span><strong>Compañia predeterminada</strong></span>`;
} else {
    contenedorMenuFormaEnvio.innerHTML = `<span><strong>Recogida en tienda</strong></span>`;
    contenedorGastosEnvio.innerHTML = '<span><strong>0 €</strong></span>';
}

if (formaEnvio === 'false') {
    document.getElementById('gastos-envio').setAttribute('hidden' , '');
}

/*document.getElementById('boton-finalizar-compra').addEventListener('click' , e => {
    let listaCompra = [];

    if (localStorage.getItem("compras") === null || JSON.parse(localStorage.getItem("compras")).length === 0) {
        // Crea un objeto de cada usuario y sus productos
        let compra = {
            nombreCliente:compradorArray[0].nombreCliente,
            listaProductos:arrayProductosCesta
        }

        // Lo añade al array
        listaCompra.push(compra);
        // Lo añade al localStorage
        localStorage.setItem("compras" , JSON.stringify(listaCompra));
    } else {
        const listaComprasLS = localStorage.getItem("compras");
        const arrayListaCompraSL = JSON.parse(listaComprasLS);

        // Crea un objeto de cada usuario y sus productos
        let compra = {
            nombreCliente:compradorArray[0].nombreCliente,
            listaProductos:arrayProductosCesta
        }

        // Lo añade al array
        arrayListaCompraSL.push(compra);
        // Lo añade al localStorage
        localStorage.setItem("compras" , JSON.stringify(arrayListaCompraSL));
    }
});*/

document.getElementById('boton-finalizar-compra').addEventListener('click' , e => { 




});




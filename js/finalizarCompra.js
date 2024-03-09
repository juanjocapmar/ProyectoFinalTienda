
// Obtiene el cliente a comprar
const comprador = localStorage.getItem("cliente-comprar");
const compradorArray = JSON.parse(comprador);
// Obtener los productos de la cesta
const listaProductos = localStorage.getItem("cesta");
const listaProductosArray = JSON.parse(listaProductos);
// Obtiene el método de pago seleccionado y si la entrega es a domicilio
const metodoPago = localStorage.getItem("metodo-pago");
const formaEnvio = localStorage.getItem("entrega-domicilio");
// Obtiene el valor del descuento
const descuentoValor = localStorage.getItem("descuento");


const contenedorMenuDireccion = document.getElementById('datos-direccion');

// Muestra los datos de dirección
const listaDatosDireccion = compradorArray.map( dir => 
    `<span><strong>Nombre:</strong> ${dir.nombreCliente}</span>
    <span><strong>Apellido:</strong> ${dir.apellidoCliente}</span>
    <span><strong>Dirección:</strong> ${dir.nombreDireccion}</span>
    <span><strong>País:</strong> ${dir.pais}</span>
    <span><strong>Teléfono:</strong> ${dir.telefonoCliente}</span>`
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
// Precio con gastos de envio
let sumaPrecioTotalEnvio = Math.round((sumaPrecioTotal + gastosEnvio) + gastosIVA).toFixed(2);
// Precio con descuento aplicado
let descuento = Math.round(sumaPrecioTotalEnvio * 0.04);

// Si no es con entrega a domicilio se quitan los gastos de envío
if (formaEnvio === 'false') {
    sumaPrecioTotalEnvio = Math.round(sumaPrecioTotalEnvio - gastosEnvio);
}
// Si se ha seleccionado el descuento se resta del precio original
if (descuentoValor === 'true') {
    sumaPrecioTotalEnvio = Math.round(sumaPrecioTotalEnvio - descuento);
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
    <tr id="descuento">
        <th colspan="3">Descuento del 4%</th>
        <td>${Math.round("-" + descuento)}</td> 
    </tr>
    <tr>
        <th colspan="3">Precio total</th>
        <td>${Math.round(sumaPrecioTotalEnvio)}</td> 
    </tr>`;
    
contenedorGastosEnvio.innerHTML = `<span>${gastosEnvio}</span>`;
tablaFinalizarCompra.innerHTML = mostrarListaProductos + mostrarPrecio;

// Oculta o muestra si la entrega es a domicilio o no
if (formaEnvio === 'true') {
    contenedorMenuFormaEnvio.innerHTML = `<span><strong>Entrega a domicilio</strong></span>
                                        <span><strong>Compañia predeterminada</strong></span>`;
} else {
    contenedorMenuFormaEnvio.innerHTML = `<span><strong>Recogida en tienda</strong></span>`;
    contenedorGastosEnvio.innerHTML = '<span><strong>0 €</strong></span>';
}
// Oculta los gastos de envio de la tabla
if (formaEnvio === 'false') {
    document.getElementById('gastos-envio').setAttribute('hidden' , '');
}
// Oculta los descuentos de la tabla
if (descuentoValor === 'false') {
    document.getElementById('descuento').setAttribute('hidden' , '');
}







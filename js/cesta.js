const contenedorTablaCesta = document.getElementById('tabla-productos-cesta');
let listaProductosCesta = localStorage.getItem('cesta');
let listaProductosCestaArray = JSON.parse(listaProductosCesta);


// Guarda en el localstorage si la entrega es a domicilios
if (!document.getElementById('entrega-domicilio').checked) {
    localStorage.setItem("entrega-domicilio" , true);
}

document.getElementById('entrega-domicilio').addEventListener('click' , evento => {
    if (evento.target.tagName !== 'INPUT') return;
    
    if (evento.target.checked) {
        localStorage.setItem("entrega-domicilio" , evento.target.checked);
    } else {
        localStorage.setItem("entrega-domicilio" , evento.target.checked);
    }
});

console.log("array");
console.log(listaProductosCestaArray);
// Si solo hay un producto no es necesario realizar la suma
// Precio total de todos los productos de la cesta
if (listaProductosCestaArray === null) {
    
    mostrarAvisoError();

} else {
    const sumaPrecioTotal = (listaProductosCestaArray.length > 1) ? listaProductosCestaArray.reduce((acumulador , valorProducto) => acumulador + valorProducto.precioTotal , 0) : listaProductosCestaArray[0].precioTotal;
    // Precio total más IVA
    const gastosIVA = sumaPrecioTotal * 0.21;
        
    const sumaPrecioTotalEnvio = Math.round((sumaPrecioTotal + gastosIVA).toFixed(2));

    mostrarProductosCesta( sumaPrecioTotal ,  sumaPrecioTotalEnvio , gastosIVA );
}



function mostrarProductosCesta( sumaPrecioTotal ,  sumaPrecioTotalEnvio , gastosIVA ) {

    let mostrarTablaProductosCestas = listaProductosCestaArray.map(pro => `
        <tr>
            <th scope="row">${pro.nombreProducto}</th>
            <td>${pro.numeroProductoComprar}</td>
            <td>${Math.round(pro.precioProducto)}</td>
            <td>${Math.round(pro.precioProducto)}</td>
            <td><button class="btn btn-primary" data-nombreproducto="${pro.nombreProducto}">Eliminar</button></td>
        </tr>`).join('');
        console.log(mostrarTablaProductosCestas);
        mostrarTablaProductosCestas += `
                <tr>
                    <td colspan="3">Suma total (€)</td>
                    <td>${sumaPrecioTotal}</td>
                </tr>
                <tr>
                    <td colspan="3">IVA 21%</td>
                    <td>${Math.round(gastosIVA)}</td>
                </tr>
                <tr>
                    <td colspan="3">Precio total</td>
                    <td>${sumaPrecioTotalEnvio}</td>
                </tr>`;

    contenedorTablaCesta.innerHTML = mostrarTablaProductosCestas;
}

function mostrarAvisoError () {
    contenedorTablaCesta.innerHTML = `
    <tr>
        <td colspan="5">
            <div class="alert alert-danger" role="alert">
                No hay ningún producto
            </div>
        </td>
    </tr>
    `;
}


// Elimina un producto del localStorage
document.getElementById('tabla-productos-cesta').addEventListener('click' ,  (evento) => {
    
    if (evento.target.tagName !== 'BUTTON') return;
    
    const nombreProdutoEliminar = evento.target.dataset.nombreproducto;
    
    const listaNueva = listaProductosCesta.filter(p => p.nombreProducto !== nombreProdutoEliminar);
    
    localStorage.setItem('cesta' , JSON.stringify(listaNueva));
    
});




function validacion() {
    
    let formvalido = true;

    let contenedorMensajeError = document.getElementById('mensaje-error');
    let avisoError = "";

    let direccion = document.getElementById('direccion').value;

    if( direccion == null || direccion.length == 0 || /^\s+$/.test(direccion)) {
        alert('error direcc');
        avisoError = "Has introducido algo de manera incorrecta";
        contenedorMensajeError.innerHTML = devolverError(avisoError); 
        formvalido = false;
    }

    let nombreDireccion = document.getElementById('nombre-direccion').value;

    if (nombreDireccion == null || nombreDireccion.length == 0 || /^\s+$/.test(nombreDireccion)) {
        alert('error nom dir');
        formvalido = false;
    }

    let numeroDireccion = document.getElementById('numero-direccion').value;

    if (isNaN(numeroDireccion)) {
        alert('error numer direc');
        formvalido = false;
    }

    let nombre = document.getElementById('nombre-usuario').value;

    if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)) {
        alert('error nombre');
        formvalido = false;
    }

    let apellido = document.getElementById('apellido-usuario').value;

    if (apellido == null || apellido.length == 0 || /^\s+$/.test(apellido)) {
        alert('error apellido');
        formvalido = false;
    }

    let telefono = document.getElementById('telefono-usuario').value;
   

    if (isNaN(telefono) || telefono.length === 0) {
        alert('error telefono');
        formvalido = false;
    }

    let email = document.getElementById('email-usuario').value;
    
    if( !(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email)) ) {
        alert('error email');
        formvalido = false;
    }

    let pais = document.getElementsByName('pais');
    
    if( pais[0].value == null || pais[0].value == 0 ) {
        alert('error pais');
        formvalido = false;
    }

    let ciudad = document.getElementById('ciudad-direccion').value;
    alert(ciudad)
    if (ciudad == null || ciudad.length == 0 || /^\s+$/.test(ciudad)) {
        alert('error ciudad direc');
        formvalido = false;
    }

    let codigoPostal = document.getElementById('codigo-postal-direccion').value;

    if(isNaN(codigoPostal)) {
        alert('error cod postal');
        formvalido = false;
    }

    if (formvalido === true) {
        avisoError = "Enviado correctamente";
        contenedorMensajeError.innerHTML = devolverError(avisoError);
        anadirCliente(nombreDireccion , direccion , nombre , apellido , telefono , email , codigoPostal , pais[0].value);
    }

    return formvalido;


}

document.getElementById('form-component').addEventListener('submit' , (e) => {
    e.preventDefault();
});

function devolverError(avisoError) {
    const elementoError = `
    <div class="alert alert-primary" role="alert">
        ${avisoError}
    </div>`;
    return elementoError;
}

function anadirCliente(nombreDireccion , direccion , nombre , apellido , telefono , email , codigoPostal , valorPais) {
    let cliente  = {
        nombreDireccion:nombreDireccion,
        direccion:direccion,
        nombreCliente:nombre,
        apellidoCliente:apellido,
        telefonoCliente:telefono,
        emailCliente:email,
        codigoPostal:codigoPostal,
        pais:valorPais
    } 
    
    if (localStorage.getItem('clientes') === null) {

        let arrayCliente = [];

        arrayCliente[0] = cliente;

        localStorage.setItem('clientes' , JSON.stringify(arrayCliente));

    } else {

        let clientes = localStorage.getItem('clientes');

        let listaClientes = JSON.parse(clientes);

        listaClientes.push(cliente);

        localStorage.setItem('clientes' , JSON.stringify(listaClientes));

    }
}

// Muestra el listado de clientes en la sección de direcciones
mostrarListadoClientes();
function mostrarListadoClientes () {

    const contenedosListadoClientesCheck = document.getElementById('listado-clientes-check');

    if (localStorage.getItem('clientes') === null || localStorage.getItem('clientes') === '[]') {
        contenedosListadoClientesCheck.innerHTML = "<p>Añade una nueva dirección</p>";
        return ;
    };
    
    let clientes = localStorage.getItem('clientes');

    let listaClientes = JSON.parse(clientes);
    
    const mostrarClientes = listaClientes.map(e => `
        <div class="form-check d-flex justify-content-between">
            <div>
                <input class="form-check-input" data-nombreDireccion="${e.direccion}" type="radio" name="exampleRadios" id="exampleRadios1" value="option1">
                <label class="form-check-label" for="exampleRadios1">
                <span class="fw-bolder">${e.direccion}: </span>
                    <span>${e.nombreCliente}</span>
                    <span>${e.nombreDireccion}</span>
                    <span>${e.pais}</span>
                    <span>${e.telefonoCliente}</span>
                </label>
            </div>
            <button class="btn btn-primary mx-4 my-2 py-1" id="eliminar-cliente-direccion" data-nombreusuario="${e.nombreCliente}">Eliminar</button>
        </div>
    `).join('');

    contenedosListadoClientesCheck.innerHTML = mostrarClientes;

}

document.getElementById('listado-clientes-check').addEventListener('click' , evento => {
    mostrarDatosClienteMenuLateral(evento);
});

function mostrarDatosClienteMenuLateral (e) {
    // Header del menu lateral
    const tituloMenuLateralUsuario = document.getElementById('cabecera-panel-usuario');
    // Cuerpo del menu lateral
    const cuerpoLateralUsuario = document.getElementById('cabecera-cuerpo-usuario');
    let clientes = localStorage.getItem('clientes');
    let listaClientes = JSON.parse(clientes);

    if (e.target.tagName === 'BUTTON') {
        const nombreClienteEliminar = e.target.dataset.nombreusuario.trim();
        eliminarUsuario(nombreClienteEliminar);
        return;
    }

    if (e.target.tagName !== 'INPUT') return;

    // Nombre de la direccion seleccionado
    const nombreDireccion = e.target.dataset.nombredireccion;

    // Obtiene el cliente que esta seleccionado
    const obtenerCliente = listaClientes.filter(cli => nombreDireccion === cli.direccion);
    
    // Muestra los datos del cliente en el menu lateral
    const mostrarClienteMenuLateral = obtenerCliente.map(cli =>
        `<span><strong>Nombre:</strong> ${cli.nombreCliente}</span>
        <span><strong>Apellido:</strong> ${cli.apellidoCliente}</span>
        <span><strong>Dirección:</strong> ${cli.nombreDireccion}</span>
        <span><strong>Pais:</strong> ${cli.pais}</span>
        <span><strong>Telefono:</strong> ${cli.telefonoCliente}</span>
    `);


    tituloMenuLateralUsuario.innerHTML = '<p>Dirección de envio seleccionada</p>';
    cuerpoLateralUsuario.innerHTML = mostrarClienteMenuLateral;

    // Guarda en el localStorage la direccion seleccionada
    localStorage.setItem("cliente-comprar" , JSON.stringify(obtenerCliente));

}


function eliminarUsuario(nombreCliente) {
    let clientes = localStorage.getItem('clientes');
    let listaClientes = JSON.parse(clientes);
    
    const nuevaListaEliminar = listaClientes.filter(cli => cli.nombreCliente !== nombreCliente);

    localStorage.setItem('clientes' , JSON.stringify(nuevaListaEliminar));
}











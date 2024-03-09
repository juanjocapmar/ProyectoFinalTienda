import { comentarios } from "./obtenerComentarios.js";

// Muestra los comentarios
function mostrarComentarios (comentarios) {
    const contenedorListadoComentarios = document.getElementById('listado-comentarios');
    const nombreProducto = document.getElementById('nombre-producto').innerHTML;

    // Filtra los comentarios del producto
    const comentariosFiltrados = comentarios.filter(com => com.nombreProducto === nombreProducto);

    // Aviso de error si no hay comentarios
    if (comentariosFiltrados.length === 0 || comentariosFiltrados === null) {
        contenedorListadoComentarios.innerHTML = `
        <div class="alert alert-danger w-50 m-auto my-4" role="alert">
            No hay comentarios para mostrar
        </div>
        `;
        return;
    }

    const mostrarComentarios = comentariosFiltrados.map(com => `
        <h4 class="text-center"><strong>${com.nombre + " " + com.apellido}</strong></h4>
        <p class="text-center">${com.texto}</p>
    `);

    contenedorListadoComentarios.innerHTML = mostrarComentarios;
}

mostrarComentarios(comentarios);


// Añade un nuevo comentario en el archivo json
document.getElementById('boton-comentarios').addEventListener('click' , evento => {
    const nombreComentario = document.getElementById('nombre-comentario').value;
    const apellidoComentario = document.getElementById('apellido-comentario').value;
    const textoComentario = document.getElementById('text-comentario').value;
    const nombreProducto = document.getElementById('nombre-producto').innerHTML;
    let idComentario = 0;

    // Si no hay ningún comentario el primer id es 1
    if (comentarios.length === 0 || comentarios === null) {
        idComentario = 0;
    } else {
        // Ontiene el id del ultimo comentario en el archivo json
        idComentario = comentarios[comentarios.length - 1].id; 
    }
    
    const introducirComentario = async (url , nombreProducto , nombreComentario , apellidoComentario , textoComentario , idComentario) => {
        try {
            
            let response = await fetch(url , {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    id:idComentario + 1,
                    nombreProducto: nombreProducto,
                    texto: textoComentario,
                    nombre: nombreComentario,
                    apellido:apellidoComentario
                })
            });
            if (response.ok) {
                let result = await response.json();
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    }
    introducirComentario('http://localhost:3000/comentarios' , nombreProducto , nombreComentario , apellidoComentario ,textoComentario , idComentario);
});
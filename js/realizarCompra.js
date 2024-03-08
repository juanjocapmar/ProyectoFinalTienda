import { listaProductos } from "./obtenerProductos.js";

const productosCesta = localStorage.getItem("cesta");
const productosCestaArray = JSON.parse(productosCesta);

let nombreProductosArray = [];

for (let producto of productosCestaArray) {
    nombreProductosArray.push(producto.nombreProducto);
}

document.getElementById('boton-finalizar-compra').addEventListener('click' , evento => {
    
    if (evento.target.tagName !== 'A') return;
    // Obtiene los productos que se han comprado
    const productosModificarVenta = listaProductos.filter(pro => nombreProductosArray.includes(pro.nombreProducto));
    
    // Aumenta el uno el numero de ventas y resta 1 en el archivo json 
    const modificarVenta = async (url , productoActualizar) => {
        try {
            
            let response = await fetch(url , {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    descripcion: productoActualizar.descripcion,
                    id: productoActualizar.id,
                    imagen: productoActualizar.imagen,
                    nombreCategoria: productoActualizar.nombreCategoria,
                    nombreProducto: productoActualizar.nombreProducto,
                    precio: productoActualizar.precio,
                    stock: productoActualizar.stock - 1,
                    ventas: productoActualizar.ventas + 1
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


    for (let producto of productosModificarVenta) {
        const url = 'http://localhost:3000/productos/' + producto.id;
        modificarVenta (url , producto);
    }
    
});

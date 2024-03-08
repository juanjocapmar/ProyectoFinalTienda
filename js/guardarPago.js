// Guarda el método de pago en el localstorages
document.getElementById('pagos').addEventListener('click' , evento => {
    
    if (evento.target.id === 'descuento') return;
    if (evento.target.id === 'entrega-domicilio') return;
    if (evento.target.tagName !== 'INPUT') return;
    
    localStorage.setItem("metodo-pago" , evento.target.dataset.metodopago);
});

document.getElementById('descuento').addEventListener('click' , evento => {
    if (evento.target.id === 'entrega-domicilio') return;
    if (evento.target.id !== 'descuento') return;
    if (evento.target.tagName !== 'INPUT') return;

    localStorage.setItem("descuento" , evento.target.checked);
    
})


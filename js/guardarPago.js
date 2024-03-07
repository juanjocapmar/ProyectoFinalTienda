document.getElementById('pagos').addEventListener('click' , evento => {
    
    if (evento.target.id === 'entrega-domicilio') return;
    if (evento.target.tagName !== 'INPUT') return;
    
    localStorage.setItem("metodo-pago" , evento.target.dataset.metodopago);
});
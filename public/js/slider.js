const carnetFlip = document.querySelector('.carnet-flip');

carnetFlip.addEventListener('click', () => {
  carnetFlip.classList.toggle('is-flipped');
});
 function mostrarTab(tabId) {
      // Ocultar todos los panes
      document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
      // Quitar clase activa de todas las pestañas
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
      // Mostrar el pane seleccionado
      document.getElementById(tabId).classList.add('active');
      // Activar la pestaña correspondiente
      event.target.classList.add('active');
    }

      // Espera que el DOM esté listo
  document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (e) {
      const carnet = e.target.closest('.btnCarnet');
      const certificado = e.target.closest('.btnCertificado');

      if (carnet) {
        e.preventDefault();
        const id = carnet.dataset.id;       
     
      }

      if (certificado) {
        e.preventDefault();
        const id = certificado.dataset.id;       
     
      }
    });
  });
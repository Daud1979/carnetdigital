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
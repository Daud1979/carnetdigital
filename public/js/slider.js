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
    document.addEventListener('click',async function (e) {
      const carnet = e.target.closest('.btnCarnet');
      const certificado = e.target.closest('.btnCertificado');
      if (carnet) {
        e.preventDefault();
        const id = carnet.dataset.id;   
        document.getElementById('titulos').textContent    = 'CARGANDO DATOS... ESPERE';               
        document.getElementById('expiras').textContent    = '';
        document.getElementById('validos').textContent    = '';    
        document.getElementById('nregistros').textContent = '';    
        document.getElementById('titulo2').textContent='';
        const contenedor = document.getElementById('carnet-content2');
        contenedor.innerHTML = '';
         try {
    const response = await fetch(`/carnet/${id}`);
    const carnet = await response.json();
    // Cambiar fondoc según Tipo
    
    const fondo = carnet[0].Tipo === 'UNE' ? 'anversoUNE.png' : 'anversoNormal.png';
    const fondo2 = carnet[0].Tipo === 'UNE' ? 'reversoUNE.png' : 'reversoNormal.png';
    const titulo2 = carnet[0].Tipo === 'UNE' ? 'Homologación UNE 58451 ES153333-1' : '';
    document.getElementById('fondocarnets').style.backgroundImage = `url('/images/${fondo}')`;
  document.getElementById('fondocarnets2').style.backgroundImage = `url('/images/${fondo2}')`;
    // Mostrar datos

    document.getElementById('titulos').textContent    = carnet[0].Titulo;
    document.getElementById('nregistros').textContent = carnet[0].N_Registroa
    document.getElementById('expiras').textContent    = carnet[0].Expira;
    document.getElementById('validos').textContent    = carnet[0].Fecha_Valido;    
    document.getElementById('titulo2').textContent    = titulo2;
carnet.forEach(c => {
  const label = document.createElement('label');
  label.textContent = c.Asignatura;
  contenedor.appendChild(label);
});
  } catch (error) {
    console.error('Error al cargar carnet:', error);
  }
      }

      if (certificado) {
        e.preventDefault();
        const id = certificado.dataset.id;       
     
      }
    });
  });


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
        document.getElementById('fondocarnets').style.backgroundImage = 'none';
        document.getElementById('fondocarnets2').style.backgroundImage = `none`;
        document.getElementById('titulos').textContent    = '';               
        document.getElementById('expiras').textContent    = '';
        document.getElementById('nombre').textContent    = '';
        document.getElementById('apellidos').textContent    = '';
        document.getElementById('doc').textContent    = '';
        document.getElementById('validos').textContent    = '';    
        document.getElementById('nregistros').textContent = '';    
        document.getElementById('titulo2').textContent='';   
        document.getElementById('imgfoto').style.display = 'none';
        document.getElementById('labeltitulo').style.display = 'none';
        document.getElementById('labelnombre').style.display = 'none';
        document.getElementById('labelapellidos').style.display = 'none';
        document.getElementById('labeldni').style.display = 'none';
        document.getElementById('valido').style.display = 'none';
        document.getElementById('expira').style.display = 'none';
        const contenedor = document.getElementById('carnet-content2');
        contenedor.innerHTML = '';                    ///
        const nuevoLabel = document.createElement("label");
        const nuevoLabel2 = document.createElement("label");
        nuevoLabel.className = "clasefoto";
        nuevoLabel2.className = "clasefoto";
        document.getElementById("fondocarnets").appendChild(nuevoLabel);
        document.getElementById("fondocarnets2").appendChild(nuevoLabel2);
        let puntos = 0;
        const intervalo = setInterval(() => {
          puntos = (puntos + 1) % 4; // 0..3
          nuevoLabel.textContent = "CARGANDO DATOS DEL ALUMNO" + ".".repeat(puntos);
          nuevoLabel2.textContent = "CARGANDO DATOS DEL ALUMNO" + ".".repeat(puntos);
        }, 500);
        ///
         try {
            const response = await fetch(`/carnet/${id}`);
            const carnet = await response.json();
            // Cambiar fondoc según Tipo
            clearInterval(intervalo);
            nuevoLabel.remove();
            nuevoLabel2.remove();
            const fondo = carnet[0].Tipo === 'UNE' ? 'anversoUNE.png' : 'anversoNormal.png';
            const fondo2 = carnet[0].Tipo === 'UNE' ? 'reversoUNE.png' : 'reversoNormal.png';
            const titulo2 = carnet[0].Tipo === 'UNE' ? 'Homologación UNE 58451 ES153333-1' : '';
            document.getElementById('fondocarnets').style.backgroundImage = `url('/images/${fondo}')`;
            document.getElementById('fondocarnets2').style.backgroundImage = `url('/images/${fondo2}')`;
            // Mostrar datos
            document.getElementById('titulos').textContent    = carnet[0].Titulo;
            document.getElementById('nombre').textContent = carnet[0].Nombre;
            document.getElementById('apellidos').textContent = carnet[0].Apellidos
            document.getElementById('doc').textContent = carnet[0].TDocumento;
            document.getElementById('nregistros').textContent = carnet[0].N_Registroa
            document.getElementById('expiras').textContent    = carnet[0].Expira;
            document.getElementById('validos').textContent    = carnet[0].Fecha_Valido;    
            document.getElementById('titulo2').textContent    = titulo2;
            document.getElementById('imgfoto').style.display = 'inline';
            document.getElementById('labeltitulo').style.display = 'inline';
            document.getElementById('labelnombre').style.display = 'inline';
            document.getElementById('labelapellidos').style.display = 'inline';
            document.getElementById('labeldni').style.display = 'inline';
            document.getElementById('valido').style.display = 'inline';
            document.getElementById('expira').style.display = 'inline';
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
        console.log(id);
      }
    });
  });


document.addEventListener('DOMContentLoaded', function() {
    verificarRolUsuario();
    loadMontosMinimos()
   });

   //// Eliminar Montos
   var modalDlt = document.getElementById("montoMinimoModalDlt");
   var btnDlt = document.getElementById("btnDltMontoMinimo");
   var spanDlt = document.getElementById("closemodalDltMontoMinimo");
   var dltMontoMinimoForm= document.getElementById("DltMontoMinimoForm");
   
   btnDlt.onclick = function() {
    modalDlt.style.display = "block";
    showProgramsDlt();
    cargarañosDlt();
    cargarmesesDlt();
  }
  
  spanDlt.onclick = function() {
    modalDlt.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modalDlt) {
      modalDlt.style.display = "none";
    }
  }
  function showProgramsDlt() {
    const token = sessionStorage.getItem('jwtToken')
    fetch('https://localhost:7174/api/Programa',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
     
    })
    .then(response => response.json())
    .then(data => {
  
    const desplegable = document.getElementById('programDropdownMontoMinimoDlt');
    const opcionEnBlanco = document.createElement('option');
      opcionEnBlanco.value = 'Selecciona un programa'; 
      opcionEnBlanco.textContent = 'Selecciona un programa'; 
      desplegable.appendChild(opcionEnBlanco);
      data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id; 
      option.textContent = item.nombre_programa;
      desplegable.appendChild(option); 
    });
  })
  .catch(error => console.error('Error al obtener los datos:', error)); 
  }
  function cargarmesesDlt(){
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  // Obtener el elemento select
      const selectMes = document.getElementById('mesDropdownMontoMinimoDlt');
  
       const opcionEnBlancomes = document.createElement('option');
        opcionEnBlancomes.value = 'Selecciona un mes'; 
       opcionEnBlancomes.textContent = 'Selecciona un mes'; 
       selectMes.appendChild(opcionEnBlancomes);
      meses.forEach((mes, index) => {
      const option = document.createElement('option');
      option.value = index + 1;
      option.textContent = mes;
      selectMes.appendChild(option);
   });
   }
   function cargarañosDlt(){
    const años = [
      2024,2025,2026
  ];
  
  // Obtener el elemento select
  const selectaño = document.getElementById('añoDropdownMontoMinimoDlt');

  
       const opcionEnBlancoAño = document.createElement('option');
        opcionEnBlancoAño.value = 'Selecciona un año'; 
       opcionEnBlancoAño.textContent = 'Selecciona un año'; 
       selectaño.appendChild(opcionEnBlancoAño);
  // Llenar el select con los meses
  años.forEach((años, index) => {
      const option = document.createElement('option');
      option.value = index + 1;
      option.textContent = años;
      selectaño.appendChild(option);
   });
   }
   function cargardatosDlt(){
    var mes=  document.getElementById('mesDropdownMontoMinimoDlt').value;
    var año=  document.getElementById('añoDropdownMontoMinimoDlt');
    var programaMontoMinimoDlt= document.getElementById('programaMontoMinimoDlt');
    var importeMinimoDlt= document.getElementById('importeMinimoDlt');
    var importeMinimoDltApross= document.getElementById('importeMinimoDltApross');
    var fechaImporteMinimoDlt= document.getElementById('fechaImporteMinimoDlt');
    var usuarioCreacionMontoMinimoDlt = document.getElementById('usuarioCreacionMontoMinimoDlt');
    var creadoMontoMinimoDlt = document.getElementById('creadoMontoMinimoDlt');
    var opcionSeleccionadaAño = año.options[año.selectedIndex];
    var textoSeleccionadoAño = opcionSeleccionadaAño.textContent;
    var idProgramaDlt = document.getElementById('programDropdownMontoMinimoDlt').value;
    var iduDlt= document.getElementById('idMontoMinimoDlt');
    año= textoSeleccionadoAño;
    var url2 = 'https://localhost:7174/api/MontoMinimoPrograma/'+ idProgramaDlt + '/' + mes + '/' + año;

    fetch(url2,{
      method: 'GET',
      headers: {
        //'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
     
    })
    
        .then(response => response.json())
        .then(data => {  
          iduDlt.value= data.id;    
          programaMontoMinimoDlt.value = data.id_programa;
          importeMinimoDlt.value = data.importe_minimo;
          importeMinimoDltApross.value = data.importe_minimo_apross;
          fechaImporteMinimoDlt.value = data.fecha;
          usuarioCreacionMontoMinimoDlt.value = data.usuario_creacion;
          creadoMontoMinimoDlt.value = data.creado
        })
        .catch(error => console.error('Error al obtener los datos de la API:', error));

   }
   document.getElementById('loadDltMontoMinimo').addEventListener('click', function() {
    cargardatosDlt();
  });
  function deleteMonto() {
    const token = sessionStorage.getItem('jwtToken')
    const selectedMontoIdDelete = document.getElementById('idMontoMinimoDlt').value;
    console.log(selectedMontoIdDelete);
    fetch(`https://localhost:7174/api/MontoMinimoPrograma?id=${selectedMontoIdDelete}`, {
          method: 'DELETE', 
          headers: {
            //'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar los datos del desplegable');
        }
        console.log('Datos del desplegable eliminados correctamente.');
      /*  document.getElementById('idExcepcionDelete').value = "";
        document.getElementById('excepcionDeleteForm').value = ""
        document.getElementById('fechaDeleteForm').value = ""
        document.getElementById('userDeleteForm').value = ""
        showOsExcepcionesDelete();
        loadExcepciones();
        */
        modalDlt.style.display = "none"
        window.alert("Monto Eliminado Correctamente correctamente.")
        loadMontosMinimos()
    })
    .catch(error => console.error('Error al eliminar los datos del desplegable:', error));
  }
  
  document.getElementById('DltMontoMinimoForm').addEventListener("submit", function(event) {
    event.preventDefault(); 
    deleteMonto(); 
  });
   /// Modicar Montos
   var modalUpd = document.getElementById("montoMinimoModalUpd");
   var btnUdp = document.getElementById("btnUpdMontoMinimo");
   var spanUdp = document.getElementById("closemodalUpdMontoMinimo");
   var udpMontoMinimoForm= document.getElementById("UdpMontoMinimoForm");
   
   btnUdp.onclick = function() {
    modalUpd.style.display = "block";
    showProgramsUpd();
    cargarmeses();
    cargaraños();
  }
  
  
  spanUdp.onclick = function() {
    modalUpd.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modalUpd) {
      modalUpd.style.display = "none";
    }
  }
  function showProgramsUpd() {
    const token = sessionStorage.getItem('jwtToken')
    fetch('https://localhost:7174/api/Programa',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
     
    })
    .then(response => response.json())
    .then(data => {
  
    const desplegable = document.getElementById('programDropdownMontoMinimoUpd');
    const opcionEnBlanco = document.createElement('option');
      opcionEnBlanco.value = 'Selecciona un programa'; 
      opcionEnBlanco.textContent = 'Selecciona un programa'; 
      desplegable.appendChild(opcionEnBlanco);
      data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id; 
      option.textContent = item.nombre_programa;
      desplegable.appendChild(option); 
    });
  })
  .catch(error => console.error('Error al obtener los datos:', error)); 
  }
  function cargarmeses(){
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  // Obtener el elemento select
      const selectMes = document.getElementById('mesDropdownMontoMinimoUpd');
  
       const opcionEnBlancomes = document.createElement('option');
        opcionEnBlancomes.value = 'Selecciona un mes'; 
       opcionEnBlancomes.textContent = 'Selecciona un mes'; 
       selectMes.appendChild(opcionEnBlancomes);
      meses.forEach((mes, index) => {
      const option = document.createElement('option');
      option.value = index + 1;
      option.textContent = mes;
      selectMes.appendChild(option);
   });
   }
   function cargaraños(){
    const años = [
      2024,2025,2026
  ];
  
  // Obtener el elemento select
  const selectaño = document.getElementById('añoDropdownMontoMinimoUpd');

  
       const opcionEnBlancoAño = document.createElement('option');
        opcionEnBlancoAño.value = 'Selecciona un año'; 
       opcionEnBlancoAño.textContent = 'Selecciona un año'; 
       selectaño.appendChild(opcionEnBlancoAño);
  // Llenar el select con los meses
  años.forEach((años, index) => {
      const option = document.createElement('option');
      option.value = index + 1;
      option.textContent = años;
      selectaño.appendChild(option);
   });
   }

   function cargardatosUpd(){
    var mes=  document.getElementById('mesDropdownMontoMinimoUpd').value;
    var año=  document.getElementById('añoDropdownMontoMinimoUpd');
    var programaMontoMinimoUpd= document.getElementById('programaMontoMinimoUpd');
    var importeMinimoUpd= document.getElementById('importeMinimoUpd');
    var importeMinimoUpdApross= document.getElementById('importeMinimoUpdApross');
    var fechaImporteMinimoUpd= document.getElementById('fechaImporteMinimoUpd');
    var usuarioCreacionMontoMinimoUpd = document.getElementById('usuarioCreacionMontoMinimoUpd');
    var creadoMontoMinimoUpd = document.getElementById('creadoMontoMinimoUpd');
    var opcionSeleccionadaAño = año.options[año.selectedIndex];
    var textoSeleccionadoAño = opcionSeleccionadaAño.textContent;
    var idPrograma = document.getElementById('programDropdownMontoMinimoUpd').value;
    var idupd= document.getElementById('idMontoMinimoUpd');
    año= textoSeleccionadoAño;
    var url2 = 'https://localhost:7174/api/MontoMinimoPrograma/'+ idPrograma + '/' + mes + '/' + año;

    fetch(url2,{
      method: 'GET',
      headers: {
        //'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
     
    })
    
        .then(response => response.json())
        .then(data => {  
          idupd.value= data.id;    
          programaMontoMinimoUpd.value = data.id_programa;
          importeMinimoUpd.value = data.importe_minimo;
          importeMinimoUpdApross.value = data.importe_minimo_apross;
          fechaImporteMinimoUpd.value = data.fecha;
          usuarioCreacionMontoMinimoUpd.value = data.usuario_creacion;
          creadoMontoMinimoUpd.value = data.creado
        })
        .catch(error => console.error('Error al obtener los datos de la API:', error));

   }
   document.getElementById('loadUpdMontoMinimo').addEventListener('click', function() {
    cargardatosUpd();
  });
  function updateMontoMinimo() {
    
    const updatedData = {
        id:document.getElementById('idMontoMinimoUpd').value,
        id_programa:document.getElementById('programaMontoMinimoUpd').value,
        importe_minimo:document.getElementById('importeMinimoUpd').value,
        importe_minimo_apross:document.getElementById('importeMinimoUpdApross').value,
        fecha:document.getElementById('fechaImporteMinimoUpd').value,
        usuario_creacion: document.getElementById('usuarioCreacionMontoMinimoUpd').value,
        creado: document.getElementById('creadoMontoMinimoUpd').value, 
    };
    console.log(updatedData)
    const token = sessionStorage.getItem('jwtToken')
    fetch(`https://localhost:7174/api/MontoMinimoPrograma`, {
        method: 'PUT',
        headers: {
          //  'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar la Excepcion.');
        }
        console.log('Programa actualizado correctamente.');
      /*  document.getElementById('idExcepcionUpdate').value = '';
        document.getElementById('excepcionUpdateForm').value = '';
        document.getElementById('fechaUpdateForm').value = '';
        document.getElementById('userUpdateForm').value = '';*/
        window.alert("Monto actualizado correctamente.")
         modalUpd.style.display = "none";
        loadMontosMinimos()
       ;
    })
    .catch(error => console.error('Error al actualizar el programa:', error));
  }
  
  document.getElementById("UpdMontoMinimoForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    updateMontoMinimo();
  });
  
  //// Agregar Montos Nuevos
   var modal = document.getElementById("montoMinimoModalAdd");
   var btn = document.getElementById("btnAddMontoMinimo");
   var span = document.getElementById("closemodalAddMontoMinimo");
   var addMontoMinimoForm= document.getElementById("addMontoMinimoForm");
   
   btn.onclick = function() {
    modal.style.display = "block";
    showPrograms();
  }
  
  
  span.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  function showPrograms() {
    const token = sessionStorage.getItem('jwtToken')
    fetch('https://localhost:7174/api/Programa',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
     
    })
    .then(response => response.json())
    .then(data => {
  
    const desplegable = document.getElementById('programDropdownMontoMinimo');
    const opcionEnBlanco = document.createElement('option');
      opcionEnBlanco.value = 'Selecciona un programa'; 
      opcionEnBlanco.textContent = 'Selecciona un programa'; 
      desplegable.appendChild(opcionEnBlanco);
      data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id; 
      option.textContent = item.nombre_programa;
      desplegable.appendChild(option); 
    });
  })
  .catch(error => console.error('Error al obtener los datos:', error)); 
  }
  function llenarFormularioProgramaId() {
    const osInput = document.getElementById('programaMontoMinimoAdd'); 
    var servicioInput = document.getElementById('programDropdownMontoMinimo');
  
    var opcionSeleccionadaprograma = servicioInput.options[servicioInput.selectedIndex];
    var textoSeleccionadoPrograma = opcionSeleccionadaprograma.value;
    osInput.value = textoSeleccionadoPrograma; 
  }
  document.getElementById('programDropdownMontoMinimo').addEventListener('change', function() {
    llenarFormularioProgramaId();
  });
  
  addMontoMinimoForm.addEventListener('submit', function(event) {
    event.preventDefault();
  
  
    var formData = new FormData(addMontoMinimoForm);
  
   
    var jsonData = {};
    formData.forEach(function(value, key) { 
      if (key === 'importe_minimo_apross' && value === "") {
        jsonData[key] =parseInt(formData.get('importe_minimo') || 0);
      } else {
        jsonData[key] = value;
      }         
        
        }     
    );
  //  delete jsonData['nombre_programa']
 //   jsonData['id_Programa'] = parseInt(servicioImput.value) ;
    console.log(jsonData);
  
    fetch('https://localhost:7174/api/MontoMinimoPrograma', {
      method: 'POST',
      headers: {
       // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Error al enviar los datos a la API');
      }
      return response.json();
    })
    .then(function(data) {
      console.log('Respuesta de la API:', data);
  
    })
    .catch(function(error) {
      console.error('Error:', error);
   
    })
    .finally(function() {
      window.alert("Practica agregada Correctamente.")
      //AddPracticaModal.style.display = "none";
      loadMontosMinimos()
    });
  });

// funcion para cargar montos minimos en tabla
  function loadMontosMinimos() {
    const token = sessionStorage.getItem('jwtToken')
    var url = 'https://localhost:7174/api/MontoMinimoPrograma';
  
      fetch(url,{
        method: 'GET',
        headers: {
          //'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
       
      })
      
          .then(response => response.json())
          .then(data => {
              const tablaBody = document.querySelector('#tablaMontosMinimos tbody');
              tablaBody.innerHTML = '';
         
              data.forEach(item => {
                  const row = document.createElement('tr');
                  row.innerHTML = `
                      <td>${item.id}</td>
                      <td>${item.id_programa}</td>
                      <td>${item.importe_minimo}</td>
                      <td>${item.importe_minimo_apross}</td>
                      <td>${item.fecha}</td>
                      <td>${item.usuario_creacion}</td>
                      <td>${item.creado}</td>
                      <td><button class="btn-eliminar" data-id="${item.id}">Eliminar</button></td>
                  `;
                  tablaBody.appendChild(row);
              });
              const tabla = document.querySelector('#tablaMontosMinimos tbody');
              const newTable = tabla.cloneNode(true);
              tabla.parentNode.replaceChild(newTable, tabla);
              
               newTable.addEventListener('click', function(event) {
               if (event.target.classList.contains('btn-eliminar')) {
              handleDelete(event);
              }
                });
          })
          .catch(error => console.error('Error al obtener los datos de la API:', error));
  }

   
   const token = sessionStorage.getItem('jwtToken')
   function parseJwt(token) {
     const base64Url = token.split('.')[1];
     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
     const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
     }).join(''));
   
     return JSON.parse(jsonPayload);
   }
   
   
  function verificarRolUsuario() {
     const token = sessionStorage.getItem('jwtToken');
     if (token == null){
       window.location.href = 'inicio.html'
     }
     if (token) {
         try {
             const tokenData = parseJwt(token);
             console.log(tokenData)
             const userRole = tokenData.Rol;
             console.log(userRole)
             if (userRole == 'Admin' ) {                
                 mostrarEnlacesAdmin();
                 mostrarEnlacesSuper();               
             }else if(userRole == 'Supervisor'){
               mostrarEnlacesSuper();
             }
 
         } catch (error) {
             
             console.error('Error al decodificar el token:', error);
         }
     }
   }
   
   function mostrarEnlacesAdmin() {
   const enlacesRestringidos = document.querySelectorAll('.admin-link');
   
   enlacesRestringidos.forEach(enlace => {
       enlace.style.display = "inline-block";
   });
   }
   function mostrarEnlacesSuper() {
     const enlacesRestringidos = document.querySelectorAll('.super-link');
     
     enlacesRestringidos.forEach(enlace => {
         enlace.style.display = "inline-block";
     });
     }

     function handleDelete(event) {
      const token = sessionStorage.getItem('jwtToken')
      const id = event.target.dataset.id;
      console.log('Eliminar clic en id:', id); 
  
   
      if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
          fetch(`https://localhost:7174/api/MontoMinimoPrograma?id=${id}`, {
            
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
                //  'Authorization': `Bearer ${token}`
              }
          })
          .then(response => {
              if (!response.ok) {
                  return response.text().then(text => { throw new Error(text) });
              }

              return response.text().then(text => text ? JSON.parse(text) : {});
          })
          .then(data => {
              console.log('Registro eliminado:', data);
              loadMontosMinimos(); 
          })
          .catch(error => {
              console.error('Error al eliminar el registro:', error);
              alert('Error al eliminar el registro: ' + error.message);
          });
      }
  }

     ///Logout
     document.getElementById('logout').addEventListener('click', function() {
     
      sessionStorage.clear();
      localStorage.clear();

      window.location.href = 'index.html';
  });

     
    
  
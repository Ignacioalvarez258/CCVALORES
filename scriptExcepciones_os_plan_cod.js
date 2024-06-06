document.addEventListener('DOMContentLoaded', function() { 
    loadExcepciones();
    verificarRolUsuario();
   });

   /// VERIFICAR ROL DE USUARIO
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
             const userRole = tokenData.Rol;
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
   //// Modificar excepciones
   
   var udpExcepcioForm= document.getElementById("udpExcepcionOSForm")
   var modalUdp = document.getElementById("excepcionOsModalUdp");
   var btnUdp = document.getElementById("btnUpdateExcepcionOS");
   var spanUdp = document.getElementById("closemodalUdpExcepcionOs");

   btnUdp.onclick = function() {
    modalUdp.style.display = "block";
    CargarOSUdp();
    showPracticasUdp();
    showNomencladorUdp();
  }
   
  spanUdp.onclick = function() {
    modalUdp.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modalUdp) {
      modalUdp.style.display = "none";
    }
  }
  document.getElementById('osExcecpcioOsDespUdp').addEventListener('change', function() {
    CargarPlanUdp();
  });

  function CargarOSUdp(){

    fetch('https://localhost:7174/OS',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
     
    })
    .then(response => response.json())
    .then(data => {
      const desplegable = document.getElementById('osExcecpcioOsDespUdp');
      const opcionEnBlancoUdp = document.createElement('option');
      opcionEnBlancoUdp.value = 'Seleccione una Os'; 
      opcionEnBlancoUdp.textContent = 'Seleccione un OS'; 
      desplegable.appendChild(opcionEnBlancoUdp);
      data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.codigoOs; 
        option.textContent = item.os; 
        desplegable.appendChild(option); 
      });
    })
    .catch(error => console.error('Error al obtener los datos:', error));
}
function CargarPlanUdp(){
  var codigoOS = document.getElementById('osExcecpcioOsDespUdp').value;
  var url = 'https://localhost:7174/api/PlanOS/' + codigoOS
    fetch(url,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
     
    })
    .then(response => response.json())
    .then(data => {
      const desplegable = document.getElementById('planExcecpcioOsDespUdp');
      desplegable.innerHTML = '';
      const opcionEnBlancoUdp = document.createElement('option');
      opcionEnBlancoUdp.value = 'Seleccione un plan'; 
      opcionEnBlancoUdp.textContent = 'Seleccione un plan'; 
      desplegable.appendChild(opcionEnBlancoUdp);
      data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.planId; 
        option.textContent = item.plan; 
        desplegable.appendChild(option); 
      });
    })
    .catch(error => console.error('Error al obtener los datos:', error));
  
}
function showPracticasUdp() {
  fetch('https://localhost:7174/api/AuxPracticas',{
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
   
  })
  .then(response => response.json())
  .then(data => {
  
  const desplegable = document.getElementById('nomCodExcecpcioOsDespUdp');
  desplegable.innerHTML = '';
  const opcionEnBlancoUdp = document.createElement('option');
  opcionEnBlancoUdp.value = 'Seleccione una Practica'; 
  opcionEnBlancoUdp.textContent = 'Seleccione una Practica';
  desplegable.appendChild(opcionEnBlancoUdp); 
  data.forEach(item => {
    const option = document.createElement('option');
    option.value = item.codigoPractica; 
    option.textContent = item.practica; 
    desplegable.appendChild(option); 
  });
})
.catch(error => console.error('Error al obtener los datos:', error));

}
function showNomencladorUdp() {
  fetch('https://localhost:7174/api/AuxPracticas',{
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
   
  }
)
  .then(response => response.json())
  .then(data => {
      const desplegable = document.getElementById('nomencladorExcecpcioOsDespUdp');
           
      const valoresExistentes = [];
      
      desplegable.innerHTML = "";
      const opcionEnBlancoUdp = document.createElement('option');
      opcionEnBlancoUdp.value = 'Seleccione un Nomenclador'; 
      opcionEnBlancoUdp.textContent = 'Seleccione un Nomenclador';
      desplegable.appendChild(opcionEnBlancoUdp); 
      data.forEach(item => {
          
          if (!valoresExistentes.includes(item.nomencladorId)) {
              const option = document.createElement('option');
              option.value = item.nomencladorId; 
              option.textContent = item.nomencladorId; 
              desplegable.appendChild(option); 
              valoresExistentes.push(item.nomencladorId); 
          }
      });
  })
  .catch(error => console.error('Error al obtener los datos:', error));
}

function cargardatosUpd(){
  
  var idExcecpcioOsUdp= document.getElementById('idExcecpcioOsUdp');
  var osExcecpcioOsUdp= document.getElementById('osExcecpcioOsUdp');
  var planExcecpcioOsUdp= document.getElementById('planExcecpcioOsUdp');
  var codExcecpcioOsUdp= document.getElementById('codExcecpcioOsUdp');
  var nomCodExcecpcioOsUdp=  document.getElementById('nomCodExcecpcioOsUdp');
  var nomencladorExcecpcioOsUdp = document.getElementById('nomencladorExcecpcioOsUdp');
  var excepcionExcecpcioOsUdp = document.getElementById('excepcionExcecpcioOsUdp');
  var fechaExcecpcioOsUdp = document.getElementById('fechaExcecpcioOsUdp');
  var creadoExcecpcioOsUdp = document.getElementById('creadoExcecpcioOsUdp');
  var codOs=document.getElementById('osExcecpcioOsDespUdp').value;
  var planOs= document.getElementById('planExcecpcioOsDespUdp').value;
  var codPractica= document.getElementById('nomCodExcecpcioOsDespUdp').value;

  var url= 'https://localhost:7174/api/ExcepcionOsPlaCod/'+codOs + '/' + planOs + '/' + codPractica

  fetch(url,{
    method: 'GET',
    headers: {
      //'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
   
  })
  
      .then(response => response.json())
      .then(data => {  
        idExcecpcioOsUdp.value= data.id;    
        osExcecpcioOsUdp.value = data.os_cod;
        planExcecpcioOsUdp.value = data.plan_id;
        codExcecpcioOsUdp.value = data.cod_practica;
        nomCodExcecpcioOsUdp.value= data.nombre_Practica
        nomencladorExcecpcioOsUdp.value = data.nomencladorId;
        excepcionExcecpcioOsUdp.value = data.excepcion;
        fechaExcecpcioOsUdp.value = data.creado
        creadoExcecpcioOsUdp.value = data.usuario

      })
      .catch(error => console.error('Error al obtener los datos de la API:', error));

 }
 document.getElementById('loadUpdExcepcionOs').addEventListener('click', function() {
  cargardatosUpd();
});

function updateExcepcionOs() {
    
  const updatedData = {
      id:document.getElementById('idExcecpcioOsUdp').value,
      os_cod:document.getElementById('osExcecpcioOsUdp').value,
      plan_id:document.getElementById('planExcecpcioOsUdp').value,
      cod_practica:document.getElementById('codExcecpcioOsUdp').value,
      nombre_Practica:document.getElementById('nomCodExcecpcioOsUdp').value,
      nomencladorId: document.getElementById('nomencladorExcecpcioOsUdp').value,
      excepcion: document.getElementById('excepcionExcecpcioOsUdp').value, 
      creado: document.getElementById('fechaExcecpcioOsUdp').value, 
      usuario: document.getElementById('creadoExcecpcioOsUdp').value, 

  };
  console.log(updatedData)
  const token = sessionStorage.getItem('jwtToken')
  fetch(`https://localhost:7174/api/ExcepcionOsPlaCod`, {
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
      console.log('Excepcion actualizada correctamente.');
    /*  document.getElementById('idExcepcionUpdate').value = '';
      document.getElementById('excepcionUpdateForm').value = '';
      document.getElementById('fechaUpdateForm').value = '';
      document.getElementById('userUpdateForm').value = '';*/
      window.alert("Excepcion actualizada correctamente.")
      modalUdp.style.display = "none";
      loadExcepciones()
     ;
  })
  .catch(error => console.error('Error al actualizar el programa:', error));
}

document.getElementById("UdpExcepcionOSForm").addEventListener("submit", function(event) {
  event.preventDefault(); 
  updateExcepcionOs();
});

  /// Agregar excepciones
   var addExcepcioForm= document.getElementById("addExcepcionOSForm")
   var modal = document.getElementById("excepcionOsModalAdd");
   var btn = document.getElementById("btnAddExcepcionOS");
   var span = document.getElementById("closemodalAddExcepcionOs");

   btn.onclick = function() {
    modal.style.display = "block";
     showPracticas();
     showNomenclador();
     CargarOS();
  }
   
  span.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  document.getElementById('osExcecpcioOsDespAdd').addEventListener('change', function() {
    CargarPlan();
  });

  function showPracticas() {
    fetch('https://localhost:7174/api/AuxPracticas',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
     
    })
    .then(response => response.json())
    .then(data => {
    
    const desplegable = document.getElementById('nomCodExcecpcioOsDespAdd');
    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.codigoPractica; 
      option.textContent = item.practica; 
      desplegable.appendChild(option); 
    });
  })
  .catch(error => console.error('Error al obtener los datos:', error));
  
  }
  function showNomenclador() {
    fetch('https://localhost:7174/api/AuxPracticas',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
     
    }
  )
    .then(response => response.json())
    .then(data => {
        const desplegable = document.getElementById('nomencladorExcecpcioOsDespAdd');
             
        const valoresExistentes = [];
        
        desplegable.innerHTML = "";
  
        data.forEach(item => {
            
            if (!valoresExistentes.includes(item.nomencladorId)) {
                const option = document.createElement('option');
                option.value = item.nomencladorId; 
                option.textContent = item.nomencladorId; 
                desplegable.appendChild(option); 
                valoresExistentes.push(item.nomencladorId); 
            }
        });
    })
    .catch(error => console.error('Error al obtener los datos:', error));
  }
  function CargarOS(){

    fetch('https://localhost:7174/OS',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
     
    })
    .then(response => response.json())
    .then(data => {
      const desplegable = document.getElementById('osExcecpcioOsDespAdd');
      data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.codigoOs; 
        option.textContent = item.os; 
        desplegable.appendChild(option); 
      });
    })
    .catch(error => console.error('Error al obtener los datos:', error));
}

  function CargarPlan(){
    var codigoOS = document.getElementById('osExcecpcioOsDespAdd').value;
    var url = 'https://localhost:7174/api/PlanOS/' + codigoOS
      fetch(url,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
       
      })
      .then(response => response.json())
      .then(data => {
        const desplegable = document.getElementById('planExcecpcioOsDespAdd');
        desplegable.innerHTML = '';
        const opcionEnBlanco = document.createElement('option');
        opcionEnBlanco.value = ''; 
        opcionEnBlanco.textContent = ''; 
        desplegable.appendChild(opcionEnBlanco);
        data.forEach(item => {
          const option = document.createElement('option');
          option.value = item.planId; 
          option.textContent = item.plan; 
          desplegable.appendChild(option); 
        });
      })
      .catch(error => console.error('Error al obtener los datos:', error));
    
  }

  function llenarFormularioOs() {
    const osInput = document.getElementById('osExcecpcioOsAdd'); 
    var servicioInput = document.getElementById('osExcecpcioOsDespAdd');
  
    var opcionSeleccionadaprograma = servicioInput.options[servicioInput.selectedIndex];
    var textoSeleccionadoPrograma = opcionSeleccionadaprograma.value;
    osInput.value = textoSeleccionadoPrograma; 
  }
 
  document.getElementById('osExcecpcioOsDespAdd').addEventListener('change', function() {
    llenarFormularioOs();
  });
  function llenarFormularioPlan() {
    const planInput = document.getElementById('planExcecpcioOsAdd'); 
    var servicioInput = document.getElementById('planExcecpcioOsDespAdd');
  
    var opcionSeleccionadaprograma = servicioInput.options[servicioInput.selectedIndex];
    var textoSeleccionadoPrograma = opcionSeleccionadaprograma.value;
    planInput.value = textoSeleccionadoPrograma; 
  }
 
  document.getElementById('planExcecpcioOsDespAdd').addEventListener('change', function() {
    llenarFormularioPlan();
  });
  function llenarFormularioPractica() {
    const nomCodInput = document.getElementById('nomCodExcecpcioOsAdd'); 
    const CodInput = document.getElementById('codExcecpcioOsAdd'); 
    var servicioInput = document.getElementById('nomCodExcecpcioOsDespAdd');
  
    var opcionSeleccionadaprograma = servicioInput.options[servicioInput.selectedIndex];
    var textoSeleccionadoCod = opcionSeleccionadaprograma.value;
    var textoSeleccionadoPrograma = opcionSeleccionadaprograma.text;
    //var textoSeleccionadocod = textoSeleccionadoCod.value;
    
    nomCodInput.value = textoSeleccionadoPrograma; 
    CodInput.value=textoSeleccionadoCod;
  }
 
  document.getElementById('nomCodExcecpcioOsDespAdd').addEventListener('change', function() {
    llenarFormularioPractica();
  });
  function llenarFormularioNom() {
    const NomInput = document.getElementById('nomencladorExcecpcioOsAdd'); 
    var servicioInput = document.getElementById('nomencladorExcecpcioOsDespAdd');
  
    var opcionSeleccionadaprograma = servicioInput.options[servicioInput.selectedIndex];
    var textoSeleccionadoPrograma = opcionSeleccionadaprograma.value;
    NomInput.value = textoSeleccionadoPrograma; 
  }
 
  document.getElementById('nomencladorExcecpcioOsDespAdd').addEventListener('change', function() {
    llenarFormularioNom();
  });
  addExcepcioForm.addEventListener('submit', function(event) {
    event.preventDefault();
  
  
    var formData = new FormData(addExcepcioForm);
  
   
    var jsonData = {};
    formData.forEach(function(value, key) {
     
      if (addExcepcioForm.elements[key].type === 'checkbox') {
        jsonData[key] = addExcepcioForm.elements[key].checked;
      } else {
       
        if (key === 'nomencladorId') {
          jsonData[key] = parseInt(value);
        } else {
          jsonData[key] = value;
        }
      }
    });
  //  delete jsonData['nombre_programa']
 //   jsonData['id_Programa'] = parseInt(servicioImput.value) ;
    console.log(jsonData);
  
    fetch('https://localhost:7174/api/ExcepcionOsPlaCod', {
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
      modal.style.display = "none";
      loadExcepciones()
    });
  });

  


 /// FUNCION PARA CARGAR LAS EXCEPCIONES EN LA PAGINA PRINCIPAL
   function loadExcepciones() {
    const token = sessionStorage.getItem('jwtToken')
    var url = 'https://localhost:7174/api/ExcepcionOsPlaCod';
  
      fetch(url,{
        method: 'GET',
        headers: {
          //'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
       
      })
      
          .then(response => response.json())
          .then(data => {
              const tablaBody = document.querySelector('#tablaExcepcionesOsplanCod tbody');
              tablaBody.innerHTML = '';
         
              data.forEach(item => {
                  const row = document.createElement('tr');
                  row.innerHTML = `
                      <td>${item.id}</td>
                      <td>${item.os_cod}</td>
                      <td>${item.plan_id}</td>
                      <td>${item.cod_practica}</td>
                      <td>${item.nombre_Practica}</td>
                      <td>${item.nomencladorId}</td>
                      <td>${item.excepcion}</td>
                      <td>${item.creado}</td>
                      <td>${item.usuario}</td>
                      <td><button class="btn-eliminar" data-id="${item.id}">Eliminar</button></td>
                  `;
                  tablaBody.appendChild(row);
              });
              const tabla = document.querySelector('#tablaExcepcionesOsplanCod tbody');
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

  ///BORRAR EXCEPCION
  function handleDelete(event) {
    const id = event.target.dataset.id;
    console.log('Eliminar clic en id:', id); 


    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
        fetch(`https://localhost:7174/api/ExcepcionOsPlaCod/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                //'Authorization': `Bearer ${token}`
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
            loadExcepciones(); // Recargar la tabla
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
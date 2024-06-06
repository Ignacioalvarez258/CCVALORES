//////// PRACTICAS
document.addEventListener('DOMContentLoaded', function() {
  verificarRolUsuario();
  cargarDatosPracticasTotales() 
});
const token = sessionStorage.getItem('jwtToken')

/// Modificar Practicas
var formPracticaUdp = document.getElementById("udpPracticaform");
var udpPracticaModal = document.getElementById("practicasModalUpd");
var openModalBtnPracticasUdp = document.getElementById("btnUpdPractica");
var closeBtnUdpPrograma = document.getElementById("closemodalUpdPracticas");
var modalFormUdpPractica = document.getElementById("modalFormUdpPractica");
var servicioImputUdp= document.getElementById('ServicioImputUdp')
var codigoPracticaImputUdpPractica= document.getElementById('CodigoPracticaImputUdpPractica')
var NomencladorImputUdpPractica= document.getElementById('nomencladorImputUdpPractica')


openModalBtnPracticasUdp.onclick = function() {
  udpPracticaModal.style.display = "block"; 
  cargarDatosPracticasTotales();
  showProgramsUdp();
  showNomencladorUdp();
  showPracticasUdp();
}

closeBtnUdpPrograma.onclick = function() {
  udpPracticaModal.style.display = "none";
  cargarDatosPracticasTotales();
}


window.onclick = function(event) {
  if (event.target == udpPracticaModal) {
    udpPracticaModal.style.display = "none";
  }
  cargarDatosPracticasTotales();
}

function showProgramsUdp() {
  fetch('https://localhost:7174/api/Programa',{
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
   
  })
  .then(response => response.json())
  .then(data => {
  // Limpiar desplegable
  const desplegableUdp = document.getElementById('ServicioImputUpd');
  desplegableUdp.innerHTML="";
  data.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id; 
    option.textContent = item.nombre_programa; 
    desplegableUdp.appendChild(option); 
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
  
  const desplegablePrac = document.getElementById('CodigoPracticaImputUdpPractica');
  desplegablePrac.innerHTML="";
  data.forEach(item => {
    const option = document.createElement('option');
    option.value = item.codigoPractica; 
    option.textContent = item.practica; 
    desplegablePrac.appendChild(option); 
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
      const desplegableNomudp = document.getElementById('nomencladorImputUdpPractica');
           
      const valoresExistentes = [];
      
      desplegableNomudp.innerHTML = "";

      data.forEach(item => {
          
          if (!valoresExistentes.includes(item.nomencladorId)) {
              const option = document.createElement('option');
              option.value = item.nomencladorId; 
              option.textContent = item.nomencladorId; 
              desplegableNomudp.appendChild(option); 
              valoresExistentes.push(item.nomencladorId); 
          }
      });
  })
  .catch(error => console.error('Error al obtener los datos:', error));
}

// agregar Practicas
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
          mostrarEnlacesSuper()
        }
          else{
            window.location.href = 'inicio.html';
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


var formPracticaAdd = document.getElementById("addpracticaform");
var AddPracticaModal = document.getElementById("practicasModalAdd");
var openModalBtnPracticas = document.getElementById("btnAddPractica");
var closeBtnAddPrograma = document.getElementById("closemodalAddPracticas");
var modalFormAddPractica = document.getElementById("modalFormAddPractica");
var servicioImput= document.getElementById('ServicioImput')
var codigoPracticaImputaddPractica= document.getElementById('CodigoPracticaImputaddPractica')
var NomencladorImputAddPractica= document.getElementById('nomencladorImputAddPractica')


openModalBtnPracticas.onclick = function() {
  AddPracticaModal.style.display = "block";
  showPrograms();
  showPracticas();
  showNomenclador();
  
}

closeBtnAddPrograma.onclick = function() {
  AddPracticaModal.style.display = "none";
  cargarDatosPracticasTotales()
}


window.onclick = function(event) {
  if (event.target == AddPracticaModal) {
    AddPracticaModal.style.display = "none";
  }
  cargarDatosPracticasTotales()
}
/// LLenar Tabla Principal
function cargarDatosPracticasTotales() {

  var url = 'https://localhost:7174/api/Practicas'

    fetch(url,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
     
    })
        .then(response => response.json())
        .then(data => {
            const tablaBody = document.querySelector('#tablapracticas tbody');
            tablaBody.innerHTML = '';
          
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.id_Programa}</td>
                    <td>${item.cod_practica}</td>
                    <td>${item.nombre_Practica}</td>
                    <td>${item.nomencladorId}</td>
                    <td>${item.opcional}</td>
                    <td>${item.activo}</td>
                    <td>${item.creado}</td>
                    <td>${item.usuario}</td>
       
                    <td><button class="btn-eliminar"  data-id="${item.id}">Eliminar</button></td>
                    
                `;
                tablaBody.appendChild(row);
            });
            document.querySelector('#tablapracticas tbody').addEventListener('click', function(event) {
             if (event.target.classList.contains('btn-eliminar')) {
                  handleDelete(event);
              }
          });
        })
        .catch(error => console.error('Error al obtener los datos de la API:', error));
     
}


function showPrograms() {
  fetch('https://localhost:7174/api/Programa',{
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
   
  })
  .then(response => response.json())
  .then(data => {
  // Limpiar desplegable
  const desplegable = document.getElementById('ServicioImput');
  desplegable.innerHTML = "";
  data.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id; 
    option.textContent = item.nombre_programa; 
    desplegable.appendChild(option); 
  });
})
.catch(error => console.error('Error al obtener los datos:', error));
}
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
  
  const desplegable = document.getElementById('CodigoPracticaImputaddPractica');
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
      const desplegable = document.getElementById('nomencladorImputAddPractica');
           
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

function llenarFormularioPrograma() {
  const nombreProgramaInput = document.getElementById('nombre_programaModalPracticaAdd'); 
  var servicioInput = document.getElementById('ServicioImput');

  var opcionSeleccionadaprograma = servicioInput.options[servicioInput.selectedIndex];
  var textoSeleccionadoPrograma = opcionSeleccionadaprograma.textContent;
  nombreProgramaInput.value = textoSeleccionadoPrograma; 
}

servicioImput.addEventListener('change', function() {
  llenarFormularioPrograma();
});

function llenarFormularioPracticas() {
;
  const nombrepracticaInput = document.getElementById('nombrePracticaModalPracticaAdd');
  const codigipracticaImput = document.getElementById('CodigoPracticaModalPracticaAdd');
  var codigoPracticaImputaddPractica1 = document.getElementById('CodigoPracticaImputaddPractica');
  var opcionSeleccionadapractica= codigoPracticaImputaddPractica1.options[codigoPracticaImputaddPractica1.selectedIndex];
  var textoSeleccionadoPractica = opcionSeleccionadapractica.textContent;
  var valorSeleccionadoPractica = opcionSeleccionadapractica.value;
  nombrepracticaInput.value=textoSeleccionadoPractica;
  codigipracticaImput.value= valorSeleccionadoPractica;


}

codigoPracticaImputaddPractica.addEventListener('change', function() {
  llenarFormularioPracticas();
});

function llenarFormularioNomenclador() {
  const nomencladoridImput= document.getElementById('NomencladorIdModalPracticaAdd');
  nomencladoridImput.value= NomencladorImputAddPractica.value
}

NomencladorImputAddPractica.addEventListener('change',function(){
  llenarFormularioNomenclador();
})

formPracticaAdd.addEventListener('submit', function(event) {
  event.preventDefault();


  var formData = new FormData(formPracticaAdd);

 
  var jsonData = {};
  formData.forEach(function(value, key) {
   
    if (formPracticaAdd.elements[key].type === 'checkbox') {
      jsonData[key] = formPracticaAdd.elements[key].checked;
    } else {
     
      if (key === 'nomencladorId') {
        jsonData[key] = parseInt(value);
      } else {
        jsonData[key] = value;
      }
    }
  });
  delete jsonData['nombre_programa']
  jsonData['id_Programa'] = parseInt(servicioImput.value) ;
  console.log(jsonData);

  fetch('https://localhost:7174/api/Practicas', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
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
    AddPracticaModal.style.display = "none";
    cargarDatosPracticasTotales()
  });
});


///// BORRAR

function handleDelete(event) {
  const id = event.target.dataset.id;
  console.log('Eliminar clic en id:', id); 

  
  if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      event.target.removeEventListener('click', handleDelete,{ once: true })
      fetch(`https://localhost:7174/api/Practicas?id=${id}`, {
          method: 'DELETE',
          headers: {
              //'Authorization': `Bearer ${token}`
          }
      }).then(response => response.json())
        .then(data => {
            console.log('Registro eliminado:', data);
            cargarDatosPracticasTotales(); // Recargar la tabla
        })
        .catch(error => {
            console.error('Error al eliminar el registro:', error);
        });
  }
}

  ///Logout
  document.getElementById('logout').addEventListener('click', function() {
     
    sessionStorage.clear();
    localStorage.clear();

    window.location.href = 'index.html';
});

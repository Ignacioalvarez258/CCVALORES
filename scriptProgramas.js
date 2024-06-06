//Parte de programas atencion
document.addEventListener('DOMContentLoaded', function() {
  cargarprogramas();
  verificarRolUsuario();
 
});

function cargarprogramas() {
  const token = sessionStorage.getItem('jwtToken')
  var url = 'https://localhost:7174/api/Programa';

    fetch(url,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
     
    })
    
        .then(response => response.json())
        .then(data => {
            const tablaBody = document.querySelector('#tablaprogramas tbody');
            tablaBody.innerHTML = '';
       
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                  <td>${item.id}</td>
                    <td>${item.nombre_programa}</td>
                    <td>${item.activo}</td>
                    <td>${item.creado}</td>
                    <td>${item.usuario}</td>
                    <td><button class="btn-eliminar" data-id="${item.id}">Eliminar</button></td>
                `;
                tablaBody.appendChild(row);
            });
            const tabla = document.querySelector('#tablaprogramas tbody');
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

/// AGREGAR PROGRAMAS DE ATENCION
var modal = document.getElementById("myModal");
var btn = document.getElementById("btnNewProgram");
var span = document.getElementById("closemodalNewPrograma");

btn.onclick = function() {
  modal.style.display = "block";
}


span.onclick = function() {
  modal.style.display = "none";
  cargarprogramas();
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    cargarprogramas();
  }
}


var form = document.getElementById("programForm");
form.addEventListener("submit", function(event) {
  event.preventDefault();

  
  var formData = new FormData(form);

 
  var jsonData = {};
  formData.forEach(function(value, key) {
    
    if (form.elements[key].type === 'checkbox') {
      jsonData[key] = form.elements[key].checked;
    } else {
      jsonData[key] = value;
    }
  });
 
  const token = sessionStorage.getItem('jwtToken')

  fetch('https://localhost:7174/api/Programa', {
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
   
    window.alert("Programa agregado Correctamente.")
    modal.style.display = "none";
    cargarprogramas();
  });
});


/// ACTUALIZAR PROGRAMAS DE ATENCION
var modal1 = document.getElementById("myModal1");
var openModifyProgramModalBtn = document.getElementById("openModalBtn");
var span1 = document.getElementById("closemodal");
var programDropdown = document.getElementById("programDropdown");
var modifyProgramForm = document.getElementById("modifyProgramForm");
var saveChangesBtn = document.getElementById("saveChangesBtn");

openModifyProgramModalBtn.onclick = function() {
  modal1.style.display = "block";
    document.getElementById('nombre_programaModal').value = '';
    document.getElementById('activoModal').checked = false;
    document.getElementById('creadoModal').value = '';
    document.getElementById('usuarioModal').value = '';
    showPrograms();
}


span1.onclick = function() {
  modal1.style.display = "none";
  cargarprogramas();
}


window.onclick = function(event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
  cargarprogramas();
}


function showPrograms() {
  const token = sessionStorage.getItem('jwtToken')
  programDropdown.innerHTML = '';
  fetch('https://localhost:7174/api/Programa',{
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
   
  })
  .then(response => response.json())
  .then(data => {

  const desplegable = document.getElementById('programDropdown');
  data.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id; 
    option.textContent = item.nombre_programa;
    desplegable.appendChild(option); 
  });
})
.catch(error => console.error('Error al obtener los datos:', error));

}

document.getElementById('programDropdown').addEventListener('change', loadProgramData);


function loadProgramData() {
  const token = sessionStorage.getItem('jwtToken')
    const selectedProgramId = document.getElementById('programDropdown').value;
    fetch(`https://localhost:7174/api/Programa/${selectedProgramId}`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
     
    })
        .then(response => response.json())
        .then(data => {
          
            document.getElementById('nombre_programaModal').value = data.nombre_programa;
            document.getElementById('activoModal').checked = data.activo;
            document.getElementById('creadoModal').value = data.creado;
            document.getElementById('usuarioModal').value = data.usuario;
           
        })
        .catch(error => console.error('Error al obtener los datos del programa:', error));
}

programDropdown.addEventListener('change', function() {
  loadProgramData()
});

function updateProgram() {
  const selectedProgramId = document.getElementById('programDropdown').value;
  const updatedData = {
      id:selectedProgramId,
      nombre_programa: document.getElementById('nombre_programaModal').value,
      activo: document.getElementById('activoModal').checked,
      creado: document.getElementById('creadoModal').value,
      usuario: document.getElementById('usuarioModal').value
  };
  const token = sessionStorage.getItem('jwtToken')
  fetch(`https://localhost:7174/api/Programa`, {
      method: 'PUT',
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Error al actualizar el programa.');
      }
      console.log('Programa actualizado correctamente.');
      document.getElementById('nombre_programaModal').value = '';
      document.getElementById('activoModal').checked = false;
      document.getElementById('creadoModal').value = '';
      document.getElementById('usuarioModal').value = '';
      window.alert("Programa actualizado correctamente.")

     ;
  })
  .catch(error => console.error('Error al actualizar el programa:', error));
}

saveChangesBtn.addEventListener("click", function(event) {
  event.preventDefault(); 
  updateProgram();
  cargarprogramas();
});


//// BORRAR PROGRAMAS DE ATENCION
var modalDelete = document.getElementById("deleteModal");
var openDeleteProgramModalBtn = document.getElementById("deleteModalBtn");
var spanDelete = document.getElementById("closemodalDelete");
var programDropdownDelete = document.getElementById("programDropdownDelete");
var deleteProgramForm = document.getElementById("deleteProgramForm");
var deleteBtn = document.getElementById("deleteBtn");


openDeleteProgramModalBtn.onclick = function() {
  modalDelete.style.display = "block";
    document.getElementById('nombre_programaModalDelete').value = '';
    document.getElementById('activoModalDelete').checked = false;
    document.getElementById('creadoModalDelete').value = '';
    document.getElementById('usuarioModalDelete').value = '';
  showProgramsDelete();
}


spanDelete.onclick = function() {
  modalDelete.style.display = "none";
  cargarprogramas();

}


window.onclick = function(event) {
  if (event.target == modalDelete) {
    modalDelete.style.display = "none";
    cargarprogramas();
  }
}


function showProgramsDelete() {
  const token = sessionStorage.getItem('jwtToken')
  programDropdownDelete.innerHTML = '';
  fetch('https://localhost:7174/api/Programa',{
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
   
  })
  .then(response => response.json())
  .then(data => {
  const desplegable = document.getElementById('programDropdownDelete');
  data.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id; 
    option.textContent = item.nombre_programa; 
    desplegable.appendChild(option); 
  });
})
.catch(error => console.error('Error al obtener los datos:', error));

}


function loadProgramDataDelete() {
  const token = sessionStorage.getItem('jwtToken')
  const selectedProgramId = document.getElementById('programDropdownDelete').value;
  fetch(`https://localhost:7174/api/Programa/${selectedProgramId}`,{
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
   
  })
      .then(response => response.json())
      .then(data => {
     
          document.getElementById('nombre_programaModalDelete').value = data.nombre_programa;
          document.getElementById('activoModalDelete').checked = data.activo;
          document.getElementById('creadoModalDelete').value = data.creado;
          document.getElementById('usuarioModalDelete').value = data.usuario;
         
      })
      .catch(error => console.error('Error al obtener los datos del programa:', error));
}
programDropdownDelete.addEventListener('change', function() {
  loadProgramDataDelete()
});

function deleteProgram() {
  const token = sessionStorage.getItem('jwtToken')
  const selectedProgramIdDelete = document.getElementById('programDropdownDelete').value;
  console.log(selectedProgramIdDelete);
  fetch(`https://localhost:7174/api/Programa?id=${selectedProgramIdDelete}`, {
        method: 'DELETE', 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Error al eliminar los datos del desplegable');
      }
      console.log('Datos del desplegable eliminados correctamente.');
      document.getElementById('nombre_programaModalDelete').value = '';
      document.getElementById('activoModalDelete').checked = false;
      document.getElementById('creadoModalDelete').value = '';
      document.getElementById('usuarioModalDelete').value = '';
      showProgramsDelete();
      window.alert("Programa Eliminado Correctamente correctamente.")
      cargarprogramas();
  })
  .catch(error => console.error('Error al eliminar los datos del desplegable:', error));
}

deleteBtn.addEventListener("click", function(event) {
  event.preventDefault(); 
  deleteProgram(); 
});

/// FUNCIONES PARA VERIFICAR EL ROL DE USUARIO 

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

    function handleDelete(event) {
      const token = sessionStorage.getItem('jwtToken')
      const id = event.target.dataset.id;
      console.log('Eliminar clic en id:', id); 
  
     
      if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
          fetch(`https://localhost:7174/api/Programa?id=${id}`, {
            
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
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
              cargarprogramas(); 
          })
          .catch(error => {
              console.error('Error al eliminar el registro:', error);
              alert('Error al eliminar el registro: ' + error.message);
          });
      }
  }

  ////Logout
    document.getElementById('logout').addEventListener('click', function() {
     
      sessionStorage.clear();
      localStorage.clear();
  
      window.location.href = 'index.html';
  });

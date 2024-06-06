document.addEventListener('DOMContentLoaded', function() {
    verificarRolUsuario();
    loadExcepciones();
   });

   
   /// CARGAR EXCEPCIONES NUEVAS
   var addExcepcioForm= document.getElementById("addExcepcionForm")
   var modal = document.getElementById("excepcionModalAdd");
   var btn = document.getElementById("btnAddExcepcion");
   var span = document.getElementById("closemodalAddExcepcion");
   
   btn.onclick = function() {
    modal.style.display = "block";
  }
  
  
  span.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
   addExcepcioForm.addEventListener('submit', function(event) {
    event.preventDefault();
  
  
    var formData = new FormData(addExcepcioForm);
  
   
    var jsonData = {};
    formData.forEach(function(value, key) {     
          jsonData[key] = value;      
      }
    );
    console.log(jsonData);
  
    fetch('https://localhost:7174/api/Excepciones', {
      method: 'POST',
      headers: {
        //'Authorization': `Bearer ${token}`,
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

  /// MODIFICAR EXCEPCIONES
  //var update= document.getElementById("updateExcepcionForm")
  var excepcionDropdown= document.getElementById("excepcionDropdown");
  var modalUpdate = document.getElementById("excepcionModalUpdate");
  var btnUpdate = document.getElementById("btnUpdateExcepcion");
  var spanUpdate = document.getElementById("closemodalUpdateExcepcion");
  var saveChangesBtnUpdateExcepcion=  document.getElementById("saveChangesBtnUpdateExcepcion");
  btnUpdate.onclick = function() {
    modalUpdate.style.display = "block";
    showOsExcepciones();
  }
  
  
  spanUpdate.onclick = function() {
    modalUpdate.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modalUpdate) {
      modalUpdate.style.display = "none";
    }
  }

  function showOsExcepciones() {
    //const token = sessionStorage.getItem('jwtToken')
    excepcionDropdown.innerHTML = '';
    fetch('https://localhost:7174/api/Excepciones',{
      method: 'GET',
      headers: {
        //'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
     
    })
    .then(response => response.json())
    .then(data => {
  
    const desplegable = document.getElementById('excepcionDropdown');
    const opcionEnBlanco = document.createElement('option');
    opcionEnBlanco.value = ''; 
    opcionEnBlanco.textContent = ''; 
    desplegable.appendChild(opcionEnBlanco);
    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.codigo_os; 
      option.textContent = item.codigo_os;
      
      desplegable.appendChild(option); 
    });
  })
  }
  function loadExcepcionData() {
    //const token = sessionStorage.getItem('jwtToken')
      const selectedOS =parseInt( document.getElementById('excepcionDropdown').value);
      fetch(`https://localhost:7174/api/Excepciones/byOs/${selectedOS}`,{
        method: 'GET',
        headers: {
         // 'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
       
      })
          .then(response => response.json())
          .then(data => {
             document.getElementById('idExcepcionUpdate').value = data.id;
              document.getElementById('excepcionUpdateForm').value = data.excepcion;
              document.getElementById('fechaUpdateForm').value = data.fecha;
              document.getElementById('userUpdateForm').value = data.usuario_creacion;
          
             
          })
          .catch(error => console.error('Error al obtener los datos del programa:', error));
  }
  excepcionDropdown.addEventListener('change', function() {
    loadExcepcionData();
  });
  function updateExcepcion() {
    
    const updatedData = {
        id:document.getElementById('idExcepcionUpdate').value,
        codigo_os:document.getElementById('excepcionDropdown').value,
        excepcion:document.getElementById('excepcionUpdateForm').value,
        fecha: document.getElementById('fechaUpdateForm').value,
        usuario_creacion: document.getElementById('userUpdateForm').value
    };
    console.log(updatedData)
    const token = sessionStorage.getItem('jwtToken')
    fetch(`https://localhost:7174/api/Excepciones`, {
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
        document.getElementById('idExcepcionUpdate').value = '';
        document.getElementById('excepcionUpdateForm').value = '';
        document.getElementById('fechaUpdateForm').value = '';
        document.getElementById('userUpdateForm').value = '';
        window.alert("Excepcion actualizada correctamente.")
      modalUpdate.style.display = "none";
       ;
    })
    .catch(error => console.error('Error al actualizar el programa:', error));
  }
  
  saveChangesBtnUpdateExcepcion.addEventListener("click", function(event) {
    event.preventDefault(); 
    updateExcepcion();
    loadExcepciones();
  });

  /// BORRAR EXCEPCIONES
  var excepcionDropdowndelete= document.getElementById("excepcionDropdownDelete");
  var modalDelete = document.getElementById("excepcionModalDelete");
  var btnDelete = document.getElementById("btnDeleteExcepcion");
  var spanDelete = document.getElementById("closemodalDeleteExcepcion");
  var saveChangesBtnDeleteExcepcion=  document.getElementById("saveChangesBtnDeleteExcepcion");
  btnDelete.onclick = function() {
    modalDelete.style.display = "block";
    showOsExcepcionesDelete()
  }
  
  
  spanDelete.onclick = function() {
    modalDelete.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modalDelete) {
      modalDelete.style.display = "none";
    }
  }

  function showOsExcepcionesDelete() {
    //const token = sessionStorage.getItem('jwtToken')
    excepcionDropdowndelete.innerHTML = '';
    fetch('https://localhost:7174/api/Excepciones',{
      method: 'GET',
      headers: {
        //'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
     
    })
    .then(response => response.json())
    .then(data => {
  
    const desplegable = document.getElementById('excepcionDropdownDelete');
    const opcionEnBlanco = document.createElement('option');
    opcionEnBlanco.value = ''; 
    opcionEnBlanco.textContent = ''; 
    desplegable.appendChild(opcionEnBlanco);
    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.codigo_os; 
      option.textContent = item.codigo_os;
      
      desplegable.appendChild(option); 
    });
  })
  }
  function loadExcepcionDataDelete() {
    //const token = sessionStorage.getItem('jwtToken')
      const selectedOS =parseInt( document.getElementById('excepcionDropdownDelete').value);
      fetch(`https://localhost:7174/api/Excepciones/byOs/${selectedOS}`,{
        method: 'GET',
        headers: {
         // 'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
       
      })
          .then(response => response.json())
          .then(data => {
              document.getElementById('idExcepcionDelete').value = data.id;
              document.getElementById('excepcionDeleteForm').value = data.excepcion;
              document.getElementById('fechaDeleteForm').value = data.fecha;
              document.getElementById('userDeleteForm').value = data.usuario_creacion;
          
             
          })
          .catch(error => console.error('Error al obtener los datos del programa:', error));
  }
  excepcionDropdowndelete.addEventListener('change', function() {
    loadExcepcionDataDelete();
  });

  function deleteExcepcion() {
    const token = sessionStorage.getItem('jwtToken')
    const selectedExcepcionIdDelete = document.getElementById('idExcepcionDelete').value;
    console.log(selectedExcepcionIdDelete);
    fetch(`https://localhost:7174/api/Excepciones/${selectedExcepcionIdDelete}`, {
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
        document.getElementById('idExcepcionDelete').value = "";
        document.getElementById('excepcionDeleteForm').value = ""
        document.getElementById('fechaDeleteForm').value = ""
        document.getElementById('userDeleteForm').value = ""
        showOsExcepcionesDelete();
        loadExcepciones();
        window.alert("Programa Eliminado Correctamente correctamente.")
        modalDelete.style.display = "none"
        
    })
    .catch(error => console.error('Error al eliminar los datos del desplegable:', error));
  }
  
  saveChangesBtnDeleteExcepcion.addEventListener("click", function(event) {
    event.preventDefault(); 
    deleteExcepcion(); 
  });

  /// CARGAR EXCEPCIONES EN LA PAGINA PRINCIPAL
  function loadExcepciones() {
    const token = sessionStorage.getItem('jwtToken')
    var url = 'https://localhost:7174/api/Excepciones';
  
      fetch(url,{
        method: 'GET',
        headers: {
          //'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
       
      })
      
          .then(response => response.json())
          .then(data => {
              const tablaBody = document.querySelector('#tablaExcepcion tbody');
              tablaBody.innerHTML = '';
         
              data.forEach(item => {
                  const row = document.createElement('tr');
                  row.innerHTML = `
                      <td>${item.id}</td>
                      <td>${item.codigo_os}</td>
                      <td>${item.excepcion}</td>
                      <td>${item.fecha}</td>
                      <td>${item.usuario_creacion}</td>
                      <td><button class="btn-eliminar" data-id="${item.id}">Eliminar</button></td>
                  `;
                  tablaBody.appendChild(row);
              });
              const tabla = document.querySelector('#tablaExcepcion tbody');
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


 /// FUNCIONES PARA VERIFICAR EL ROL DEL USUARIO
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
     function handleDelete(event) {
      const token = sessionStorage.getItem('jwtToken')
      const id = event.target.dataset.id;
      console.log('Eliminar clic en id:', id); 
  
      if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
          fetch(`https://localhost:7174/api/Excepciones/${id}`, {
            
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
              loadExcepciones(); 
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

document.addEventListener('DOMContentLoaded', function() {
    loadUsers()
    verificarRolUsuario();
   });
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

var modal = document.getElementById("usersModalAdd");
var btn = document.getElementById("btnAddUser");
var span = document.getElementById("closemodalAddUsers");
var form= document.getElementById("addUserForm");
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


  //GUARDAR USUARIO NUEVO
  form.addEventListener('submit', function(event) {
    event.preventDefault();
  
  
    var formData = new FormData(form);
  
   
    var jsonData = {};
    formData.forEach(function(value, key) {        
          jsonData[key] = value;      
    });
    fetch('https://localhost:7174/api/Login/register', {
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
      window.alert("Usuario Agregado Correctamente.")
      modal.style.display = "none";
    });
  });
//Cargar TABLA DE USUARIOS
  function loadUsers() {
    const token = sessionStorage.getItem('jwtToken')
    var url = 'https://localhost:7174/api/Login';
  
      fetch(url,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
       
      })
      
          .then(response => response.json())
          .then(data => {
              const tablaBody = document.querySelector('#tablaUsuarios tbody');
              tablaBody.innerHTML = '';
         
              data.forEach(item => {
                  const row = document.createElement('tr');
                  row.innerHTML = `
                      
                      <td>${item.name}</td>
                      <td>${item.last_name}</td>
                      <td>${item.email}</td>
                      <td>${item.user_name}</td>
                      <td>${item.role}</td>
                      <td><button class="btn-eliminar" data-id="${item.user_name}">Eliminar</button></td>
                  `;
                  tablaBody.appendChild(row);
              });
              const tabla = document.querySelector('#tablaUsuarios tbody');
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
  function handleDelete(event) {
    const id = event.target.dataset.id;
    console.log('Eliminar clic en id:', id); 

  
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
        fetch(`https://localhost:7174/api/Login/${id}`, {
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
            loadUsers(); 
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

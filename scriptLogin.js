

function login() {
  const userName = document.getElementById('userName').value;
  const password = document.getElementById('password').value;


  document.getElementById('btnLogin').disabled = true;



  fetch('https://localhost:7174/api/Login/Login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, password }),
  })
  .then(response => {
    if (response.ok) {
      
      return response.json(); 
    } else if (response.status === 401) {
      
      console.error('Credenciales inválidas');
     
    } else {
      
      console.error('Error en la solicitud:', response.statusText);
      
    }
  })
  .then(data => {
    if (data && data.token) {
      
      sessionStorage.setItem('jwtToken', data.token);
      
      window.location.href = 'inicio.html';
    }
  })
  .catch(error => {
    console.error('Error en la solicitud:', error);
    
  })
  .finally(() => {
    
    document.getElementById('btnLogin').disabled = false;
  });
}



document.addEventListener('DOMContentLoaded', () => {
 
 document.getElementById('btnLogin').addEventListener('click', login); 
});
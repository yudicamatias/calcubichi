
const form = document.getElementById('loginForm');
form.addEventListener('submit', event => {
  event.preventDefault();
login();
const passwordInput = document.getElementById('password');

passwordInput.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    event.stopPropagation();
     passwordInput.focus();
  }
});

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `username=${username}&password=${password}`,
  };

  fetch('login.php', options)
    .then(response => response.text())
    .then(data => {
      if (data.includes('Invalid username or password')) {
        loginError.textContent = data;
        loginError.classList.remove('d-none');
      } else {
        window.location.href = 'admin.html';
      }
    });
}

});
const buttonAuth = document.querySelector('.button-auth');
const buttonOut = document.querySelector('.button-out');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.getElementById('logInForm');
const inputLogin = document.getElementById('login');
const inputPassword = document.getElementById('password');
const userName = document.querySelector('.user-name');

const login = (user) => {
  buttonAuth.style.display = 'none';

  buttonOut.style.display = 'flex';
  userName.style.display = 'flex';
  userName.textContent = user.login;

  modalAuth.style.display = 'none';
};

const logout = () => {
  buttonAuth.style.display = 'flex';

  buttonOut.style.display = 'none';
  userName.style.display = 'none';
  userName.textContent = '';

  localStorage.removeItem('user');
};


buttonAuth.addEventListener('click', () => {
  modalAuth.style.display = 'flex';
});

closeAuth.addEventListener('click', () => {
  modalAuth.style.display = 'none';
});

buttonOut.addEventListener('click', () => {
  logout();
});

logInForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = {
    login: inputLogin.value,
    password: inputPassword.value,
  }

  // if (!(user.login || user.password)) {

  //   inputLogin.style.borderColor = 'red';
  //   inputLogin.placeholder = 'Enter login';
  //   return;
  // }

  localStorage.setItem('user', JSON.stringify(user));
  login(user);
});

if (localStorage.getItem('user')) {
  login(JSON.parse(localStorage.getItem('user')));
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    modalAuth.style.display = 'none';
  }
})
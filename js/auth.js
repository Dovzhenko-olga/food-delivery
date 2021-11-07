const buttonAuth = document.querySelector('.button-auth');
const buttonOut = document.querySelector('.button-out');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.getElementById('logInForm');
const inputLogin = document.getElementById('login');
const inputPassword = document.getElementById('password');
const userName = document.querySelector('.user-name');

const loginValidate = login => {
  if (/^[a-zA-Z1-9]+$/.test(login) === false) {
    errorSetting.text = 'Login must contain latin letters and numbers!';
    new PNotify(errorSetting);
    return false;
  }
  if (login.length < 4 || login.length > 20) {
    errorSetting.text = 'Login must be between 4 and 20 characters!';
    new PNotify(errorSetting);
    return false;
  }
  if (parseInt(login.substr(0, 1))) {
    errorSetting.text = 'Login must start with a letter!';
    new PNotify(errorSetting);
    return false;
  }
  return true;
}

const login = (user) => {
  buttonAuth.style.display = 'none';

  buttonOut.style.display = 'flex';
  userName.style.display = 'flex';
  userName.textContent = user.login;

  modalAuth.style.display = 'none';

  loginValidate(user.login);
};

const logout = () => {
  buttonAuth.style.display = 'flex';

  buttonOut.style.display = 'none';
  userName.style.display = 'none';
  userName.textContent = '';

  localStorage.removeItem('user');
  window.location.href = 'index.html';
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

  if (user.login.trim() === '' || user.password.trim() === '') {

    new PNotify(errorSetting);
    return;
  }

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

let errorSetting = {
  text: 'Enter login and password!',
  shadow: true,
  delay: 2000,
};
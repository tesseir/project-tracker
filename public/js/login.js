const loginFormHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Username or password is incorrect!',
      });
    }
  }
};
// -------------------------sign up works fine
const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log('clicked');

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const confirmPassword = document
    .querySelector('#confirm-password-signup')
    .value.trim();

  console.log(username, password, confirmPassword);

  // Using regex to check if username not empty or contains whitespaces
  const usernameRegex = /^\S*$/;

  if (!username || !usernameRegex.test(username)) {
    Swal.fire({
      icon: 'error',
      title: 'Username cannot empty or contain spaces!',
    });
    return;
  }

  // Using regex to check if password is at least 8 characters long and contains at least one number, one lowercase and one uppercase letter
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (password !== confirmPassword) {
    Swal.fire({
      icon: 'error',
      title: 'Passwords do not match!',
      text: 'Please try again',
    });
    return;
  }

  if (!passwordRegex.test(password)) {
    Swal.fire({
      icon: 'error',
      title: 'Password is not strong enough!',
      text: 'Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter',
    });
    return;
  }

  // console.log(password);
  // console.log(username);

  if (username && password) {
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('problem signing up');
    }
  }
};
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

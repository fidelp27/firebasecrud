const loggedOut = document.querySelectorAll('.loggedout');
const loggedIn = document.querySelectorAll('.loggedin');

export const loginCheck = (user) => {
  if (user) {
    loggedOut.forEach((elem) => {
      elem.style.display = 'none';
    });
    loggedIn.forEach((elem) => {
      elem.style.display = 'block';
    });
  } else {
    loggedIn.forEach((elem) => {
      elem.style.display = 'none';
    });
    loggedOut.forEach((elem) => {
      elem.style.display = 'block';
    });
  }
};

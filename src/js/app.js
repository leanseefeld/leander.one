import '../style/master.scss';

const openMenuClass = 'open';

let sideMenuEl = document.querySelector('.side-menu'),
  menuToggleEl = document.querySelector('.menu-button');

menuToggleEl.onclick = function toggleMenu() {
  let classes = sideMenuEl.className;
  let toggleIndex = classes.indexOf(openMenuClass);
  if (toggleIndex >= 0) {
    sideMenuEl.className = classes.replace(openMenuClass, '');
  } else {
    sideMenuEl.className = classes + ' ' + openMenuClass;
  }
};

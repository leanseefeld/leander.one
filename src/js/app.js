'use strict';

import '../style/master.scss';
import LsUtils from './utils';

(function() {

  let sideMenuEl = document.querySelector('.side-menu'),
    menuToggleEl = document.querySelector('.menu-button');

  function toggleMenu(state) {
    LsUtils.toggleClass(sideMenuEl, 'open');
  };

  function linkMenuItems() {
    let menuEntries = sideMenuEl.querySelectorAll('a');
    menuEntries.forEach(el => {
      let ref = el.attributes['href'].value;
      let referredSection = document.querySelector('.content ' + ref);
      if (referredSection) {
        el.onclick = () => toggleMenu(false);
      }
    });
  };

  menuToggleEl.onclick = () => toggleMenu();

  function findMenuEntryForSection(sectionId) {
    return sideMenuEl.querySelector('[href*="#' + sectionId + '"]');
  };

  let previousActiveSection, previousMenuEntry;
  let contentEl = document.querySelector('.content');
  previousMenuEntry = findMenuEntryForSection('intro');
  contentEl.onscroll = function onScroll() {
    let element = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 4);
    // TODO: seek upwards in the tree

    while (element && element.tagName !== 'ARTICLE' && element !== contentEl) {
      element = element.parentElement;
    }

    if (element && element !== previousActiveSection && element !== contentEl) {
      let id = element.id;
      let menuEntry = findMenuEntryForSection(id);
      if (menuEntry) {
        if (previousMenuEntry) {
          previousMenuEntry.className = previousMenuEntry.className.replace('active', '');
        }
        menuEntry.className = menuEntry.className + ' active';
        previousMenuEntry = menuEntry;
      }
      previousActiveSection = element;
    }
  };

  linkMenuItems();
})();

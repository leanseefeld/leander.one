'use strict';

export default class LsUtils {

  static isDefined(value) {
    return value !== void 0;
  }

  static addClass(element, clazz) {
    element.className += ' ' + clazz;
  }

  static removeClass(element, clazz) {
    let classes = element.className.split(/\s+/);
    let i = classes.indexOf(clazz);
    if (i > -1) {
      classes.splice(i, 1);
    }
    element.className = classes.join(' ');
  }

  static containsClass(element, clazz) {
    return element.className.split(/\s+/).indexOf(clazz) > -1;
  }

  static toggleClass(element, clazz, include) {
    let add = LsUtils.isDefined(include) ? include : !LsUtils.containsClass(element, clazz);
    if (add) {
      LsUtils.addClass(element, clazz);
    } else {
      LsUtils.removeClass(element, clazz);
    }
    return add;
  }

}

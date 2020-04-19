import constants from './constants';

/**
 * Método que sirve para convertir el slug de un personaje en texto legible.
 *
 * @param {*} slug Slug de un personaje
 *
 * @author jualoppaz
 */
function slugToText(slug) {
  return slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

/**
 * Método que sirve para convertir el slug de un capítulo en texto legible.
 *
 * @param {*} slug Slug de un personaje
 *
 * @author jualoppaz
 */
function chapterSlugToText(slug) {
  return slug.split('-')[0];
}

/**
 * Método que sirve para saber si nos encontramos en un dispositivo móbil.
 *
 * @author jualoppaz
 */
function isMobile() {
  return window.innerWidth < constants.DEVICES.TABLET.MIN_WIDTH;
}


/**
 * Método que sirve para saber si nos encontramos en una tablet.
 *
 * @author jualoppaz
 */
function isTablet() {
  return window.innerWidth >= constants.DEVICES.TABLET.MIN_WIDTH
    && window.innerWidth < constants.DEVICES.DESKTOP.MIN_WIDTH;
}


/**
 * Método que sirve para saber si nos encontramos en un dispositivo de escritorio.
 *
 * @author jualoppaz
 */
function isDesktop() {
  return window.innerWidth >= constants.DEVICES.DESKTOP.MIN_WIDTH;
}

export default {
  slugToText,
  chapterSlugToText,
  isMobile,
  isTablet,
  isDesktop,
};

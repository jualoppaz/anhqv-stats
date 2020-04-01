import constants from './constants';

function slugToText(slug) {
  return slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function isMobile() {
  return window.innerWidth < constants.DEVICES.TABLET.MIN_WIDTH;
}

function isTablet() {
  return window.innerWidth >= constants.DEVICES.TABLET.MIN_WIDTH
    && window.innerWidth < constants.DEVICES.DESKTOP.MIN_WIDTH;
}

function isDesktop() {
  return window.innerWidth >= constants.DEVICES.DESKTOP.MIN_WIDTH;
}

export default {
  slugToText,
  isMobile,
  isTablet,
  isDesktop,
};

import utils from '../../../src/utils';

const initialWidth = window.innerWidth;

describe('utils/funcs', () => {
  afterAll(() => {
    window.innerWidth = initialWidth;
  });

  describe('slugToText', () => {
    it('it should return a natural text', () => {
      const slug = 'juan-cuesta';
      const text = utils.slugToText(slug);
      expect(text).toBe('Juan Cuesta');
    });
  });

  describe('isMobile', () => {
    it('it should return true', () => {
      window.innerWidth = 555;

      const isMobile = utils.isMobile();
      expect(isMobile).toBeTruthy();
    });

    it('it should return false', () => {
      window.innerWidth = 790;

      const isMobile = utils.isMobile();
      expect(isMobile).toBeFalsy();
    });
  });

  describe('isTablet', () => {
    it('it should return true', () => {
      window.innerWidth = 800;

      const isTablet = utils.isTablet();
      expect(isTablet).toBeTruthy();
    });

    it('it should return false', () => {
      window.innerWidth = 700;

      let isTablet = utils.isTablet();
      expect(isTablet).toBeFalsy();

      window.innerWidth = 1000;

      isTablet = utils.isTablet();
      expect(isTablet).toBeFalsy();
    });
  });

  describe('isDesktop', () => {
    it('it should return true', () => {
      window.innerWidth = 1000;

      const isDesktop = utils.isDesktop();
      expect(isDesktop).toBeTruthy();
    });

    it('it should return false', () => {
      window.innerWidth = 990;

      const isDesktop = utils.isDesktop();
      expect(isDesktop).toBeFalsy();
    });
  });
});

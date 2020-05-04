import utils from '../../../utils';

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

  describe('chapterSlugToText', () => {
    it('it should return a natural text', () => {
      const slug = '1x01-erase-una-mudanza';
      const text = utils.chapterSlugToText(slug);
      expect(text).toBe('1x01');
    });
  });

  describe('getCommonMetas', () => {
    it('it should return all common metas', () => {
      const seoConfig = {
        title: 'Page title',
        description: 'Page description',
        canonical_url: 'Page canonical url',
        og_title: 'OpenGraph title',
        og_type: 'OpenGraph type',
        og_image: 'OpenGraph image',
        og_url: 'OpenGraph url',
        og_description: 'OpenGraph description',
        twitter_site: 'Twitter site',
        twitter_card: 'Twitter card',
      };

      const expectedData = {
        link: [
          {
            href: 'Page canonical url',
            rel: 'canonical',
          },
        ],
        meta: [
          {
            content: 'Page description',
            hid: 'description',
            name: 'description',
          }, {
            content: 'OpenGraph title',
            hid: 'og:title',
            property: 'og:title',
          }, {
            content: 'OpenGraph type',
            hid: 'og:type',
            property: 'og:type',
          }, {
            content: 'OpenGraph image',
            hid: 'og:image',
            property: 'og:image',
          }, {
            content: 'OpenGraph url',
            hid: 'og:url',
            property: 'og:url',
          }, {
            content: 'OpenGraph description',
            hid: 'og:description',
            property: 'og:description',
          }, {
            content: 'Twitter site',
            hid: 'twitter:site',
            name: 'twitter:site',
          }, {
            content: 'Twitter card',
            hid: 'twitter:card',
            name: 'twitter:card',
          },
        ],
        title: 'Page title',
      };

      expect(utils.getCommonMetas(seoConfig)).toEqual(expectedData);
    });
  });
});

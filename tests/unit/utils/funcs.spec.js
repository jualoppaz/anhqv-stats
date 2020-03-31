import utils from '../../../src/utils';

describe('slugToText', () => {
  it('it should return a natural text', () => {
    const slug = 'juan-cuesta';
    const text = utils.slugToText(slug);
    expect(text).toBe('Juan Cuesta');
  });
});

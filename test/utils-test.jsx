import TestUtils from 'react-dom/test-utils';
import * as utils from '../src/lib/utils';

describe('Utilities', () => {
  describe('#markdownify', () => {
    it('renders markdown', () => {
      const md = utils.markdownify({ input: '# test header' });
      expect(md).to.equal('<h1 id="test-header" tabindex="-1">test header</h1>\n');
    });

    it('opens links in a new tab when prefixed by +tab+', () => {
      const md = utils.markdownify({ input: '[A link](+tab+http://www.google.com)' });
      expect(md).to.equal('<p><a href="http://www.google.com" target="_blank" rel="noopener nofollow noreferrer">A link</a></p>\n');
    });
  });

  describe('#getHtml', () => {
    const errorTransform = () => {
      throw new Error('fail');
    };

    it('returns the formatted html', () => {
      let html = utils.getHtml({ content: 'Test text' });
      expect(html).to.equal('<p>Test text</p>\n');
    });

    it('renders bare child content on error', () => {
      const html = utils.getHtml({ content: 'Test text', transform: errorTransform });
      expect(html).to.equal('Test text');
    });

    it('uses relNofollow when passed as a prop', () => {
      expect(utils.getHtml({ content: '[Test](link)', relNoFollow: true })).to.equal('<p><a rel="nofollow noreferrer" href="link">Test</a></p>\n');
    });

    it('doesn\'t use relNofollow when not passed as a prop', () => {
      expect(utils.getHtml({ content: '[Test](link)' })).to.equal('<p><a href="link">Test</a></p>\n');
    });
  });
});

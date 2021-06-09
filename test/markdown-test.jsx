import TestUtils from 'react-dom/test-utils';
import { Markdown } from '../src/index';

describe('Markdown', () => {
  let markdown;

  beforeEach(() => {
    markdown = TestUtils.renderIntoDocument(<Markdown />);
  });

  it('exists', () => {
    expect(Markdown).to.be.ok;
  });

  it('#getDefaultProps', () => {
    expect(Markdown.defaultProps).to.deep.equal({
      tag: 'div',
      content: '',
      inline: false,
      baseURI: null,
      project: null,
      relNofollow: false,
      transform: Markdown.defaultProps.transform,
      className: '',
      idPrefix: null
    });
  });

  describe('#markdownify', () => {
    it('renders markdown', () => {
      const md = markdown.markdownify('# test header');
      expect(md).to.equal('<h1 id="test-header">test header</h1>\n');
    });

    it('opens links in a new tab when prefixed by +tab+', () => {
      const md = markdown.markdownify('[A link](+tab+http://www.google.com)');
      expect(md).to.equal('<p><a href="http://www.google.com" target="_blank" rel="noopener nofollow noreferrer">A link</a></p>\n');
    });
  });

  describe('#getHtml', () => {
    const errorTransform = () => {
      throw new Error('fail');
    };

    it('returns the formatted html', () => {
      let md = TestUtils.renderIntoDocument(React.createElement(Markdown, { className: 'MyComponent' }, 'Test text'));

      let html = md.getHtml();
      expect(html).to.equal('<p>Test text</p>\n');
    });

    it('renders bare child content on error', () => {
      const md = TestUtils.renderIntoDocument(React.createElement(Markdown, { className: 'MyComponent', transform: errorTransform }, 'Test text'));
      const html = md.getHtml();
      expect(html).to.equal('Test text');
    });
  });

  describe('#renderer', () => {
    it('uses relNofollow when passed as a prop', () => {
      const md = TestUtils.renderIntoDocument(React.createElement(Markdown, { className: 'MyComponent', relNofollow: true }, '[Test](link)'));
      expect(md.getHtml()).to.equal('<p><a href="link" rel="nofollow noreferrer">Test</a></p>\n');
    });

    it('doesn\'t use relNofollow when not passed as a prop', () => {
      const md = TestUtils.renderIntoDocument(React.createElement(Markdown, { className: 'MyComponent', relNofollow: false }, '[Test](link)'));
      expect(md.getHtml()).to.equal('<p><a href="link">Test</a></p>\n');
    });
  });

  describe('#render', () => {
    let editor;
    let md;

    before(() => {
      editor = React.createElement(Markdown, {
        className: 'MyComponent',
        tag: 'div',
        transform: ((html) => html.replace('foo', 'bar'))
      }, 'Test children foo');

      md = TestUtils.renderIntoDocument(editor);
    });

    it('renders', () => {
      const markdownDiv = TestUtils.findRenderedDOMComponentWithTag(md, 'div');
      expect(markdownDiv.innerHTML).to.equal('<p>Test children bar</p>\n');
    });

    it('calls getHtml in render', () => {
      const getHtmlSpy = spy.on(md, 'getHtml');
      md.render();
      expect(getHtmlSpy).to.have.been.called();
    });

    it('returns a react component, with customizable tag', () => {
      const ed = React.createElement(Markdown, { className: 'PMarkdown', tag: 'p' }, 'Test p tag');
      const mdEditor = TestUtils.renderIntoDocument(ed);
      const renderValue = mdEditor.render();
      expect(renderValue.type).to.equal('p');
    });
  });
});

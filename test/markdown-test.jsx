import { createElement } from 'react';
import TestUtils from 'react-dom/test-utils';
import { Markdown } from '../src/index';
import * as utils from '../src/lib/utils';

describe('Markdown', () => {
  let markdown;

  beforeEach(() => {
    markdown = TestUtils.renderIntoDocument(<Markdown />);
  });

  it('exists', () => {
    expect(markdown).to.be.ok;
  });

  it('#getDefaultProps', () => {
    expect(Markdown.defaultProps).to.deep.equal({
      tag: 'div',
      content: '',
      debug: false,
      inline: false,
      baseURI: null,
      project: null,
      relNofollow: false,
      className: '',
      idPrefix: null
    });
  });

  describe('#render', () => {
    let editor;
    let md;

    before(() => {
      editor = createElement(Markdown, {
        className: 'MyComponent',
        tag: 'div',
        transform: (html => html.replace('foo', 'bar'))
      }, 'Test children foo');

      md = TestUtils.renderIntoDocument(editor);
    });

    it('renders', () => {
      const markdownDiv = TestUtils.findRenderedDOMComponentWithTag(md, 'div');
      expect(markdownDiv.innerHTML).to.equal('<p>Test children bar</p>\n');
    });

    it('calls getHtml in render', () => {
      const getHtmlSpy = spy.on(utils, 'getHtml');
      md.render();
      expect(getHtmlSpy).to.have.been.called();
    });

    it('returns a react component, with customizable tag', () => {
      const ed = createElement(Markdown, { className: 'PMarkdown', tag: 'p' }, 'Test p tag');
      const mdEditor = TestUtils.renderIntoDocument(ed);
      const renderValue = mdEditor.render();
      expect(renderValue.type).to.equal('p');
    });
  });
});

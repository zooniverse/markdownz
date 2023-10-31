import { createElement, PureComponent } from 'react';
import TestUtils from 'react-dom/test-utils';
import { Markdown } from '../src/index';

describe('Markdown', () => {
  class TestWrapper extends PureComponent {
    render() {
      return <Markdown {...this.props} />;
    }
  }
  let markdown;

  beforeEach(() => {
    markdown = TestUtils.renderIntoDocument(<TestWrapper />);
  });

  it('exists', () => {
    expect(markdown).to.be.ok;
  });

  describe('#render', () => {
    let editor;
    let md;

    before(() => {
      editor = createElement(TestWrapper, {
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

    it('returns a react component, with customizable tag', () => {
      const ed = createElement(TestWrapper, { className: 'PMarkdown', tag: 'p', inline: true }, 'Test p tag');
      const mdEditor = TestUtils.renderIntoDocument(ed);
      const renderValue = mdEditor.render();
      expect(renderValue.type).to.equal(Markdown);
      const markdownP = TestUtils.findRenderedDOMComponentWithTag(mdEditor, 'p');
      expect(markdownP.getAttribute('class')).to.equal('markdown PMarkdown');
      expect(markdownP.innerHTML).to.equal('Test p tag');
    });
  });
});

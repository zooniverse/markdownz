import { PureComponent } from 'react';
import TestUtils from 'react-dom/test-utils';

import useMarkdownz from '../src/hooks/use-markdownz';

function MarkdownStub({ children, ...props }) {
  const html = useMarkdownz({ content: children, ...props });
  return (
    <div className="testStub">
      {html}
    </div>
  );
}

class TestComponent extends PureComponent {
  render() {
    return <MarkdownStub {...this.props} />;
  }
}

describe('useMarkdownz', () => {
  const errorTransform = () => {
    throw new Error('fail');
  };

  it('returns the formatted html', () => {
    const md = TestUtils.renderIntoDocument(
      <TestComponent>
        Test text
      </TestComponent>
    );
    const markdownDiv = TestUtils.findRenderedDOMComponentWithTag(md, 'div');
    expect(markdownDiv.innerHTML).to.equal('<p>Test text</p>\n');
  });

  it('renders bare child content on error', () => {
    const md = TestUtils.renderIntoDocument(
      <TestComponent transform={errorTransform}>
        Test text
      </TestComponent>
    );
    const markdownDiv = TestUtils.findRenderedDOMComponentWithTag(md, 'div');
    expect(markdownDiv.innerHTML).to.equal('Test text');
  });

  it('uses relNofollow when passed as a prop', () => {
    const md = TestUtils.renderIntoDocument(
      <TestComponent relNoFollow>
        [Test](link)
      </TestComponent>
    );
    const markdownDiv = TestUtils.findRenderedDOMComponentWithTag(md, 'div');
    expect(markdownDiv.innerHTML).to.equal('<p><a rel="nofollow noreferrer" href="link">Test</a></p>\n');
  });

  it('doesn\'t use relNofollow when not passed as a prop', () => {
    const md = TestUtils.renderIntoDocument(
      <TestComponent>
        [Test](link)
      </TestComponent>
    );
    const markdownDiv = TestUtils.findRenderedDOMComponentWithTag(md, 'div');
    expect(markdownDiv.innerHTML).to.equal('<p><a href="link">Test</a></p>\n');
  });

  it('opens +tab+ links in a new tab', function () {
    const md = TestUtils.renderIntoDocument(
      <TestComponent inline>
        [Test](+tab+https://www.example.com)
      </TestComponent>
    );
    const markdownDiv = TestUtils.findRenderedDOMComponentWithTag(md, 'div');
    expect(markdownDiv.innerHTML).to.equal('<a rel="noopener nofollow noreferrer" target="_blank" href="https://www.example.com">Test</a>');
  });

  it('embeds YoutTube videos with modified image syntax', function () {
    const md = TestUtils.renderIntoDocument(
      <TestComponent inline>
        @[youtube](dQw4w9WgXcQ)
      </TestComponent>
    );
    const markdownDiv = TestUtils.findRenderedDOMComponentWithClass(md, 'testStub');
    expect(markdownDiv.innerHTML).to.equal('<div class="embed-responsive embed-responsive-16by9"><iframe allowfullscreen="" src="https://www.youtube.com/embed/dQw4w9WgXcQ" height="390" width="640" type="text/html" class="embed-responsive-item youtube-player"></iframe></div>');
  });
});

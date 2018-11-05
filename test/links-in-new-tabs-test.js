import linksTransform from '../src/lib/links-in-new-tabs';

describe('links-in-new-tabs', () => {
  let mdIt;

  beforeEach(() => {
    mdIt = new MarkdownIt({ linkify: true, breaks: true }).use(linksTransform);
  });

  it('opens links prefixed with +tab+ in a _blank target by default', () => {
    const md = mdIt.renderInline('[Test](+tab+https://www.example.com)');
    expect(md).to.equal('<a href="https://www.example.com" target="_blank" ref="noopener nofollow">Test</a>');
  });

  it('renders normal links without a new tab prefix', () => {
    const md = mdIt.renderInline('[Test](https://www.example.com)');
    expect(md).to.equal('<a href="https://www.example.com">Test</a>');
  });

  it('accepts a customizable prefix', () => {
    mdIt = new MarkdownIt({
      linkify: true,
      breaks: true
    }).use(linksTransform, {
      prefix: '=newtab='
    });

    const md = mdIt.renderInline('[Test](=newtab=https://www.example.com)');
    expect(md).to.equal('<a href="https://www.example.com" target="_blank" ref="noopener nofollow">Test</a>');
  });
});

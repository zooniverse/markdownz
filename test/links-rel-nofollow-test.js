import relNofollow from '../src/lib/links-rel-nofollow';

describe('links-rel-nofollow', () => {
  let mdIt;

  beforeEach(() => {
    mdIt = new MarkdownIt({ linkify: true, breaks: true }).use(relNofollow);
  });

  it('adds rel=nofollow noreferrer to links', () => {
    const md = mdIt.renderInline('[Example Link](http://www.example.org)');
    expect(md).to.equal('<a href="http://www.example.org" rel="nofollow noreferrer">Example Link</a>');
  });

  it('does not add a rel=nofollow attr to zooniverse.org links', () => {
    const md = mdIt.renderInline('[Talk Link](http://www.zooniverse.org/talk)');
    expect(md).to.equal('<a href="http://www.zooniverse.org/talk">Talk Link</a>');
  });
});

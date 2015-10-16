import linksInNewTabs from '../../src/lib/links-in-new-tabs';
import MarkdownIt from 'markdown-it'
import chai from 'chai';
import spies from 'chai-spies';
chai.use(spies);
let {expect, spy} = chai;

describe('links-in-new-tabs', () => {
    var mdIt;

    beforeEach(() => {
        mdIt = new MarkdownIt({linkify: true, breaks: true})
            .use(linksInNewTabs)
    });

    it('opens links prefixed with +tab+ in a _blank target by default', () => {
        const md = mdIt.renderInline('[Test](+tab+http://www.example.com)');
        expect(md).to.equal('<a href="http://www.example.com" target="_blank" rel="nofollow">Test</a>');
    });

    it('renders normal links without a new tab prefix', () => {
        const md = mdIt.renderInline('[Test](http://www.example.com)');
        expect(md).to.equal('<a href="http://www.example.com" rel="nofollow">Test</a>');
    });

    it('accepts a customizable prefix', () => {
        mdIt = new MarkdownIt({linkify: true, breaks: true})
            .use(linksInNewTabs, {prefix: '=newtab='})

        const md = mdIt.renderInline('[Test](=newtab=http://www.example.com)');
        expect(md).to.equal('<a href="http://www.example.com" target="_blank" rel="nofollow">Test</a>');
    });

    it('does not add a rel=nofollow attr to zooniverse.org links', () => {
        const md = mdIt.renderInline('[Talk Link](http://www.zooniverse.org/talk)');

        expect(md).to.equal('<a href="http://www.zooniverse.org/talk">Talk Link</a>');
        
    })

});

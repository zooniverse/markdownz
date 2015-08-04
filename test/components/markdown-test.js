import dom from "../test-setup";
import Markdown from "../../src/components/markdown";
import React, {addons} from 'react/addons';
const TestUtils = addons.TestUtils;

import chai from 'chai';
import spies from 'chai-spies';
chai.use(spies);
let {expect, spy} = chai;

describe('Markdown', () => {
    var markdown;

    beforeEach(() => {
        markdown = new Markdown();
    });

    it('exists', () => {
        expect(Markdown).to.be.ok;
    });

    it('#getDefaultProps', () => {
        var defaultProps = (Markdown.defaultProps);
        expect(Markdown.defaultProps).to.deep.equal({
            tag: 'div',
            content: '',
            inline: false,
            className: ''
        });
    });

    describe('#replaceSymbols', () => {
        it('replaces #hashtags with hashtag links', () => {
            var tagLink = markdown.replaceSymbols('#test');
            expect(tagLink).to.equal("<a href='#/talk/search?query=test'>#test</a>");
        });

        it('replaces ^subject mentions with subject links', () =>{
            markdown.getParams = () => {
                return {
                    owner: 'test',
                    name: 'project'
                };
            };

            var subjectLink = markdown.replaceSymbols('^123456');
            expect(subjectLink).to.equal("<a href='#/projects/test/project/talk/subjects/123456'>test/project - Subject 123456</a>");
        });

        it('does not format subject Ids when not in a routed context', () =>{
            markdown.getParams = Function.prototype;

            var subjectLink = markdown.replaceSymbols('^123456');
            expect(subjectLink).to.equal("123456");
        });

        it('replaces @ownerslug/project-slug^subject_id mentions with links', () => {
            var projectSubjectLink = markdown.replaceSymbols('@owner/project-d^123456');

            expect(projectSubjectLink).to.equal("<a href='#/projects/owner/project-d/talk/subjects/123456'>owner/project-d - Subject 123456</a>");
        });
    });

    describe('#markdownify', () => {
        it('renders markdown', () => {
            var md = markdown.markdownify('# test header');
            expect(md).to.equal('<h1>test header</h1>\n');
        });
    });

    describe('#getHtml', () =>{
        var md = TestUtils.renderIntoDocument(React.createElement(Markdown, { className: 'MyComponent'}, 'Test text'));

        it('returns the formatted html', () => {
            let html = md.getHtml()
            expect(html).to.equal('<p>Test text</p>\n')
        })

        it('renders bare child content on error', () => {
            md.replaceSymbols = () => {
                throw new Error("fail")
            }
            let html = md.getHtml()
            expect(html).to.equal('Test text')
        })
    })

    describe('#render', () => {
        var editor, md
        before(() => {
            editor = React.createElement(Markdown, { className: 'MyComponent', tag: 'div'}, 'Test children')
            md = TestUtils.renderIntoDocument(editor);
        })

        it('renders', () => {
            var markdownDiv = TestUtils.findRenderedDOMComponentWithTag(md, 'div');
            expect(markdownDiv.props.dangerouslySetInnerHTML.__html).to.equal('<p>Test children</p>\n');
        });

        it('calls getHtml in render', () => {
            let replaceSymbolsSpy = spy.on(md, 'getHtml')
            md.render()
            expect(replaceSymbolsSpy).to.have.been.called()
        });

        it('returns a react component, with customizable tag', () =>{
            var editor = React.createElement(Markdown, {className: 'PMarkdown', tag: 'p'}, 'Test p tag')
            var md = TestUtils.renderIntoDocument(editor);

            let renderValue = md.render()
            expect(renderValue.type).to.equal('p')
        })
    });
});

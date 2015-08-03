import Markdown from "../../src/components/markdown"
import {expect} from "chai"

describe('Markdown', () => {
    var markdown;

    beforeEach(() => {
        markdown = new Markdown()
    })

    it('exists', () => {
        expect(Markdown).to.be.ok;
    });

    it('#getDefaultProps', () => {
        var defaultProps = (markdown.defaultProps)
        expect(defaultProps).to.deep.equal({
            tag: 'div',
            content: '',
            inline: false,
            className: ''
        })
    });

    describe('#replaceSymbols', () => {
        it('replaces #hashtags with hashtag links', () => {
            var tagLink = markdown.replaceSymbols('#test');
            expect(tagLink).to.equal("<a href='#/talk/search?query=test'>#test</a>");
        })

        it('replaces ^subject mentions with subject links', () =>{
            markdown.getParams = () => {
                return {
                    owner: 'test',
                    name: 'project'
                }
            }

            var subjectLink = markdown.replaceSymbols('^123456');
            expect(subjectLink).to.equal("<a href='#/projects/test/project/talk/subjects/123456'>test/project - Subject 123456</a>")
        })

        it('does not format subject Ids when not in a routed context', () =>{
            markdown.getParams = Function.prototype

            var subjectLink = markdown.replaceSymbols('^123456');
            expect(subjectLink).to.equal("123456")
        })

        it('replaces @ownerslug/project-slug^subject_id mentions with links', () => {
            var projectSubjectLink = markdown.replaceSymbols('@owner/project-d^123456');

            expect(projectSubjectLink).to.equal("<a href='#/projects/owner/project-d/talk/subjects/123456'>owner/project-d - Subject 123456</a>")
        })
    })

    describe('#markdownify', () => {
        it('renders markdown', () => {
            var md = markdown.markdownify('# test header');
            expect(md).to.equal('<h1>test header</h1>\n'); 
        })
    })
});

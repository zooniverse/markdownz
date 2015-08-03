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
        var defaultProps = (markdown.getDefaultProps())
        expect(defaultProps).to.deep.equal({
            tag: 'div',
            content: '',
            inline: false,
            className: ''
        })
    });

    describe('#replaceSymbols', () => {
        it('replaces #hashtags with hashtag links', function(){
            var tagLink = markdown.replaceSymbols('#test');
            expect(tagLink).to.equal("<a href='#/talk/search?query=test'>#test</a>");
        })

        it('replaces ^subject mentions with subject links', function(){
            markdown.getParams = () => {
                return {
                    owner: 'test',
                    name: 'project'
                }
            }

            var subjectLink = markdown.replaceSymbols('^123456');
            expect(subjectLink).to.equal("<a href='#/projects/test/project/talk/subjects/123456'>test/project - Subject 123456</a>")
        })

        it('does not format subject Ids when not in a routed context', function(){
            markdown.getParams = Function.prototype

            var subjectLink = markdown.replaceSymbols('^123456');
            expect(subjectLink).to.equal("123456")
        })
    })
});

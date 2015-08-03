import Markdown from "../../src/components/markdown"
import {expect} from "chai"

describe('Markdown', function() {
    var markdown = new Markdown()

    it('exists', function () {
        expect(Markdown).to.be.ok;
    });

    it('#getDefaultProps', function(){
        var defaultProps = (markdown.getDefaultProps())
        expect(defaultProps).to.deep.equal({
            tag: 'div',
            content: '',
            inline: false,
            className: ''
        })
    })
});



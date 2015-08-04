import MarkdownEditor from '../../src/components/markdown-editor.js';
import chai from 'chai';
import spies from 'chai-spies';
chai.use(spies);
let {expect, spy} = chai;

describe('MarkdownEditor', () => {
    var editor;

    beforeEach(() => {
        editor = new MarkdownEditor({name: 'test', onChange: Function.prototype});
    });

    it('exists', () => {
        expect(editor).to.be.ok;
    });

    it('::initialState', () => {
        expect(MarkdownEditor.initialState).to.deep.equal({previewing: false});
    });

    describe('#onInputChange', () => {
        it('calls the props.onChange callback', () => {
            let changeSpy = spy.on(editor.props, 'onChange')
            editor.onInputChange({target: {value: 'testVal'}})
            expect(changeSpy).to.have.been.called();
        })
    })
});

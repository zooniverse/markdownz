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

    describe('::initialState', () => {
        it("should set previewing to false", () => {
            expect(MarkdownEditor.initialState).to.deep.equal({previewing: false});
        });
    });

    describe("#wrapSelectionIn", () => {
        var wrapFnSpy;

        beforeEach(() => {
            wrapFnSpy = spy((text) => { return {text: `*${text}*`, cursor: {start: 0, end: 5}}; });
            editor.refs =
                {
                    textarea: {
                        getDOMNode: () => {
                            return {
                                value: "A long boring string that doesn't mean anything",
                                selectionStart: 2,
                                selectionEnd: 10
                            };
                        }
                    }
                };
        });

        it("should apply a function to the selected text", () => {
            editor.wrapLinesIn(wrapFnSpy);
            expect(wrapFnSpy).to.have.been.called();
        });

        it("should trigger the onChange handler", () => {
            var onChangeSpy = spy(editor, 'onInputChange');
            editor.wrapLinesIn(wrapFnSpy);
            expect(onChangeSpy).to.have.been.called();
        });
    });

    describe('#onInputChange', () => {
        it('calls the props.onChange callback', () => {
            let changeSpy = spy.on(editor.props, 'onChange')
            editor.onInputChange({target: {value: 'testVal'}})
            expect(changeSpy).to.have.been.called();
        })
    })
});

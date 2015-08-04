import MarkdownEditor from '../../src/components/markdown-editor.js';
import chai from 'chai';
import spies from 'chai-spies';
chai.use(spies);
let {expect, spy} = chai;

describe('MarkdownEditor', () => {
    var editor;

    beforeEach(() => {
        editor = new MarkdownEditor();
    });

    it('exists', () => {
        expect(editor).to.be.ok;
    });

    it('::initialState', () => {
        expect(MarkdownEditor.initialState).to.deep.equal({previewing: false});
    });
});

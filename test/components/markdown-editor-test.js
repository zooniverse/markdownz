import dom from '../test-setup';

import MarkdownEditor from '../../src/components/markdown-editor.js';
import React, {addons} from 'react';

import chai from 'chai';
import spies from 'chai-spies';
chai.use(spies);
let {expect, spy} = chai;

let mockTextarea = function() {
    return {
        textarea: {
            getDOMNode: () => {
                return {
                    focus: () => {},
                    value: "A long\nboring string that doesn't mean anything",
                    selectionStart: 2,
                    selectionEnd: 10
                };
            }
        }
    };
};

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
            editor.refs = mockTextarea();
        });

        it("should apply a function to the selected text", () => {
            editor.wrapSelectionIn(wrapFnSpy);
            expect(wrapFnSpy).to.have.been.called.with('long\nbor');
        });

        it("should trigger the onChange handler", () => {
            var onChangeSpy = spy.on(editor, 'onInputChange');
            editor.wrapSelectionIn(wrapFnSpy);
            expect(onChangeSpy).to.have.been.called();
        });
    });

    describe("#wrapLinesIn", () => {
        var wrapFnSpy;

        beforeEach(() => {
            wrapFnSpy = spy((text) => { return {text: `*${text}*`, cursor: {start: 0, end: 5}}; });
            editor.refs = mockTextarea();
        });

        it("should apply a function to the selected text", () => {
            editor.wrapLinesIn(wrapFnSpy);
            expect(wrapFnSpy).to.have.been.called.twice.with('long');
        });

        it("should trigger the onChange handler", () => {
            var onChangeSpy = spy.on(editor, 'onInputChange');
            editor.wrapLinesIn(wrapFnSpy);
            expect(onChangeSpy).to.have.been.called();
        });
    });

    describe('#onInputChange', () => {
        it('calls the props.onChange callback', () => {
            let changeSpy = spy.on(editor.props, 'onChange');
            editor.onInputChange({target: {value: 'testVal'}});
            expect(changeSpy).to.have.been.called();
        });
    });

    describe("#handleHelpRequest", () => {
        var helpSpy;
        beforeEach(() => {
            helpSpy = spy();
            editor = new MarkdownEditor({onHelp: helpSpy});
        });

        it("should call the onHelp property", () => {
            editor.handleHelpRequest({});
            expect(helpSpy).to.have.been.called.with({});
        });
    });

    describe("#handlePreviewToggle", () => {
        it("should toggle the preview State", () => {
            editor = addons.TestUtils.renderIntoDocument(<MarkdownEditor value="##blah blash" />);
            editor.handlePreviewToggle();
            expect(editor.state.previewing).to.be.true;
        });
    });

    describe("#componentWillMount", () => {
        it("should set state.previewing to the value of the previewing prop", () => {
            editor = addons.TestUtils.renderIntoDocument(<MarkdownEditor previewing={true} value="##blah blash" />);
            expect(editor.state.previewing).to.be.true;
        });
    });

    describe("#render", () => {
        [["insert-link", "InsertLink"],
         ["insert-image", "InsertImage"],
         ["bullet"],
         ["number"],
         ["bold"],
         ["italic"],
         ["heading"],
         ["insert-quote", "Quote"],
         ["hr", "HorizontalRule"],
         ["strikethrough"]].forEach(([name, cbName]) => {
             it(`should setup a click listener for ${name} button`, () => {
                 cbName = cbName || name.charAt(0).toUpperCase() + name.slice(1);
                 var cbSpy = spy.on(MarkdownEditor.prototype, `on${cbName}Click`);
                 editor = addons.TestUtils.renderIntoDocument(<MarkdownEditor value="##blah blash" />);
                 editor.refs = mockTextarea();
                 var button = addons.TestUtils.findRenderedDOMComponentWithClass(editor, `talk-comment-${name}-button`);
                 addons.TestUtils.Simulate.click(button);
                 expect(cbSpy).to.have.been.called();
             });
         });

        context("when previewing is true", () => {
            beforeEach(() => {
                editor = addons.TestUtils.renderIntoDocument(<MarkdownEditor previewing={true} />);
            });

            it("should set the preview icon to pencil", () => {
                var icon = addons.TestUtils.findRenderedDOMComponentWithClass(editor, 'fa-pencil');
                expect(icon).to.be.ok;
            });

            it("should set data-previewing to true", () => {
                var md = addons.TestUtils.findRenderedDOMComponentWithClass(editor, 'markdown-editor');
                expect(md.props['data-previewing']).to.be.true;
            });
        });

        context("when previewing is false", () => {
            beforeEach(() => {
                editor = addons.TestUtils.renderIntoDocument(<MarkdownEditor previewing={false} />);
            });

            it("should set the preview icon to eye", () => {
                var icon = addons.TestUtils.findRenderedDOMComponentWithClass(editor, 'fa-eye');
                expect(icon).to.be.ok;
            });

            it("should not set data-previewing", () => {
                var md = addons.TestUtils.findRenderedDOMComponentWithClass(editor, 'markdown-editor');
                expect(md.props['data-previewing']).to.be.null;
            });
        });

        it("should render a markdown preview from the value property", () => {
            editor = addons.TestUtils.renderIntoDocument(<MarkdownEditor value="##blah blah"/>);
            let markdown = addons.TestUtils.findRenderedDOMComponentWithClass(editor, "markdown-editor-preview")
            expect(markdown.props.dangerouslySetInnerHTML.__html).to.match(/blah blah/);
        });

        it("should pass properties to the textarea", () => {
            var properties = {
                rows: 5,
                cols: 10,
                placeholder: "asdfasdf",
                name: "hey there",
                value: "oh there"
            };
            editor = addons.TestUtils.renderIntoDocument(<MarkdownEditor {...properties}/>);
            var textarea = addons.TestUtils.findRenderedDOMComponentWithTag(editor, 'textarea');
            Object.keys(properties).forEach((key) => {
                let value = properties[key];
                expect(textarea.props).to.have.property(key).that.equals(value);
            });
        });
    });
});

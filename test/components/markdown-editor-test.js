import dom from '../test-setup';

import MarkdownEditor from '../../src/components/markdown-editor.jsx';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import chai from 'chai';
import spies from 'chai-spies';
chai.use(spies);
let {expect, spy} = chai;

let mockTextarea = function() {
  return {
    textarea: {
      focus: () => {},
      value: "A long\nboring string that doesn't mean anything",
      selectionStart: 2,
      selectionEnd: 10
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
            editor = TestUtils.renderIntoDocument(<MarkdownEditor value="##blah blash" />);
            editor.handlePreviewToggle();
            expect(editor.state.previewing).to.be.true;
        });
    });

    describe("#componentWillMount", () => {
        it("should set state.previewing to the value of the previewing prop", () => {
            editor = TestUtils.renderIntoDocument(<MarkdownEditor previewing={true} value="##blah blash" />);
            expect(editor.state.previewing).to.be.true;
        });
    });

    describe("#componentWillReceiveProps", () => {
        it("should set state.previewing to the value of the previewing prop (after mount)", () => {
            // We can't manipulate props of editor directly, so create a parent component to do it via render
            var TestParent = React.createFactory(React.createClass({
              getInitialState() {
                return {
                  previewing: true
                };
              },
              render() {
                return <MarkdownEditor ref="editor" previewing={this.state.previewing} value="##blah blash"  />
              }
            }));

            var parent = TestUtils.renderIntoDocument(TestParent());
            parent.setState({
              previewing: false
            });
            expect(parent.refs.editor.state.previewing).to.be.false;
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
                 editor = TestUtils.renderIntoDocument(<MarkdownEditor value="##blah blash" />);
                 editor.refs = mockTextarea();
                 var button = TestUtils.findRenderedDOMComponentWithClass(editor, `talk-comment-${name}-button`);
                 TestUtils.Simulate.click(button);
                 expect(cbSpy).to.have.been.called();
             });
         });

        context("when previewing is true", () => {
            beforeEach(() => {
                editor = TestUtils.renderIntoDocument(<MarkdownEditor previewing={true} />);
            });

            it("should set the preview icon to pencil", () => {
                var icon = TestUtils.findRenderedDOMComponentWithClass(editor, 'fa-pencil');
                expect(icon).to.be.ok;
            });

            it("should set data-previewing to true", () => {
                var md = TestUtils.findRenderedDOMComponentWithClass(editor, 'markdown-editor');
                expect(md.hasAttribute('data-previewing')).to.be.true;
            });
        });

        context("when previewing is false", () => {
            beforeEach(() => {
                editor = TestUtils.renderIntoDocument(<MarkdownEditor previewing={false} />);
            });

            it("should set the preview icon to eye", () => {
                var icon = TestUtils.findRenderedDOMComponentWithClass(editor, 'fa-eye');
                expect(icon).to.be.ok;
            });

            it("should not set data-previewing", () => {
                var md = TestUtils.findRenderedDOMComponentWithClass(editor, 'markdown-editor');
                expect(md.hasAttribute('data-previewing')).to.be.false;
            });
        });

        it("should render a markdown preview from the value property", () => {
            editor = TestUtils.renderIntoDocument(<MarkdownEditor value="## blah blah"/>);
            let markdown = TestUtils.findRenderedDOMComponentWithClass(editor, "markdown-editor-preview")
            expect(markdown.innerHTML).to.match(/blah blah/);
        });

        it("should pass properties to the textarea", () => {
            var properties = {
                rows: '5',
                cols: '10',
                placeholder: "asdfasdf",
                name: "hey there"
            };
            var value = "oh there";
            editor = TestUtils.renderIntoDocument(<MarkdownEditor {...properties} value={value}/>);
            var textarea = TestUtils.findRenderedDOMComponentWithTag(editor, 'textarea');
            Object.keys(properties).forEach((key) => {
              let value = properties[key];
              expect(textarea.getAttribute(key)).to.be.equal(value);
            });
            expect(textarea.value).to.equal(value);
        });
    });
});

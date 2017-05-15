// import TestUtils from 'react-addons-test-utils';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { MarkdownEditor } from '../src/index';

const mockTextarea = {
  focus: () => {},
  value: "A long\nboring string that doesn't mean anything",
  selectionStart: 2,
  selectionEnd: 10
};

describe('MarkdownEditor', () => {
  let editor;

  beforeEach(() => {
    // editor = new MarkdownEditor({ name: 'test', onChange: Function.prototype });
    editor = shallow(<MarkdownEditor name="test" onChange={() => {}} />);
  });

  it('exists', () => {
    expect(editor).to.be.ok;
  });

  describe('initial state', () => {
    it('should set previewing to false', () => {
      expect(editor.state('previewing')).to.deep.equal(false);
    });
  });

  describe('#wrapSelectionIn', () => {
    let wrapFnSpy;

    beforeEach(() => {
      wrapFnSpy = spy((text) => { return { text: `*${text}*`, cursor: { start: 0, end: 5 }}; });
      editor.instance().textarea = mockTextarea;
    });

    it('should apply a function to the selected text', () => {
      editor.instance().wrapSelectionIn(wrapFnSpy);
      expect(wrapFnSpy).to.have.been.called.with('long\nbor');
    });

    it('should trigger the onChange handler', () => {
      const onChangeSpy = spy.on(editor.instance(), 'onInputChange');
      editor.instance().wrapSelectionIn(wrapFnSpy);
      expect(onChangeSpy).to.have.been.called();
    });
  });

  describe('#wrapLinesIn', () => {
    let wrapFnSpy;

    beforeEach(() => {
      wrapFnSpy = spy((text) => { return { text: `*${text}*`, cursor: { start: 0, end: 5 }}; });
      editor.instance().textarea = mockTextarea;
    });

    it('should apply a function to the selected text', () => {
      editor.instance().wrapLinesIn(wrapFnSpy);
      expect(wrapFnSpy).to.have.been.called.twice.with('long');
    });

    it('should trigger the onChange handler', () => {
      const onChangeSpy = spy.on(editor.instance(), 'onInputChange');
      editor.instance().wrapLinesIn(wrapFnSpy);
      expect(onChangeSpy).to.have.been.called();
    });
  });

  describe('#onInputChange', () => {
    it('calls the props.onChange callback', () => {
      const changeSpy = spy.on(editor.props, 'onChange');
      editor.instance().onInputChange({ target: { value: 'testVal' }});
      expect(changeSpy).to.have.been.called();
    });
  });

  describe('#handleHelpRequest', () => {
    let helpSpy;
    beforeEach(() => {
      helpSpy = spy();
      // editor = new MarkdownEditor({ onHelp: helpSpy });
      editor = mount(<MarkdownEditor onHelp={helpSpy} />);
    });

    it('should call the onHelp property', () => {
      editor.instance().handleHelpRequest({ });
      expect(helpSpy).to.have.been.called.with({ });
    });
  });

  describe('#handlePreviewToggle', () => {
    it('should toggle the preview State', () => {
      // editor = TestUtils.renderIntoDocument(<MarkdownEditor value="##blah blash" />);
      editor = shallow(<MarkdownEditor />);
      editor.setProps({ value: '##blah blash' });
      editor.instance().handlePreviewToggle();
      expect(editor.state('previewing')).to.be.true;
    });
  });

  describe('#componentWillMount', () => {
    it('should set state.previewing to the value of the previewing prop', () => {
      // editor = TestUtils.renderIntoDocument(
      //   <MarkdownEditor previewing value="##blah blash" />
      // );
      editor = shallow(<MarkdownEditor previewing={true} value='##blah blash' />);
      editor.setProps({ previewing: true, value: '##blah blash' });
      expect(editor.state('previewing')).to.be.true;
    });
  });

  describe('#componentWillReceiveProps', () => {
    it('should set state.previewing to the value of the previewing prop (after mount)', () => {
      // We can't manipulate props of editor directly, so create a parent component to do it via render
      const testParent = React.createFactory(React.createClass({
        getInitialState() {
          return { previewing: true };
        },
        render() {
          return <MarkdownEditor ref="editor" previewing={this.state.previewing} value="##blah blash" />;
        }
      }));

      const parent = TestUtils.renderIntoDocument(testParent());
      parent.setState({ previewing: false });
      expect(parent.refs.editor.state.previewing).to.be.false;
    });
  });

  describe('#render', () => {
    [['insert-link', 'InsertLink'],
     ['insert-image', 'InsertImage'],
     ['insert-video', 'InsertVideo'],
     ['bullet'],
     ['number'],
     ['bold'],
     ['italic'],
     ['heading'],
     ['insert-quote', 'Quote'],
     ['hr', 'HorizontalRule'],
     ['strikethrough']].forEach(([name, cbName]) => {
       it(`should setup a click listener for ${name} button`, () => {
         cbName = cbName || name.charAt(0).toUpperCase() + name.slice(1);
         const cbSpy = spy.on(MarkdownEditor.prototype, `on${cbName}Click`);
         editor = TestUtils.renderIntoDocument(<MarkdownEditor value="##blah blash" />);
         editor.refs = mockTextarea();
         const button = TestUtils.findRenderedDOMComponentWithClass(editor, `talk-comment-${name}-button`);
         TestUtils.Simulate.click(button);
         expect(cbSpy).to.have.been.called();
       });
     });

    context('when previewing is true', () => {
      beforeEach(() => {
        editor = TestUtils.renderIntoDocument(<MarkdownEditor previewing />);
      });

      it('should set the preview icon to pencil', () => {
        const icon = TestUtils.findRenderedDOMComponentWithClass(editor, 'fa-pencil');
        expect(icon).to.be.ok;
      });

      it('should set data-previewing to true', () => {
        const md = TestUtils.findRenderedDOMComponentWithClass(editor, 'markdown-editor');
        expect(md.hasAttribute('data-previewing')).to.be.true;
      });
    });

    context('when previewing is false', () => {
      beforeEach(() => {
        editor = TestUtils.renderIntoDocument(<MarkdownEditor previewing={false} />);
      });

      it('should set the preview icon to eye', () => {
        const icon = TestUtils.findRenderedDOMComponentWithClass(editor, 'fa-eye');
        expect(icon).to.be.ok;
      });

      it('should not set data-previewing', () => {
        const md = TestUtils.findRenderedDOMComponentWithClass(editor, 'markdown-editor');
        expect(md.hasAttribute('data-previewing')).to.be.false;
      });
    });

    it('should render a markdown preview from the value property', () => {
      editor = TestUtils.renderIntoDocument(<MarkdownEditor value="## blah blah" />);
      const markdown = TestUtils.findRenderedDOMComponentWithClass(editor, 'markdown-editor-preview');
      expect(markdown.innerHTML).to.match(/blah blah/);
    });

    it('should pass properties to the textarea', () => {
      const properties = {
        rows: '5',
        cols: '10',
        placeholder: 'asdfasdf',
        name: 'hey there'
      };
      const value = 'oh there';
      editor = TestUtils.renderIntoDocument(<MarkdownEditor {...properties} value={value} />);
      const textarea = TestUtils.findRenderedDOMComponentWithTag(editor, 'textarea');
      Object.keys(properties).forEach((key) => {
        const val = properties[key];
        expect(textarea.getAttribute(key)).to.be.equal(val);
      });
      expect(textarea.value).to.equal(value);
    });
  });
});

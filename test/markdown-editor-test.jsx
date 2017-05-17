import React from 'react';
import { mount, shallow } from 'enzyme';
import { MarkdownEditor } from '../src/index';

const mockTextarea = () => {
  return {
    focus: () => {},
    value: "A long\nboring string that doesn't mean anything",
    selectionStart: 2,
    selectionEnd: 10
  };
};

describe('MarkdownEditor', () => {
  let editor;

  beforeEach(() => {
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
      editor.instance().textarea = mockTextarea();
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
      editor.instance().textarea = mockTextarea();
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
      const changeSpy = spy.on(editor.instance(), 'onChange');
      editor = shallow(<MarkdownEditor name="test" onChange={changeSpy} />);
      editor.instance().onInputChange({ target: { value: 'testVal' }});
      expect(changeSpy).to.have.been.called();
    });
  });

  describe('#handleHelpRequest', () => {
    let helpSpy;
    beforeEach(() => {
      helpSpy = spy();
      editor = mount(<MarkdownEditor onHelp={helpSpy} />);
    });

    it('should call the onHelp property', () => {
      editor.instance().handleHelpRequest({ });
      expect(helpSpy).to.have.been.called.with({ });
    });
  });

  describe('#handlePreviewToggle', () => {
    it('should toggle the preview State', () => {
      editor = shallow(<MarkdownEditor />);
      editor.setProps({ value: '##blah blash' });
      editor.instance().handlePreviewToggle();
      expect(editor.state('previewing')).to.be.true;
    });
  });

  describe('#componentWillMount', () => {
    it('should set state.previewing to the value of the previewing prop', () => {
      editor = mount(<MarkdownEditor previewing={true} value='##blah blash' />);
      editor.setProps({ previewing: true, value: '##blah blash' });
      expect(editor.state('previewing')).to.be.true;
    });
  });

  describe('#componentWillReceiveProps', () => {
    it('should set state.previewing to the value of the previewing prop (after mount)', () => {
      const cwrpSpy = spy.on(MarkdownEditor.prototype, 'componentWillReceiveProps');
      editor = mount(<MarkdownEditor value="##blah blash" />);
      expect(editor.state('previewing')).to.be.false;
      editor.setProps({ previewing: true });
      expect(cwrpSpy).to.have.been.called();
      expect(editor.state('previewing')).to.be.true;
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
         editor = mount(<MarkdownEditor value="##blah blash" />);
         editor.textarea = mockTextarea();
         const button = editor.find(`.talk-comment-${name}-button`);
         button.simulate('click');
         expect(cbSpy).to.have.been.called();
       });
     });

    context('when previewing is true', () => {
      beforeEach(() => {
        editor = shallow(<MarkdownEditor previewing />);
      });

      it('should set the preview icon to pencil', () => {
        const icon = editor.find('.fa-pencil');
        expect(icon).to.be.ok;
      });

      it('should set data-previewing to true', () => {
        const md = editor.render().find('.markdown-editor');
        expect(md.attr('data-previewing')).to.exist;
      });
    });

    context('when previewing is false', () => {
      beforeEach(() => {
        editor = shallow(<MarkdownEditor previewing={false} />);
      });

      it('should set the preview icon to eye', () => {
        const icon = editor.find('.fa-eye');
        expect(icon).to.be.ok;
      });

      it('should not set data-previewing', () => {
        const md = editor.render().find('.markdown-editor');
        expect(md.attr('data-previewing')).to.not.exist;
      });
    });

    it('should render a markdown preview from the value property', () => {
      editor = shallow(<MarkdownEditor value="## blah blah" />);
      const markdown = editor.find('.markdown-editor-preview');
      expect(markdown.html()).to.match(/blah blah/);
    });

    it('should pass properties to the textarea', () => {
      const properties = {
        rows: '5',
        cols: '10',
        placeholder: 'asdfasdf',
        name: 'hey there'
      };
      const value = 'oh there';
      editor = shallow(<MarkdownEditor {...properties} value={value} />);
      const textarea = editor.render().find('textarea');
      Object.keys(properties).forEach((key) => {
        const val = properties[key];
        expect(textarea.attr(key)).to.equal(val);
      });
      expect(editor.find('textarea').props().value).to.equal(value);
    });
  });
});

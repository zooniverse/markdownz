/* global expect */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */
import React from 'react';
import { shallow } from 'enzyme';

import MarkdownHelp from '../src/components/markdown-help';


describe('<MarkdownHelp />', () => {
  it('exists', () => {
    const wrapper = shallow(<MarkdownHelp />);
    expect(wrapper).to.be.ok;
  });

  describe('default props', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<MarkdownHelp />);
    });

    it('should not render TalkMarkdownHelp component', () => {
      expect(wrapper.find('TalkMarkdownHelp')).to.have.lengthOf(0);
    });

    it('should display the default title', () => {
      expect(wrapper.find('.markdown-editor-title').text()).to.include('Guide to using Markdown');
    });

    it('should render the TalkMarkdownHelp component', () => {
      wrapper.setProps({ talk: true });
      expect(wrapper.find('TalkMarkdownHelp')).to.have.lengthOf(1);
    });

    it('should render a custom title', () => {
      wrapper.setProps({ title: "Lorem Ipsum" });
      expect(wrapper.find('.markdown-editor-title').text()).to.include('Lorem Ipsum');
    });
  });
});

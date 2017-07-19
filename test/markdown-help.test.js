/* global expect */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */
import React from 'react';
import { mount } from 'enzyme';

import MarkdownHelp from '../src/components/markdown-help';


describe('<MarkdownHelp />', function() {
  it('should render', function() {
    const wrapper = mount(<MarkdownHelp />);
    expect(wrapper.find(MarkdownHelp)).to.have.length(1);
  });

  describe('default props', function() {
    let wrapper;

    before(function() {
      wrapper = mount(<MarkdownHelp />);
    });

    it('should not render TalkMarkdownHelp component', function() {
      expect(wrapper.find('TalkMarkdownHelp')).to.have.lengthOf(0);
    });

    it('should display the default title', function() {
      expect(wrapper.find('.markdown-editor-title').text()).to.include('Guide to using Markdown');
    });
  });

  describe('custom props', function() {
    let wrapper;

    before(function() {
      wrapper = mount(<MarkdownHelp talk={true} title="Lorem Ipsum" />);
    });

    it('should render the TalkMarkdownHelp component', function() {
      expect(wrapper.find('TalkMarkdownHelp')).to.have.lengthOf(1);
    });

    it('should render a custom title', function() {
      expect(wrapper.find('.markdown-editor-title').text()).to.include('Lorem Ipsum');
    });
  });
});

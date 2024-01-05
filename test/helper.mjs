import React from 'react';
import { expect, use } from 'chai';
import spies from 'chai-spies';
import MarkdownIt from 'markdown-it';
import jsdom from 'jsdom';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

const { spy } = use(spies);

Enzyme.configure({
  adapter: new Adapter()
});

global.React = React;
global.expect = expect;
global.spy = spy;
global.MarkdownIt = MarkdownIt;

const { JSDOM } = jsdom;
const { document } = (new JSDOM('', {
  url: 'http://localhost'
})).window;
global.document = document;
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined' && property !== 'XMLHttpRequest') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

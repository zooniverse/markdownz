import React from 'react';
import chai from 'chai';
import spy from 'chai-spies';
import MarkdownIt from 'markdown-it';
import jsdom from 'jsdom';

chai.use(spy);

global.React = React;
global.expect = chai.expect;
global.spy = chai.spy;
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

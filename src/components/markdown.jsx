import { PureComponent, createElement } from 'react';

import * as utils from '../lib/utils';

export default class Markdown extends PureComponent {

  captureFootnoteLinks() {
    const backrefs = '.footnote-ref > a, .footnote-backref';
    if (this.root && this.root.querySelectorAll) {
      const links = this.root.querySelectorAll(backrefs);

      for (let i = 0; i < links.length; i += 1) {
        const link = links[i];
        const target = document.getElementById(link.getAttribute('href').replace('#', ''));
        link.onclick = function (ev) {
          ev.preventDefault();
          target.scrollIntoView({ block: 'start', behavior: 'smooth' });
        };
      }
    }
  }

  render() {
    const { className, children, content, tag, ...props } = this.props;
    const html = utils.getHtml({
      ...props,
      content: children || content
    });
    setTimeout(() => this.captureFootnoteLinks(), 1);

    return createElement(tag, {
      className: `markdown ${className}`,
      dangerouslySetInnerHTML: { __html: html },
      ref: (element) => { this.root = element; }
    });
  }
}

Markdown.counter = 0;

Markdown.defaultProps = {
  tag: 'div',
  content: '',
  debug: false,
  inline: false,
  project: null,
  baseURI: null,
  className: '',
  relNofollow: false,
  idPrefix: null
};

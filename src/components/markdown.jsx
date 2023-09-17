import { PureComponent } from 'react';

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

  getHtml() {
    const { children, ...props } = this.props;
    const content = children || this.props.content;
    return utils.getHtml({
      ...props,
      content
    });
  }

  render() {
    const html = this.getHtml();
    setTimeout(() => this.captureFootnoteLinks(), 1);

    return React.createElement(this.props.tag, {
      className: `markdown ${this.props.className}`,
      dangerouslySetInnerHTML: { __html: html },
      ref: (element) => { this.root = element; }
    });
  }
}

Markdown.counter = 0;

Markdown.defaultProps = {
  tag: 'div',
  content: '',
  inline: false,
  project: null,
  baseURI: null,
  className: '',
  relNofollow: false,
  idPrefix: null
};

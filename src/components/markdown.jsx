import { Fragment, PureComponent, createElement } from 'react';
import rehype from 'rehype';
import rehype2react from 'rehype-react';

import * as utils from '../lib/utils';

export default class Markdown extends PureComponent {

  captureFootnoteLinks() {
    const backrefs = '.footnote-ref > a, .footnote-backref';
    if (this.root && this.root.querySelectorAll) {
      const links = this.root.querySelectorAll(backrefs);

      for (let i = 0; i < links.length; i += 1) {
        const link = links[i];
        const target = document.getElementById(link.getAttribute('href').replace('#', ''));
        link.onclick = function onClickFootnoteLink(ev) {
          ev.preventDefault();
          target.scrollIntoView({ block: 'start', behavior: 'smooth' });
        };
      }
    }
  }

  render() {
    const { className, children, components, content, settings, tag, ...props } = this.props;
    const html = utils.getHtml({
      ...props,
      content: children || content
    });
    setTimeout(() => this.captureFootnoteLinks(), 1);

    const rehypeSettings = {
      fragment: true,
      ...settings
    };

    let parsedHTML = null;
    try {
      parsedHTML = rehype()
        .data('settings', rehypeSettings)
        .use(rehype2react, {
          Fragment,
          createElement,
          components
        })
        .processSync(html).result;
    } catch (error) {
      parsedHTML = error.message;
    }

    return createElement(tag, {
      className: `markdown ${className}`,
      children: parsedHTML,
      ref: (element) => { this.root = element; }
    });
  }
}

Markdown.counter = 0;

Markdown.defaultProps = {
  tag: 'div',
  components: null,
  content: '',
  debug: false,
  inline: false,
  project: null,
  settings: {},
  baseURI: null,
  className: '',
  relNofollow: false,
  idPrefix: null
};

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
        link.onclick = function onClickFootnoteLink(ev) {
          ev.preventDefault();
          target.scrollIntoView({ block: 'start', behavior: 'smooth' });
        };
      }
    }
  }

  render() {
    const { className, children, components, content, settings, tag: Tag, ...props } = this.props;
    const html = utils.getHtml({
      ...props,
      content: children || content
    });

    const reactChildren = utils.getComponentTree({
      components,
      html,
      settings
    });

    setTimeout(() => this.captureFootnoteLinks(), 1);

    return (
      <Tag
        ref={(element) => { this.root = element; }}
        className={`markdown ${className}`}
      >
        {reactChildren}
      </Tag>
    );
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

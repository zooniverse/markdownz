import React from 'react';
import MarkdownIt from 'markdown-it';
import MarkdownItContainer from 'markdown-it-container';
import markdownEmoji from 'markdown-it-emoji';
import markdownSub from 'markdown-it-sub';
import markdownSup from 'markdown-it-sup';
import markdownFootnote from 'markdown-it-footnote';
import markdownImsize from 'markdown-it-imsize';
import markdownVideo from 'markdown-it-video';
import markdownTableOfContents from 'markdown-it-table-of-contents';
import markdownAnchor from 'markdown-it-anchor';
import twemoji from 'twemoji';

import replaceSymbols from '../lib/default-transformer';
import relNofollow from '../lib/links-rel-nofollow';
import markdownNewTab from '../lib/links-in-new-tabs';

function markdownIt() {
  return new MarkdownIt({ linkify: true, breaks: true })
    .use(markdownEmoji)
    .use(markdownSub)
    .use(markdownSup)
    .use(markdownFootnote)
    .use(markdownImsize)
    .use(markdownNewTab)
    .use(markdownVideo)
    .use(markdownAnchor)
    .use(markdownTableOfContents)
    .use(MarkdownItContainer, 'partners')
    .use(MarkdownItContainer, 'attribution');
}

export default class Markdown extends React.Component {

  markdownify(input) {
    Markdown.counter += 1;
    const id = this.props.idPrefix || (Date.now().toString(16) + Markdown.counter);
    const env = { docId: id };
    if (this.props && this.props.inline) {
      return this.renderer().renderInline(input, env);
    }

    return this.renderer().render(input, env);
  }

  renderer() {
    if (this.props && this.props.relNofollow) {
      return markdownIt().use(relNofollow);
    }
    return markdownIt();
  }

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
    const content = this.props.children || this.props.content;

    try {
      const { project, baseURI } = this.props;

      if (typeof this.props.transform === 'function') {
        const transformed = this.props.transform(content, { project, baseURI });
        return this.emojify(this.markdownify(transformed));
      }

      return this.emojify(this.markdownify(content));
    } catch (e) {
      return content;
    }
  }

  emojify(input) {
    return twemoji.parse(input);
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
  transform: replaceSymbols,
  project: null,
  baseURI: null,
  className: '',
  relNofollow: false,
  idPrefix: null
};

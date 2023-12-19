import MarkdownIt from 'markdown-it';
import MarkdownItContainer from 'markdown-it-container';
import { full as markdownEmoji} from 'markdown-it-emoji';
import markdownSub from 'markdown-it-sub';
import markdownSup from 'markdown-it-sup';
import markdownFootnote from 'markdown-it-footnote';
import markdownImsize from 'markdown-it-imsize';
import markdownVideo from 'markdown-it-video';
import markdownTableOfContents from 'markdown-it-table-of-contents';
import markdownAnchor from 'markdown-it-anchor';
import html5Embed from 'markdown-it-html5-embed';
import twemoji from '@twemoji/api';
import { sanitize } from 'isomorphic-dompurify';

import { Fragment, createElement } from 'react';
import rehype from 'rehype';
import rehype2react from 'rehype-react';

import markdownNewTab from './links-in-new-tabs';
import relNofollow from './links-rel-nofollow';
import replaceSymbols from './default-transformer';

let counter = 0;

export function emojify(input) {
  return twemoji.parse(input);
}

export function markdownz() {
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
    .use(MarkdownItContainer, 'attribution')
    .use(html5Embed, {});
}

const baseRenderer = markdownz();
const noFollowRenderer = markdownz().use(relNofollow);

export function renderer({ relNoFollow = false }) {
  return relNoFollow ? noFollowRenderer : baseRenderer;
}

export function markdownify({
  idPrefix,
  inline = false,
  input,
  relNoFollow = false
}) {
  counter += 1;
  const id = idPrefix || (Date.now().toString(16) + counter);
  const env = { docId: id };
  if (inline) {
    return renderer({ relNoFollow }).renderInline(input, env);
  }

  return renderer({ relNoFollow }).render(input, env);
}

export function getHtml({
  baseURI,
  content = '',
  debug = false,
  idPrefix,
  inline = false,
  project,
  relNoFollow = false,
  transform = replaceSymbols
}) {
  let input = '';
  try {
    input = content.toString();
    if (typeof transform === 'function') {
      input = transform(input, { project, baseURI });
    }

    const html = markdownify({
      idPrefix, inline, input, relNoFollow
    });
    const sanitizedHTML = sanitize(html, {
      ADD_ATTR: ['allowfullscreen', 'target'],
      ADD_TAGS: ['iframe']
    });
    return emojify(sanitizedHTML);
  } catch (e) {
    if (debug) {
      console.error(e);
      return e.message;
    }
    return content;
  }
}

export function getComponentTree({ html, settings, components }) {
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
  return parsedHTML
}

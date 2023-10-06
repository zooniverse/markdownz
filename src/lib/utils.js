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
import html5Embed from 'markdown-it-html5-embed';
import twemoji from '@twemoji/api';
import { sanitize } from 'dompurify';

import markdownNewTab from '../lib/links-in-new-tabs';
import relNofollow from '../lib/links-rel-nofollow';
import replaceSymbols from '../lib/default-transformer';

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
  content,
  debug = false,
  idPrefix,
  inline = false,
  project,
  relNoFollow = false,
  transform = replaceSymbols
}) {
  let input = content;
  try {
    if (typeof transform === 'function') {
      input = transform(content, { project, baseURI });
    }

    const html = markdownify({ idPrefix, inline, input, relNoFollow });
    const sanitizedHTML = sanitize(html, {
      ADD_ATTR: ['target']
    });
    return emojify(sanitizedHTML);
  } catch (e) {
    if (debug) {
      console.error(e)
      return e.message
    }
    return content;
  }
}

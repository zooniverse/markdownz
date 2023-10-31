import { useRef } from 'react';

import useMarkdownz from '../hooks/use-markdownz';
import replaceSymbols from '../lib/default-transformer';

export default function Markdown({
  baseURI = null,
  className = '',
  children,
  components = null,
  content = '',
  debug = false,
  idPrefix = null,
  inline = false,
  project = null,
  relNoFollow = false,
  settings = {},
  tag = 'div',
  transform = replaceSymbols
}) {
  const Tag = tag;
  const root = useRef();

  function captureFootnoteLinks() {
    const backrefs = '.footnote-ref > a, .footnote-backref';
    if (root.current && root.current.querySelectorAll) {
      const links = root.current.querySelectorAll(backrefs);

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

  const reactChildren = useMarkdownz({
    baseURI,
    components,
    content: children || content,
    debug,
    idPrefix,
    inline,
    project,
    relNoFollow,
    settings,
    transform
  });

  setTimeout(captureFootnoteLinks, 1);

  return (
    <Tag
      ref={root}
      className={`markdown ${className}`}
    >
      {reactChildren}
    </Tag>
  );
}

Markdown.counter = 0;

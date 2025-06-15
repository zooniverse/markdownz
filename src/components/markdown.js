import PropTypes from 'prop-types';
import { useRef } from 'react';

import useMarkdownz from '../hooks/use-markdownz.js';
import replaceSymbols from '../lib/default-transformer.js';

const defaultSettings = {};

export default function Markdown({
  baseURI = '',
  className = '',
  children = null,
  components = null,
  content = '',
  debug = false,
  idPrefix = '',
  inline = false,
  project = null,
  relNoFollow = false,
  settings = defaultSettings,
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

Markdown.propTypes = {
  baseURI: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  components: PropTypes.object,
  content: PropTypes.string,
  debug: PropTypes.bool,
  idPrefix: PropTypes.string,
  inline: PropTypes.bool,
  project: PropTypes.shape({
    slug: PropTypes.string
  }),
  relNoFollow: PropTypes.bool,
  settings: PropTypes.object,
  tag: PropTypes.string,
  transform: PropTypes.func
};

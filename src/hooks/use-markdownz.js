import { useMemo } from 'react';

import * as utils from '../lib/utils.js';
import replaceSymbols from '../lib/default-transformer.js';

const defaultSettings = {};

export default function useMarkdownz({
  baseURI = '',
  components = null,
  content = '',
  debug = false,
  idPrefix = '',
  inline = false,
  project = null,
  relNoFollow = false,
  settings = defaultSettings,
  transform = replaceSymbols
}) {
  const html = useMemo(() => utils.getHtml({
    baseURI,
    content,
    debug,
    idPrefix,
    inline,
    project,
    relNoFollow,
    transform
  }), [baseURI, content, debug, idPrefix, inline, project, relNoFollow, transform]);

  return useMemo(() => utils.getComponentTree({
    components,
    html,
    settings
  }), [components, html, settings]);
}

import { useMemo } from 'react';

import * as utils from '../lib/utils';
import replaceSymbols from '../lib/default-transformer';

export default function useMarkdownz({
  baseURI,
  components = null,
  content,
  debug = false,
  idPrefix,
  inline = false,
  project,
  relNoFollow = false,
  settings = {},
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
  }));

  return useMemo(() => utils.getComponentTree({
    components,
    html,
    settings
  }));
}

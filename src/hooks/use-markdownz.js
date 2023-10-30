import { useMemo } from 'react';

import * as utils from '../lib/utils';
import replaceSymbols from '../lib/default-transformer';

export default function useMarkdownz({
  baseURI,
  content,
  debug = false,
  idPrefix,
  inline = false,
  project,
  relNoFollow = false,
  transform = replaceSymbols
}) {
  return useMemo(() => utils.getHtml({
    baseURI,
    content,
    debug,
    idPrefix,
    inline,
    project,
    relNoFollow,
    transform
  }));
}

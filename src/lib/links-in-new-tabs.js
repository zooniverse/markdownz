// from https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#renderer
export default function (md, opts) {
  // Remember old renderer, if overridden, or proxy to default renderer
  const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  const prefix = (opts && opts.prefix) ? opts.prefix : '+tab+';

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const hrefIndex = tokens[idx].attrIndex('href');
    const href = tokens[idx].attrs[hrefIndex][1];

    if (prefix === href.slice(0, prefix.length)) {
      // trim prefix if href starts with prefix
      tokens[idx].attrs[hrefIndex][1] = href.slice(prefix.length, href.length);
      const aIndex = tokens[idx].attrIndex('target');
      const rIndex = tokens[idx].attrIndex('rel');

      if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank']); // add new attribute
      } else {
        tokens[idx].attrs[aIndex][1] = '_blank'; // replace value of existing attr
      }
      if (rIndex < 0) {
        tokens[idx].attrPush(['rel', 'noopener nofollow noreferrer']);
      } else {
        tokens[idx].attrs[rIndex].push('noopener');
        tokens[idx].attrs[rIndex].push('nofollow');
        tokens[idx].attrs[rIndex].push('noreferrer');
      }
    }

    // pass token to default renderer
    return defaultRender(tokens, idx, options, env, self);
  };
}

// from https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#renderer
export default function (md) {
  // Remember old renderer, if overridden, or proxy to default renderer
  const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const hrefIndex = tokens[idx].attrIndex('href');
    const href = tokens[idx].attrs[hrefIndex][1];
    const relIndex = tokens[idx].attrIndex('rel');

    if (!href.match(/zooniverse.org/)) {
      // add rel=nofollow noreferrer to external links
      if (relIndex < 0) {
        tokens[idx].attrPush(['rel', 'nofollow noreferrer']);
      } else {
        tokens[idx].attrs[relIndex].push('nofollow');
        tokens[idx].attrs[relIndex].push('noreferrer');
      }
    }

    // pass token to default renderer
    return defaultRender(tokens, idx, options, env, self);
  };
}

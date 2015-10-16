/* 
 links-transform.js
 opens links in a new tab if prefixed with +tab+
 adds rel=nofollow if not a zooniverse.org link
 accepts options of {prefix: 'your-custom-prefix'}
 'prefix' is the string to use before links for links to open in new tab
 */ 

export default function(md, opts) {
    // Remember old renderer, if overridden, or proxy to default renderer
    const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
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

            if (aIndex < 0) {
                tokens[idx].attrPush(['target', '_blank']); // add new attribute
            } else {
                tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
            }
        }

        const relIndex = tokens[idx].attrIndex('rel');

        if (!href.match(/zooniverse.org/)) {
            // add rel=nofollow to external links
            if (relIndex < 0) {
                tokens[idx].attrPush(['rel', 'nofollow'])
            } else {
                tokens[idx].attrs[relIndex][1] = 'nofollow';
            }
        }

        // pass token to default renderer
        return defaultRender(tokens, idx, options, env, self);
    };
}

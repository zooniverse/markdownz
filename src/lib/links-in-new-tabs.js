/* 
 markdown-it-links-in-new-tabs.js
 opens links in a new tab if prefixed with +tab+
 accepts options of {prefix: 'your-custom-prefix'}
 'prefix' is the string to use before links for links to open in new tab
 */ 

export default function(md, opts) {
    // Remember old renderer, if overridden, or proxy to default renderer
    var defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    const prefix = (opts && opts.prefix) ? opts.prefix : '+tab+';

    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        var hrefIndex = tokens[idx].attrIndex('href');
        var href = tokens[idx].attrs[hrefIndex][1];

        if (prefix === href.slice(0, prefix.length)) {
            // trim prefix if href starts with prefix
            tokens[idx].attrs[hrefIndex][1] = href.slice(prefix.length, href.length);
            var aIndex = tokens[idx].attrIndex('target');

            if (aIndex < 0) {
                tokens[idx].attrPush(['target', '_blank']); // add new attribute
            } else {
                tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
            }
        }

        // pass token to default renderer
        return defaultRender(tokens, idx, options, env, self);
    };
}

import React from "react";
import MarkdownIt from "markdown-it";
import MarkdownItContainer from "markdown-it-container";
import twemoji from 'twemoji';
import replaceSymbols from '../lib/default-transformer';
import relNofollow from  '../lib/links-rel-nofollow'

import markdownEmoji from 'markdown-it-emoji';
import markdownSub from 'markdown-it-sub';
import markdownSup from 'markdown-it-sup';
import markdownFootnote from 'markdown-it-footnote';
import markdownImsize from 'markdown-it-imsize';
import markdownNewTab from '../lib/links-in-new-tabs';

const markdownIt = function () {
    return new MarkdownIt({linkify: true, breaks: true})
                .use(markdownEmoji)
                .use(markdownSub)
                .use(markdownSup)
                .use(markdownFootnote)
                .use(markdownImsize)
                .use(markdownNewTab)
                .use(MarkdownItContainer, 'partners')
                .use(MarkdownItContainer, 'attribution');
}

export default class Markdown extends React.Component {
    get displayName() {
        return 'Markdown';
    }

    emojify(input) {
        return twemoji.parse(input);
    }

    renderer() {
        if (this.props && this.props.relNofollow) {
            return markdownIt().use(relNofollow)
        } else {
            return markdownIt()
        }
    }

    markdownify(input) {
        if (this.props && this.props.inline) {
            return this.renderer().renderInline(input);
        }
        else {
            return this.renderer().render(input);
        }
    }

    getHtml() {
        try {
            let {project, baseURI} = this.props;

            if (typeof this.props.transform === 'function') {
                return this.emojify(this.markdownify(this.props.transform(this.props.children || this.props.content, {project, baseURI})));
            }
            else {
                return this.emojify(this.markdownify(this.props.children || this.props.content));
            }
        } catch (e) {
            return this.props.children || this.props.content;
        }
    }

    render() {
        var html = this.getHtml();

        return React.createElement(this.props.tag,{
            className: `markdown ${this.props.className}`,
            dangerouslySetInnerHTML: {__html: html}
        });
    }
};

Markdown.defaultProps = {
    tag: 'div',
    content: '',
    inline: false,
    transform: replaceSymbols,
    project: null,
    baseURI: null,
    className: '',
    relNofollow: false
}

import React from "react";
import MarkdownIt from "markdown-it";
import MarkdownItContainer from "markdown-it-container";
import twemoji from 'twemoji';
import replaceSymbols from '../lib/default-transformer';

const markdownIt = new MarkdownIt({linkify: true, breaks: true})
          .use(require('markdown-it-emoji'))
          .use(require('markdown-it-sub'))
          .use(require('markdown-it-sup'))
          .use(require('markdown-it-footnote'))
          .use(require('markdown-it-imsize'))
          .use(require('../lib/links-in-new-tabs'))
          .use(MarkdownItContainer, 'partners')
          .use(MarkdownItContainer, 'attribution');

export default class Markdown extends React.Component {
    get displayName() {
        return 'Markdown';
    }

    emojify(input) {
        return twemoji.parse(input);
    }

    markdownify(input) {
        if (this.props && this.props.inline) {
            return markdownIt.renderInline(input);
        }
        else {
            return markdownIt.render(input);
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
    className: ''
}

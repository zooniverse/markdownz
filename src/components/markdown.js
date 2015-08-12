import React from "react";
import MarkdownIt from "markdown-it";
import MarkdownItContainer from "markdown-it-container";
import twemoji from 'twemoji';
import {State} from 'react-router';
import reactMixin from 'react-mixin';

const markdownIt = new MarkdownIt({linkify: true, breaks: true})
          .use(require('markdown-it-emoji'))
          .use(require('markdown-it-sub'))
          .use(require('markdown-it-sup'))
          .use(require('markdown-it-footnote'))
          .use(MarkdownItContainer, 'partners')
          .use(MarkdownItContainer, 'attribution');

export default class Markdown extends React.Component {
    get displayName() {
        return 'Markdown';
    }

    replaceSymbols(input) {
        // Catch getParams in case we're in a non-routed context like an alert
        var owner, name;
        try {
            ({owner, name} = this.getParams());
        } catch (_) {
            owner = null;
            name = null;
        }

        return input
        // hashtags #tagname
            .replace(/(?!\B[\w+-\/]+\b)\B#(\b[\w+-\/]+\b)/g, function(fullTag, tagName) {
                if (owner && name) {
                    return `<a href='#/projects/${owner}/${name}/talk/search?query=${tagName}'>${fullTag}</a>`;
                }
                else {
                    return `<a href='#/talk/search?query=${tagName}'>${fullTag}</a>`;
                }
            })

        // subjects in a specific project : @owner-slug/project-slug^subject_id
        // \b[\w-]+\b is hyphen boundary for slugs
            .replace(/@(\b[\w-]+\b)\/(\b[\w-]+\b)\^([0-9]+)/g, "<a href='#/projects/$1/$2/talk/subjects/$3'>$1/$2 - Subject $3</a>")

            .replace(/\^([0-9]+)/g, function(_, subjectID) {
                if (owner && name) {
                    return `<a href='#/projects/${owner}/${name}/talk/subjects/${subjectID}'>${owner}/${name} - Subject ${subjectID}</a>`;
                }
                else {
                    return subjectID;
                }
            })

        // user mentions : @username
            .replace(/\B@(\b[\w-]+\b)/g, "<a href='#/users/$1'>@$1</a>")

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
            return this.replaceSymbols(this.emojify(this.markdownify(this.props.children || this.props.content)));
        } catch (e) {
            return this.props.children || this.props.content;
        }
    }

    render() {
        var html = this.getHtml()

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
    className: ''
}

reactMixin.onClass(Markdown, State);

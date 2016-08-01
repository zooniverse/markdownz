import React from 'react';
import Markdown from './markdown.jsx';
import m from '../lib/markdown-insert';
import replaceSymbols from '../lib/default-transformer';

var NOOP = Function.prototype;

export default class MarkdownEditor extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            previewing: false
        };
    }

    get value() {
        return this.refs.textarea.value;
    }

    onInsertLinkClick() {
        this.wrapSelectionIn(m.hrefLink);
    }

    onInsertImageClick() {
        this.wrapSelectionIn(m.imageLink);
    }
    
    onInsertVideoClick() {
        this.wrapSelectionIn(m.videoLink);
    }

    onBoldClick() {
        this.wrapSelectionIn(m.bold);
    }

    onItalicClick() {
        this.wrapSelectionIn(m.italic);
    }

    onHeadingClick() {
        this.wrapSelectionIn(m.heading, {ensureNewLine: true});
    }

    onQuoteClick() {
        this.wrapSelectionIn(m.quote, {ensureNewLine: true});
    }

    onHorizontalRuleClick() {
        this.wrapSelectionIn(m.horizontalRule, {ensureNewLine: true});
    }

    onStrikethroughClick() {
        this.wrapSelectionIn(m.strikethrough);
    }

    onBulletClick() {
        this.wrapLinesIn(m.bullet, {ensureNewLine: true});
    }

    onNumberClick() {
        this.wrapLinesIn(m.numberedList, {ensureNewLine: true, incrementLines: true});
    }

    componentWillMount() {
        this.setState({previewing: !!this.props.previewing});
    }

    componentWillReceiveProps(nextProps) {
        // If previewing prop has changed, update internal state
        if (typeof nextProps.previewing === 'boolean') {
            this.setState({
                previewing: nextProps.previewing
            });
        }
    }

    render() {
        var previewIcon;
        if (this.state.previewing) {
            previewIcon = <i className="fa fa-pencil fa-fw"></i>;
        }
        else {
            previewIcon = <i className="fa fa-eye fa-fw"></i>;
        }


        return (
            <div className={`markdown-editor ${this.props.className}`} data-previewing={this.state.previewing || null}>
                <div className="talk-comment-buttons-container">
                    <button type="button" title="link"className='talk-comment-insert-link-button' onClick={this.onInsertLinkClick.bind(this)}>
                        <i className="fa fa-link"></i>
                    </button>
                    <button type="button" title="image" className='talk-comment-insert-image-button' onClick={this.onInsertImageClick.bind(this)}>
                        <i className="fa fa-image"></i>
                    </button>
                    <button type="button" title="video" className='talk-comment-insert-video-button' onClick={this.onInsertVideoClick.bind(this)}>
                        <i className="fa fa-video-camera"></i>
                    </button>
                    <button type="button" title="bold" className='talk-comment-bold-button' onClick={this.onBoldClick.bind(this)}>
                        <i className="fa fa-bold"></i>
                    </button>
                    <button type="button" title="italic" className='talk-comment-italic-button' onClick={this.onItalicClick.bind(this)}>
                        <i className="fa fa-italic"></i>
                    </button>
                    <button type="button" title="block quote" className='talk-comment-insert-quote-button' onClick={this.onQuoteClick.bind(this)}>
                        <i className="fa fa-quote-left"></i> <i className="fa fa-quote-right"></i>
                    </button>
                    <button type="button" title="heading" className='talk-comment-heading-button' onClick={this.onHeadingClick.bind(this)}>
                        <i className="fa fa-header"></i>
                    </button>
                    <button type="button" title="horizontal rule" className='talk-comment-hr-button' onClick={this.onHorizontalRuleClick.bind(this)}>
                        <i className="fa fa-arrows-h"></i>
                    </button>
                    <button type="button" title="strikethrough" className='talk-comment-strikethrough-button' onClick={this.onStrikethroughClick.bind(this)}>
                        <i className="fa fa-strikethrough"></i>
                    </button>
                    <button type="button" title="bulleted list" className='talk-comment-bullet-button' onClick={this.onBulletClick.bind(this)}>
                        <i className="fa fa-list"></i>
                    </button>
                    <button type="button" title="numbered list" className='talk-comment-number-button' onClick={this.onNumberClick.bind(this)}>
                        <i className="fa fa-list-ol"></i>
                    </button>

                    <span className="markdown-editor-controls">
                        <button title={(this.state.previewing) ? "edit" : "preview"} type="button" onClick={this.handlePreviewToggle.bind(this)}>
                            {previewIcon}
                        </button>

                        <button title="help" type="button" onClick={this.handleHelpRequest.bind(this)}>
                            <i className="fa fa-question fa-fw"></i>
                        </button>
                    </span>
                </div>

                <div className="editor-area">
                    <textarea ref="textarea" className="markdown-editor-input" name={this.props.name} placeholder={this.props.placeholder} defaultValue={this.props.defaultValue} value={this.props.value} rows={this.props.rows} cols={this.props.cols} onChange={this.onInputChange.bind(this)} />

                    <Markdown className="markdown-editor-preview" project={this.props.project} baseURI={this.props.baseURI} transform={this.props.transform}>{this.props.value}</Markdown>
                </div>
            </div>
        );
    }

    onInputChange(e) {
        if (this.props.onChange) {
            var value;
            if (e && e.target && e.target.value) {
                value = e.target.value;
            }
            else {
                value = this.refs.textarea.value;
            }
            var event = {
                target: {
                    name: this.props.name,
                    value: value,
                    type: 'textarea',
                    dataset: {}
                }
            };
            this.props.onChange(event);
        }
    }

    handlePreviewToggle() {
        this.setState({previewing: !this.state.previewing});
    }

    handleHelpRequest(e) {
        this.props.onHelp(e);
    }

    wrapSelectionIn(wrapFn, opts = {}) {
        // helper to call markdown-insert functions on the textarea
        // wrapFn takes / returns a string (from ./lib/markdown-insert.cjsx)

        var textarea = this.refs.textarea,
            selection = m.getSelection(textarea),
            text,cursor;

        ({text, cursor} = wrapFn(selection));

        m.insertAtCursor(text, textarea, cursor, opts);
        this.onInputChange();
    }

    wrapLinesIn(wrapFn, opts = {}) {
        var textarea = this.refs.textarea;
        var lines = m.getSelection(textarea).split("\n");

        var formattedText = lines
                .map((line) => wrapFn(line).text)
                .join("\n");

        // increment the line numbers in a list, if that option is specified
        if (opts.incrementLines && opts.ensureNewLine) {
            var begInputValue = textarea.value.substring(0, textarea.selectionStart) + "\n";
            formattedText = m.incrementedListItems(begInputValue, formattedText);
        }

        var cursor = {start: formattedText.length, end: formattedText.length};

        m.insertAtCursor(formattedText, textarea, cursor, opts);
        this.onInputChange();
    }
};

MarkdownEditor.displayName = 'MarkdownEditor';

MarkdownEditor.defaultProps = {
    name: null,
    defaultValue: null,
    value: null,
    placeholder: null,
    rows: 5,
    transform: replaceSymbols,
    onChange: NOOP,
    previewing: null,
    onHelp: NOOP,
    project: null,
    baseURI: null
};

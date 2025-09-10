import { Component } from 'react';
import Markdown from './markdown';
import md from '../lib/markdown-insert';
import replaceSymbols from '../lib/default-transformer';

const NOOP = Function.prototype;

export default class MarkdownEditor extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      previewing: false
    };
  }

  onInsertLinkClick() {
    this.wrapSelectionIn(md.hrefLink);
  }

  get value() {
    return this.textarea.value;
  }

  onInsertImageClick() {
    this.wrapSelectionIn(md.imageLink);
  }

  onInsertVideoClick() {
    this.wrapSelectionIn(md.videoLink);
  }

  onBoldClick() {
    this.wrapSelectionIn(md.bold);
  }

  onItalicClick() {
    this.wrapSelectionIn(md.italic);
  }

  onHeadingClick() {
    this.wrapSelectionIn(md.heading, { ensureNewLine: true });
  }

  onQuoteClick() {
    this.wrapSelectionIn(md.quote, { ensureNewLine: true });
  }

  onHorizontalRuleClick() {
    this.wrapSelectionIn(md.horizontalRule, { ensureNewLine: true });
  }

  onStrikethroughClick() {
    this.wrapSelectionIn(md.strikethrough);
  }

  onBulletClick() {
    this.wrapLinesIn(md.bullet, { ensureNewLine: true });
  }

  onNumberClick() {
    this.wrapLinesIn(md.numberedList, { ensureNewLine: true, incrementLines: true });
  }

  componentWillMount() {
    this.setState({ previewing: !!this.props.previewing });
  }

  componentWillReceiveProps(nextProps) {
    // If previewing prop has changed, update internal state
    if (typeof nextProps.previewing === 'boolean') {
      this.setState({
        previewing: nextProps.previewing
      });
    }
  }

  onInputChange(e) {
    let value;

    if (this.props.onChange) {
      if (e && e.target && e.target.value) {
        value = e.target.value;
      } else {
        value = this.textarea.value;
      }

      this.props.onChange({
        target: {
          name: this.props.name,
          value,
          type: 'textarea',
          dataset: {}
        }
      });
    }
  }

  handlePreviewToggle() {
    this.setState({ previewing: !this.state.previewing });
  }

  handleHelpRequest(e) {
    this.props.onHelp(e);
  }

  wrapSelectionIn(wrapFn, opts = {}) {
    // helper to call markdown-insert functions on the textarea
    // wrapFn takes / returns a string (from ./lib/markdown-insert.js)

    const textarea = this.textarea;
    const selection = md.getSelection(textarea);
    const { text, cursor } = wrapFn(selection);

    md.insertAtCursor(text, textarea, cursor, opts);
    this.onInputChange();
  }

  wrapLinesIn(wrapFn, opts = {}) {
    const textarea = this.textarea;
    const lines = md.getSelection(textarea).split('\n');
    let formattedText = lines.map((line) => wrapFn(line).text).join('\n');

    // increment the line numbers in a list, if that option is specified
    if (opts.incrementLines && opts.ensureNewLine) {
      const begInputValue = textarea.value.substring(0, textarea.selectionStart);
      formattedText = md.incrementedListItems(`${begInputValue}\n`, formattedText);
    }

    const cursor = { start: formattedText.length, end: formattedText.length };

    md.insertAtCursor(formattedText, textarea, cursor, opts);
    this.onInputChange();
  }

  render() {
    let previewIcon;
    if (this.state.previewing) {
      previewIcon = <i className="fa fa-pencil fa-fw" />;
    } else {
      previewIcon = <i className="fa fa-eye fa-fw" />;
    }

    const containerName = `markdown-editor ${this.props.className}`;

    return (
      <div className={containerName} data-previewing={this.state.previewing || null}>
        <div className="talk-comment-buttons-container">
          <button
            type="button"
            title="link"
            className="talk-comment-insert-link-button"
            onClick={() => this.onInsertLinkClick()}
          >
            <i className="fa fa-link" />
          </button>

          <button
            type="button"
            title="image"
            className="talk-comment-insert-image-button"
            onClick={() => this.onInsertImageClick()}
          >
            <i className="fa fa-image" />
          </button>

          <button
            type="button"
            title="video"
            className="talk-comment-insert-video-button"
            onClick={() => this.onInsertVideoClick()}
          >
            <i className="fa fa-video-camera" />
          </button>

          <button
            type="button"
            title="bold"
            className="talk-comment-bold-button"
            onClick={() => this.onBoldClick()}
          >
            <i className="fa fa-bold" />
          </button>

          <button
            type="button"
            title="italic"
            className="talk-comment-italic-button"
            onClick={() => this.onItalicClick()}
          >
            <i className="fa fa-italic" />
          </button>

          <button
            type="button"
            title="block quote"
            className="talk-comment-insert-quote-button"
            onClick={() => this.onQuoteClick()}
          >
            <i className="fa fa-quote-left" /> <i className="fa fa-quote-right" />
          </button>

          <button
            type="button"
            title="heading"
            className="talk-comment-heading-button"
            onClick={() => this.onHeadingClick()}
          >
            <i className="fa fa-header" />
          </button>

          <button
            type="button"
            title="horizontal rule"
            className="talk-comment-hr-button"
            onClick={() => this.onHorizontalRuleClick()}
          >
            <i className="fa fa-arrows-h" />
          </button>

          <button
            type="button"
            title="strikethrough"
            className="talk-comment-strikethrough-button"
            onClick={() => this.onStrikethroughClick()}
          >
            <i className="fa fa-strikethrough" />
          </button>

          <button
            type="button"
            title="bulleted list"
            className="talk-comment-bullet-button"
            onClick={() => this.onBulletClick()}
          >
            <i className="fa fa-list" />
          </button>

          <button
            type="button"
            title="numbered list"
            className="talk-comment-number-button"
            onClick={() => this.onNumberClick()}
          >
            <i className="fa fa-list-ol" />
          </button>

          <span className="markdown-editor-controls">
            <button
              type="button"
              title={(this.state.previewing) ? 'edit' : 'preview'}
              onClick={() => this.handlePreviewToggle()}
            >
              {previewIcon}
            </button>

            <button title="help" type="button" onClick={() => this.handleHelpRequest()}>
              <i className="fa fa-question fa-fw" />
            </button>
          </span>
        </div>

        <div className="editor-area">
          <textarea
            ref={(textarea) => { this.textarea = textarea; }}
            className="markdown-editor-input"
            name={this.props.name}
            placeholder={this.props.placeholder}
            value={this.props.value}
            rows={this.props.rows}
            cols={this.props.cols}
            onChange={(e) => this.onInputChange(e)}
          />

          <Markdown
            className="markdown-editor-preview"
            project={this.props.project}
            baseURI={this.props.baseURI}
            transform={this.props.transform}
            idPrefix={this.props.idPrefix}
          >
            {this.props.value}
          </Markdown>
        </div>
      </div>
    );
  }
}

MarkdownEditor.displayName = 'MarkdownEditor';

MarkdownEditor.defaultProps = {
  name: null,
  value: '',
  placeholder: null,
  rows: 5,
  transform: replaceSymbols,
  onChange: NOOP,
  previewing: null,
  onHelp: NOOP,
  project: null,
  baseURI: null,
  idPrefix: null
};

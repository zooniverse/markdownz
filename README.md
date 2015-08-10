# markdownz [![Build Status](https://travis-ci.org/zooniverse-ui/markdownz.svg?branch=master)](https://travis-ci.org/zooniverse-ui/markdownz) 

Markdown viewer and editor for the [Zooniverse](https://www.zooniverse.org).

[![Sauce Test Status](https://saucelabs.com/browser-matrix/markdownz.svg)](https://saucelabs.com/u/markdownz)

## Usage

Available on [npm](http://npmjs.com), include as a dependency using `npm install --save markdownz`

This package contains two publically accessible components a Markdown viewer and a Markdown editor for Zooniverse-flavoured Markdown:

Viewer:

```jsx
<Mardowkn>{A String of `Markdown`}</Markdown>
```

Editor:
```jsx
<MarkdownEditor rows={20} value={A String of `Markdown`} onChange={this.handleMarkdownChange} />
```

## Supported Properties

### Viewer

| property | default | effect |
|----------|:-------:|--------|
| children  | `null` | Markdown String to Render |
| content | `''` | Markdown String to Render used if `this.props.children` is null |
| tag | `div` | HTML tag to wrap markdown content with |
| className | `''` | css classes for the element |
| inline | `false` | Toggles rendering between `markdownIt.render` and `markdownIt.renderInline`

### Editor

| property | default | effect |
|----------|:-------:|--------|
| name | `''` | Name for the `<textarea>` in the Markdown editor |
| value | `''` | Value of the `<textarea>` in the Markdown editor |
| placeholder | `''` | Placeholder text in the `<textarea>` |
| row | `5` | Height of the `<textarea>` |
| cols | `''` | `null` | Width of `<textarea>` |
| onChange | `NOOP` | Change listener 
| className | `''` | css classes for the element |
| helpText | `null` | String or Component for custom help text for the editor |
| onHelp   | `NOOP` | Function to run when help button is clicked |

## Zooniverse-Flavoured Markdown

We use [markdown-it](https://github.com/markdown-it/markdown-it) for rendering Markdown and [twemoji](https://github.com/twitter/twemoji) for cross-browser emoji support.

TODO: Document custom extensions. 

## Contributing

See [CONTRIBUTING.md](https://github.com/zooniverse-ui/markdownz/tree/master/CONTRIBUTING.md)

## License

Copyright 2015 by The Zooniverse. Licensed under the Apache Public License v2. See [LICENSE](https://github.com/zooniverse-ui/markdownz/tree/master/LICENSE) for details.

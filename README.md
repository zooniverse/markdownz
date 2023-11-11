# markdownz [![Build Status](https://travis-ci.org/zooniverse/markdownz.svg?branch=master)](https://travis-ci.org/zooniverse/markdownz)

Markdown viewer, editor, and help components for the [Zooniverse](https://www.zooniverse.org). Requires React 16.8 or higher.

## Usage

Available on [npm](http://npmjs.com), include as a dependency using `npm install --save markdownz`

This package contains three publicly accessible components: a Markdown viewer and a Markdown editor for Zooniverse-flavored Markdown, and a MarkdownHelp component.

Viewer:

Parse markdown to HTML with `markdown-it`, then render the result as a React component tree with `rehype-react`.

```jsx
import { Markdown } from 'markdownz';

<Markdown>{A String of `Markdown`}</Markdown>
```

Debug the viewer with the `debug` prop:

```jsx
import { Markdown } from 'markdownz';

<Markdown debug>{A String of `Markdown`}</Markdown>
```

Editor:

```jsx
import { MarkdownEditor } from 'markdownz';

<MarkdownEditor rows={20} value="A String of `Markdown`" onChange={this.handleMarkdownChange} />
```

Help:

```jsx
import { MarkdownHelp } from 'markdownz'

<MarkdownHelp talk={true} title={<h1>Guide to Markdown</h1>} />
```

Utilities:

```js
import { utils } from 'markdownz';

const content = `
# A test document

This is a test [with a link](https://www.zooniverse.org).
`
const html = utils.getHTML({ content });
```

```jsx
// render HTML as JSX with utils.getComponentTree
import { utils } from 'markdownz';
const html = '<p>This is a test paragraph, with <a href="https://www.zooniverse.org">a link.</a>';
const markdownChildren = utils.getComponentTree({ html });
return <div>{markdownChildren}</div>;
```

Hooks:

The `useMarkdownz` hook accepts the same props as the `Markdown` component. It returns the parsed content as a React component tree, which can be rendered as JSX or with `React.createElement`;

```jsx
import { useMarkdownz } from 'markdownz';

const markdownChildren = useMarkdownz({ content: 'This is some markdown', debug: true });
return <>{markdownChildren}</>;
```

## Supported Properties

### Viewer

| property | default | effect |
|----------|:-------:|--------|
| children  | `null` | Markdown String to Render |
| components | `null` | Rehype component mappings for the parsed output |
| content | `''` | Markdown String to Render used if `this.props.children` is null |
| debug | `false` | Return error messages, if true, for easier debugging |
| settings | `{}` | Rehype settings for the parsed output |
| tag | `div` | HTML tag to wrap markdown content with |
| className | `''` | css classes for the element |
| project | `null` | Panoptes project for links |
| baseURI | 'null' | Set the base URI for building links |
| inline | `false` | Toggles rendering between `markdownIt.render` and `markdownIt.renderInline`

### Editor

| property | default | effect |
|----------|:-------:|--------|
| name | `''` | Name for the `<textarea>` in the Markdown editor |
| value | `''` | Value of the `<textarea>` in the Markdown editor |
| placeholder | `''` | Placeholder text in the `<textarea>` |
| row | `5` | Height of the `<textarea>` |
| cols | `''` | `null` | Width of `<textarea>` |
| onChange | `NOOP` | Change listener |
| project | `null` | Panoptes project for links |
| baseURI | 'null' | Set the base URI for building links |
| className | `''` | css classes for the element |
| helpText | `null` | String or Component for custom help text for the editor |
| onHelp   | `NOOP` | Function to run when help button is clicked |
| previewing   | false | Toggle the editor's preview mode |

### Help

| property | default | effect |
|----------|:-------:|--------|
| talk | `false`| Toggle the inclusion of Talk-specific Markdown help content |
| title | `<h1 className="markdown-editor-title">Guide to using Markdown</h1>` | Title displayed at the top of the MarkdownHelp component |

## Zooniverse-Flavoured Markdown

We use [markdown-it](https://github.com/markdown-it/markdown-it) for rendering Markdown and [twemoji](https://github.com/twitter/twemoji) for cross-browser emoji support.

TODO: Document custom extensions.

## Contributing

See [CONTRIBUTING.md](https://github.com/zooniverse/markdownz/tree/master/CONTRIBUTING.md)

## Publishing

1. Add the new version to the changelog.
2. `npm version major|minor|patch` to test, build, push and publish a new version tag.
3. Publish a new tagged release on GitHub.

## License

Copyright 2015 by The Zooniverse. Licensed under the Apache Public License v2. See [LICENSE](https://github.com/zooniverse/markdownz/tree/master/LICENSE) for details.

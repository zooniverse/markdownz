# Changelog

## [v9.1.8](https://github.com/zooniverse/markdownz/tree/v9.1.8) (2025-03-05)
Dependency and documentation updates.

## What's Changed
* Update README and package.json publishing steps by @mcbouslog https://github.com/zooniverse/markdownz/pull/250
* Update dependencies - Feb 2025 edition by @shaunanoordin https://github.com/zooniverse/markdownz/pull/263

**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v9.1.7...v9.1.8

## [v9.1.7](https://github.com/zooniverse/markdownz/tree/v9.1.7) (2024-01-18)
Dependency updates. Remove `markdown-it-html5-embed` and replace it with `lib/html5-embed`. Update tests.

## What's Changed
* Upgrade markdown-it (and plugins) to ESM (with CJS fallbacks) by @eatyourgreens in https://github.com/zooniverse/markdownz/pull/237
* [Security] Remove markdown-it-html5-embed by @eatyourgreens in https://github.com/zooniverse/markdownz/pull/245

**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v9.1.6...v9.1.7

## [v9.1.6](https://github.com/zooniverse/markdownz/tree/v9.1.6) (2023-11-30)
Dependency updates.

## What's Changed
* Bump eslint from 8.53.0 to 8.54.0 by @dependabot in https://github.com/zooniverse/markdownz/pull/229
* Bump jsdom from 22.1.0 to 23.0.0 by @dependabot in https://github.com/zooniverse/markdownz/pull/230
* Bump @babel/cli from 7.23.0 to 7.23.4 by @dependabot in https://github.com/zooniverse/markdownz/pull/231


**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v9.1.5...v9.1.6

## [v9.1.5](https://github.com/zooniverse/markdownz/tree/v9.1.5) (2023-11-13)
Dependency updates.

## What's Changed
* Bump @babel/core from 7.23.2 to 7.23.3 by @dependabot in https://github.com/zooniverse/markdownz/pull/226
* Bump @babel/preset-env from 7.23.2 to 7.23.3 by @dependabot in https://github.com/zooniverse/markdownz/pull/228
* Bump @babel/preset-react from 7.22.15 to 7.23.3 by @dependabot in https://github.com/zooniverse/markdownz/pull/227


**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v9.1.4...v9.1.5

## [v9.1.4](https://github.com/zooniverse/markdownz/tree/v9.1.4) (2023-11-06)
Dependency updates.

* Bump eslint-plugin-jsx-a11y from 6.7.1 to 6.8.0 by @dependabot in https://github.com/zooniverse/markdownz/pull/220
* Run CI on Node 20 by @eatyourgreens in https://github.com/zooniverse/markdownz/pull/222
* Bump chai-spies from 1.0.0 to 1.1.0 by @dependabot in https://github.com/zooniverse/markdownz/pull/221
* Bump actions/checkout from 3 to 4 by @dependabot in https://github.com/zooniverse/markdownz/pull/224
* Bump actions/setup-node from 3 to 4 by @dependabot in https://github.com/zooniverse/markdownz/pull/225
* Bump eslint from 8.52.0 to 8.53.0 by @dependabot in https://github.com/zooniverse/markdownz/pull/223

**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v9.1.3...v9.1.4

## [v9.1.3](https://github.com/zooniverse/markdownz/tree/v9.1.3) (2023-10-31)
Bugfix: handle null values as empty strings.


**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v9.1.2...v9.1.3

## [v9.1.2](https://github.com/zooniverse/markdownz/tree/v9.1.2) (2023-10-31)
Bugfix: cast all input values to strings.


**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v9.1.1...v9.1.2

## [v9.1.1](https://github.com/zooniverse/markdownz/tree/v9.1.1) (2023-10-31)
- Optimise Markdown and useMarkdownz by @eatyourgreens in https://github.com/zooniverse/markdownz/pull/217


**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v9.1.0...v9.1.1

## [v9.1.0](https://github.com/zooniverse/markdownz/tree/v9.1.0) (2023-10-31)
- Refactor `Markdownz` as a functional component.
- Refactor the Rehype code into `utils.getComponentTree`.
- Return a React component tree from the `useMarkdownz` hook.

```jsx
// render HTML as JSX
import { utils } from 'markdownz';
const html = '<p>This is a test paragraph, with <a href="https://www.zooniverse.org">a link.</a>';
const reactChildren = utils.getComponentTree({ html });
return <div>{reactChildren}</div>;
```

```jsx
import { useMarkdownz } from 'markdownz';

const markdownChildren = useMarkdownz({ content: 'This is some markdown', debug: true });
return <>{markdownChildren}</>;
```

**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v9.0.0...v9.1.0

## [v9.0.0](https://github.com/zooniverse/markdownz/tree/v9.0.0) (2023-10-30)
Remove `dangerouslySetInnerHTML`. Render the HTML output with `rehype-react`.

**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v8.5.0...v9.0.0

## [v8.5.0](https://github.com/zooniverse/markdownz/tree/v8.5.0) (2023-10-30)
Add a `useMarkdownz` hook.

**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v8.4.1...v8.5.0

## [v8.4.1](https://github.com/zooniverse/markdownz/tree/v8.4.1) (2023-10-24)
Dependency updates. Upgrade ESLint from 4 to 8.

**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v8.4.0...v8.4.1

## [v8.4.0](https://github.com/zooniverse/markdownz/tree/v8.4.0) (2023-10-10)
Support tree-shaking with `sideEffects: false`.

**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v8.3.3...v8.4.0

## [v8.3.3](https://github.com/zooniverse/markdownz/tree/v8.3.3) (2023-10-10)
Support NodeJS runtimes.

* Support DOMPurify on Node by @eatyourgreens in https://github.com/zooniverse/markdownz/pull/206

**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v8.3.2...v8.3.3

## [v8.3.2](https://github.com/zooniverse/markdownz/tree/v8.3.2) (2023-10-06)
Allow embedded YouTube iframes.

* Allow embedded iframes for YouTube content by @eatyourgreens in https://github.com/zooniverse/markdownz/pull/203


**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v8.3.1...v8.3.2

## [v8.3.1](https://github.com/zooniverse/markdownz/tree/v8.3.1) (2023-10-06)
Allow `target=_blank` on external links, in sanitised HTML.

* Allow links to open with target=_blank by @eatyourgreens in https://github.com/zooniverse/markdownz/pull/202


**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v8.3.0...v8.3.1

## [v8.3.0](https://github.com/zooniverse/markdownz/tree/v8.3.0) (2023-10-06)
Require `markdown-it` 13 for all plugins and samitise output HTML by default.

* [Security] Sanitise HTML and update dependencies by @eatyourgreens in https://github.com/zooniverse/markdownz/pull/201


**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v8.2.0...v8.3.0

## [v8.2.0](https://github.com/zooniverse/markdownz/tree/v8.2.0) (2023-10-04)
Allow (@test-user) to be auto-linked as a username mention.

* Allow username mentions in brackets by @eatyourgreens in https://github.com/zooniverse/markdownz/pull/200

**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v8.1.4...v8.2.0

## [v8.1.4](https://github.com/zooniverse/markdownz/tree/v8.1.4) (2023-10-02)
Dependency updates.

* Bump @babel/cli from 7.22.15 to 7.23.0 by @dependabot in https://github.com/zooniverse/markdownz/pull/196
* Bump @babel/core from 7.22.20 to 7.23.0 by @dependabot in https://github.com/zooniverse/markdownz/pull/197
* Bump chai from 4.3.8 to 4.3.10 by @dependabot in https://github.com/zooniverse/markdownz/pull/198
* Bump markdown-it from 13.0.1 to 13.0.2 by @dependabot in https://github.com/zooniverse/markdownz/pull/199


**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v8.1.3...v8.1.4

## [v8.1.3](https://github.com/zooniverse/markdownz/tree/v8.1.3) (2023-09-21)
Split the `className`, `content` and `tag` props out from props that are passed as options to `getHtml`.

* Refactor Markdownz props by @eatyourgreens in https://github.com/zooniverse/markdownz/pull/195


**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v8.1.2...v8.1.3

## [v8.1.2](https://github.com/zooniverse/markdownz/tree/v8.1.2) (2023-09-18)
Add debug mode: `<Markdownz debug>Some content.</Markdown>`.

* Add debug mode by @eatyourgreens in https://github.com/zooniverse/markdownz/pull/194

**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v8.1.1...v8.1.2

## [v8.1.1](https://github.com/zooniverse/markdownz/tree/v8.1.1) (2023-09-17)
Bugfix for 'React is undefined' in v8.1.0.

**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v8.1.0...v8.1.1

## [v8.1.0](https://github.com/zooniverse/markdownz/tree/v8.1.0) (2023-09-17)
Export the HTML utilities separately from the React components.
```js
import { utils } from 'markdownz';

const content = `
# A test document

This is a test [with a link](https://www.zooniverse.org).
`
const html = utils.getHTML({ content });
```

* Bump @babel/register from 7.22.5 to 7.22.15 by @dependabot in https://github.com/zooniverse/markdownz/pull/186
* Bump @babel/preset-react from 7.22.5 to 7.22.15 by @dependabot in https://github.com/zooniverse/markdownz/pull/189
* Bump @babel/core from 7.22.11 to 7.22.20 by @dependabot in https://github.com/zooniverse/markdownz/pull/191
* Bump @babel/cli from 7.22.10 to 7.22.15 by @dependabot in https://github.com/zooniverse/markdownz/pull/187
* Bump @babel/preset-env from 7.22.10 to 7.22.20 by @dependabot in https://github.com/zooniverse/markdownz/pull/192
* Export HTML utilities by @eatyourgreens in https://github.com/zooniverse/markdownz/pull/193


**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v8.0.7...v8.1.0

## [v8.0.7](https://github.com/zooniverse/markdownz/tree/v8.0.7) (2023-08-29)

* Bump @babel/cli from 7.22.5 to 7.22.6 by @dependabot in https://github.com/zooniverse/markdownz/pull/169
* Bump @babel/core from 7.22.5 to 7.22.8 by @dependabot in https://github.com/zooniverse/markdownz/pull/170
* Bump @babel/preset-env from 7.22.5 to 7.22.7 by @dependabot in https://github.com/zooniverse/markdownz/pull/171
* Bump @babel/preset-env from 7.22.7 to 7.22.9 by @dependabot in https://github.com/zooniverse/markdownz/pull/172
* Bump @babel/core from 7.22.8 to 7.22.9 by @dependabot in https://github.com/zooniverse/markdownz/pull/174
* Bump @babel/cli from 7.22.6 to 7.22.9 by @dependabot in https://github.com/zooniverse/markdownz/pull/173
* Bump eslint-plugin-react from 7.32.2 to 7.33.0 by @dependabot in https://github.com/zooniverse/markdownz/pull/175
* Bump eslint-plugin-react from 7.33.0 to 7.33.1 by @dependabot in https://github.com/zooniverse/markdownz/pull/176
* Bump @babel/cli from 7.22.9 to 7.22.10 by @dependabot in https://github.com/zooniverse/markdownz/pull/178
* Bump eslint-plugin-import from 2.27.5 to 2.28.0 by @dependabot in https://github.com/zooniverse/markdownz/pull/177
* Bump @babel/preset-env from 7.22.9 to 7.22.10 by @dependabot in https://github.com/zooniverse/markdownz/pull/180
* Bump @babel/core from 7.22.9 to 7.22.10 by @dependabot in https://github.com/zooniverse/markdownz/pull/179
* Bump eslint-plugin-import from 2.28.0 to 2.28.1 by @dependabot in https://github.com/zooniverse/markdownz/pull/181
* Bump eslint-plugin-react from 7.33.1 to 7.33.2 by @dependabot in https://github.com/zooniverse/markdownz/pull/182
* Bump @babel/core from 7.22.10 to 7.22.11 by @dependabot in https://github.com/zooniverse/markdownz/pull/183
* Bump chai from 4.3.7 to 4.3.8 by @dependabot in https://github.com/zooniverse/markdownz/pull/184

**Full Changelog**: https://github.com/zooniverse/markdownz/compare/v8.0.6...v8.0.7

## [v8.0.6](https://github.com/zooniverse/markdownz/tree/v8.0.6) (2023-07-10)

* Bump tough-cookie from 4.1.2 to 4.1.3 by @dependabot in https://github.com/zooniverse/markdownz/pull/168

## [v8.0.5](https://github.com/zooniverse/markdownz/tree/v8.0.5) (2023-06-13)

* Bump jsdom from 22.0.0 to 22.1.0 by @dependabot in https://github.com/zooniverse/markdownz/pull/158
* Bump @babel/preset-env from 7.21.5 to 7.22.2 by @dependabot in https://github.com/zooniverse/markdownz/pull/160
* Bump @babel/preset-react from 7.18.6 to 7.22.3 by @dependabot in https://github.com/zooniverse/markdownz/pull/159
* Bump @babel/core from 7.21.8 to 7.22.1 by @dependabot in https://github.com/zooniverse/markdownz/pull/161
* Bump @babel/cli from 7.21.5 to 7.22.5 by @dependabot in https://github.com/zooniverse/markdownz/pull/163
* Bump @babel/core from 7.22.1 to 7.22.5 by @dependabot in https://github.com/zooniverse/markdownz/pull/167
* Bump @babel/preset-react from 7.22.3 to 7.22.5 by @dependabot in https://github.com/zooniverse/markdownz/pull/164
* Bump @babel/register from 7.21.0 to 7.22.5 by @dependabot in https://github.com/zooniverse/markdownz/pull/165
* Bump @babel/preset-env from 7.22.2 to 7.22.5 by @dependabot in https://github.com/zooniverse/markdownz/pull/166

## [v8.0.4](https://github.com/zooniverse/markdownz/tree/v8.0.4) (2023-05-11)

* Bump jsdom from 21.1.0 to 21.1.1 by @dependabot in https://github.com/zooniverse/markdownz/pull/147
* Bump @babel/core from 7.21.0 to 7.21.3 by @dependabot in https://github.com/zooniverse/markdownz/pull/148
* Bump @twemoji/api from 14.1.0 to 14.1.1 by @dependabot in https://github.com/zooniverse/markdownz/pull/149
* Bump @twemoji/api from 14.1.1 to 14.1.2 by @dependabot in https://github.com/zooniverse/markdownz/pull/150
* Bump @babel/preset-env from 7.20.2 to 7.21.5 by @dependabot in https://github.com/zooniverse/markdownz/pull/153
* Bump @babel/core from 7.21.3 to 7.21.8 by @dependabot in https://github.com/zooniverse/markdownz/pull/157
* Bump @babel/cli from 7.21.0 to 7.21.5 by @dependabot in https://github.com/zooniverse/markdownz/pull/155
* Bump jsdom from 21.1.1 to 22.0.0 by @dependabot in https://github.com/zooniverse/markdownz/pull/156

## [v8.0.3](https://github.com/zooniverse/markdownz/tree/v8.0.3) (2023-03-01)

* Bump eslint-plugin-import from 2.27.4 to 2.27.5 by @dependabot in https://github.com/zooniverse/markdownz/pull/138
* Bump eslint-plugin-react from 7.32.1 to 7.32.2 by @dependabot in https://github.com/zooniverse/markdownz/pull/141
* Build and test with Node 18 by @eatyourgreens in https://github.com/zooniverse/markdownz/pull/142
* Bump markdown-it-anchor from 8.6.6 to 8.6.7 by @dependabot in https://github.com/zooniverse/markdownz/pull/143
* Bump @babel/core from 7.20.12 to 7.21.0 by @dependabot in https://github.com/zooniverse/markdownz/pull/146
* Bump @babel/register from 7.18.9 to 7.21.0 by @dependabot in https://github.com/zooniverse/markdownz/pull/144
* Bump @babel/cli from 7.20.7 to 7.21.0 by @dependabot in https://github.com/zooniverse/markdownz/pull/145

## [v8.0.2](https://github.com/zooniverse/markdownz/tree/v8.0.2) (2023-01-23)

* Bump eslint-plugin-import from 2.26.0 to 2.27.4 by @dependabot in https://github.com/zooniverse/markdownz/pull/134
* Bump eslint-plugin-jsx-a11y from 6.6.1 to 6.7.1 by @dependabot in https://github.com/zooniverse/markdownz/pull/135
* Bump jsdom from 21.0.0 to 21.1.0 by @dependabot in https://github.com/zooniverse/markdownz/pull/139
* Bump eslint-plugin-react from 7.31.11 to 7.32.1 by @dependabot in https://github.com/zooniverse/markdownz/pull/137
* Bump twemoji to 14.1.0 by @eatyourgreens in https://github.com/zooniverse/markdownz/pull/140

## [v8.0.1](https://github.com/zooniverse/markdownz/tree/v8.0.1) (2023-01-12)

* Bump jsdom from 20.0.3 to 21.0.0 by @dependabot in https://github.com/zooniverse/markdownz/pull/132
* use new base url for twemoji by @camallen in https://github.com/zooniverse/markdownz/pull/133

## [v8.0.0](https://github.com/zooniverse/markdownz/tree/v8.0.0) (2023-01-06)

- Build with Babel 7.
- Support the new React automatic runtime.
- Add an ESM build.

## [v7.10.2](https://github.com/zooniverse/markdownz/tree/v7.10.2) (2023-01-06)

**Security**
- `npm audit fix`.

**Merged pull requests:**

- Bump markdown-it-anchor from 8.6.5 to 8.6.6  [\#130](https://github.com/zooniverse/markdownz/pull/130)

## [v7.10.1](https://github.com/zooniverse/markdownz/tree/v7.10.1) (2022-12-15)

**Closed issues:**

- Update link to supported emoji [\#127](https://github.com/zooniverse/markdownz/issues/127)

## [v7.10.0](https://github.com/zooniverse/markdownz/tree/v7.10.0) (2022-12-12)

**Merged pull requests:**

- Bump markdown-it-anchor from 8.4.1 to 8.6.5  [\#123](https://github.com/zooniverse/markdownz/pull/123)
- Bump react-dom from 15.6.2 to 15.7.0 [\#124](https://github.com/zooniverse/markdownz/pull/124)
- Bump twemoji from 13.1.0 to 14.0.2 [\#125](https://github.com/zooniverse/markdownz/pull/125)
- Bump mocha from 10.1.0 to 10.2.0 [\#126](https://github.com/zooniverse/markdownz/pull/126)

## [v7.9.0](https://github.com/zooniverse/markdownz/tree/v7.9.0) (2022-11-28)

**Merged pull requests:**

- Bump react-test-renderer from 15.6.2 to 15.7.0 [\#118](https://github.com/zooniverse/markdownz/pull/118)
- Bump markdown-it from 12.3.2 to 13.0.1  [\#119](https://github.com/zooniverse/markdownz/pull/119)
- Bump eslint-plugin-react from 7.9.1 to 7.31.11 [\#120](https://github.com/zooniverse/markdownz/pull/120)
- Bump jsdom from 16.5.0 to 20.0.3 [\#121](https://github.com/zooniverse/markdownz/pull/121)
- Bump prop-types from 15.7.2 to 15.8.1 [\#122](https://github.com/zooniverse/markdownz/pull/122)

## [v7.8.6](https://github.com/zooniverse/markdownz/tree/v7.8.6) (2022-11-14)

**Merged pull requests:**

- Bump markdown-it-emoji from 2.0.0 to 2.0.2 [\#117](https://github.com/zooniverse/markdownz/pull/117)
- Bump eslint-plugin-import from 2.13.0 to 2.26.0 [\#114](https://github.com/zooniverse/markdownz/pull/114)
- Bump react from 15.6.2 to 15.7.0 [\#113](https://github.com/zooniverse/markdownz/pull/113)

## [v7.8.5](https://github.com/zooniverse/markdownz/tree/v7.8.5) (2022-11-13)

**Merged pull requests:**

- Bump minimatch and mocha [\#112](https://github.com/zooniverse/markdownz/pull/112)

## [v7.8.4](https://github.com/zooniverse/markdownz/tree/v7.8.4) (2022-11-13)

**Merged pull requests:**

- Bump enzyme from 2.8.2 to 3.11.0  [\#104](https://github.com/zooniverse/markdownz/pull/104)
- Bump chai-spies from 0.7.1 to 1.0.0 [\#105](https://github.com/zooniverse/markdownz/pull/105)
- Bump babel-preset-react from 6.16.0 to 6.24.1 [\#106](https://github.com/zooniverse/markdownz/pull/106)
- Bump eslint-plugin-jsx-a11y from 6.0.3 to 6.6.1 [\#108](https://github.com/zooniverse/markdownz/pull/108)
- Bump chai from 3.5.0 to 4.3.7 [\#109](https://github.com/zooniverse/markdownz/pull/109)
- npm audit fix [\#111](https://github.com/zooniverse/markdownz/pull/111)

## [v7.8.3](https://github.com/zooniverse/markdownz/tree/v7.8.3) (2022-10-06)

**Merged pull requests:**

- Bump css-what from 2.1.0 to 2.1.3 [\#103](https://github.com/zooniverse/markdownz/pull/103)

## [v7.8.2](https://github.com/zooniverse/markdownz/tree/v7.8.2) (2022-08-16)

**Merged pull requests:**

- Fix test setup per jsdom update [\#101](https://github.com/zooniverse/markdownz/pull/101)
- \[Security\] Bump jsdom from 9.5.0 to 16.5.0 [\#100](https://github.com/zooniverse/markdownz/pull/100)

## [v7.8.1](https://github.com/zooniverse/markdownz/tree/v7.8.1) (2022-01-18)

**Merged pull requests:**

- Upgrade outdated dependencies [\#99](https://github.com/zooniverse/markdownz/pull/99)

## [v7.8.0](https://github.com/zooniverse/markdownz/tree/v7.8.0) (2022-01-18)

**Security fixes:**

- \[Security\] Bump markdown-it from 8.4.1 to 12.3.2 [\#98](https://github.com/zooniverse/markdownz/pull/98)

## [v7.7.2](https://github.com/zooniverse/markdownz/tree/v7.7.2) (2021-06-09)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v7.7.1...v7.7.2)

**Security fixes:**

- \[Security\] Bump hosted-git-info from 2.6.1 to 2.8.9 [\#91](https://github.com/zooniverse/markdownz/pull/91) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- \[Security\] Bump ua-parser-js from 0.7.14 to 0.7.28 [\#90](https://github.com/zooniverse/markdownz/pull/90) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- \[Security\] Bump lodash from 4.17.20 to 4.17.21 [\#89](https://github.com/zooniverse/markdownz/pull/89) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- \[Security\] npm audit fix [\#88](https://github.com/zooniverse/markdownz/pull/88) ([eatyourgreens](https://github.com/eatyourgreens))
- \[Security\] Bump ini from 1.3.5 to 1.3.8 [\#87](https://github.com/zooniverse/markdownz/pull/87) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- \[Security\] Bump lodash from 4.17.14 to 4.17.20 [\#84](https://github.com/zooniverse/markdownz/pull/84) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

**Merged pull requests:**

- Add noreferrer to untrusted links [\#93](https://github.com/zooniverse/markdownz/pull/93) ([eatyourgreens](https://github.com/eatyourgreens))
- Bump ua-parser-js from 0.7.14 to 0.7.28 [\#92](https://github.com/zooniverse/markdownz/pull/92) ([dependabot[bot]](https://github.com/apps/dependabot))
- Bump nwmatcher from 1.4.1 to 1.4.4 [\#85](https://github.com/zooniverse/markdownz/pull/85) ([dependabot[bot]](https://github.com/apps/dependabot))

## [v7.7.1](https://github.com/zooniverse/markdownz/tree/v7.7.1) (2019-07-22)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v7.7.0...v7.7.1)

**Implemented enhancements:**

- Update plugin to filter out support user account [\#82](https://github.com/zooniverse/markdownz/issues/82)
- Add support to the restricted names list [\#83](https://github.com/zooniverse/markdownz/pull/83) ([srallen](https://github.com/srallen))

## [v7.7.0](https://github.com/zooniverse/markdownz/tree/v7.7.0) (2019-07-17)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v7.6.6...v7.7.0)

**Closed issues:**

- Add `@support` to markdownz help [\#80](https://github.com/zooniverse/markdownz/issues/80)

**Merged pull requests:**

- Update team and support mentions [\#81](https://github.com/zooniverse/markdownz/pull/81) ([lcjohnso](https://github.com/lcjohnso))

## [v7.6.6](https://github.com/zooniverse/markdownz/tree/v7.6.6) (2019-07-11)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v7.6.5...v7.6.6)

**Security fixes:**

- \[Security\] Bump lodash from 4.17.11 to 4.17.14 [\#79](https://github.com/zooniverse/markdownz/pull/79) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- \[Security\] Bump lodash.merge from 4.6.0 to 4.6.2 [\#78](https://github.com/zooniverse/markdownz/pull/78) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

## [v7.6.5](https://github.com/zooniverse/markdownz/tree/v7.6.5) (2019-06-04)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v7.6.4...v7.6.5)

**Security fixes:**

- \[Security\] Bump tar from 4.4.1 to 4.4.9 [\#77](https://github.com/zooniverse/markdownz/pull/77) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- \[Security\] Bump lodash from 4.17.10 to 4.17.11 [\#75](https://github.com/zooniverse/markdownz/pull/75) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- \[Security\] Bump extend from 3.0.1 to 3.0.2 [\#74](https://github.com/zooniverse/markdownz/pull/74) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

## [v7.6.4](https://github.com/zooniverse/markdownz/tree/v7.6.4) (2018-11-05)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v7.6.3...v7.6.4)

**Merged pull requests:**

- Add noopener nofollow with target=\_blank [\#73](https://github.com/zooniverse/markdownz/pull/73) ([eatyourgreens](https://github.com/eatyourgreens))

## [v7.6.3](https://github.com/zooniverse/markdownz/tree/v7.6.3) (2018-07-27)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v7.6.2...v7.6.3)

**Merged pull requests:**

- Run npm audit fix [\#72](https://github.com/zooniverse/markdownz/pull/72) ([srallen](https://github.com/srallen))

## [v7.6.2](https://github.com/zooniverse/markdownz/tree/v7.6.2) (2018-06-27)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v7.6.1...v7.6.2)

**Merged pull requests:**

- Manually update packages based on npm audit warnings [\#70](https://github.com/zooniverse/markdownz/pull/70) ([srallen](https://github.com/srallen))
- add a changelog [\#69](https://github.com/zooniverse/markdownz/pull/69) ([eatyourgreens](https://github.com/eatyourgreens))

## [v7.6.1](https://github.com/zooniverse/markdownz/tree/v7.6.1) (2018-06-21)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v7.6.0...v7.6.1)

**Closed issues:**

- Add new plugin to support HTML5 audio and video [\#60](https://github.com/zooniverse/markdownz/issues/60)

**Merged pull requests:**

- Result of running npm audit fix [\#68](https://github.com/zooniverse/markdownz/pull/68) ([srallen](https://github.com/srallen))

## [v7.6.0](https://github.com/zooniverse/markdownz/tree/v7.6.0) (2018-05-17)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v7.5.0...v7.6.0)

**Merged pull requests:**

- Install react packages as dev dependencies [\#67](https://github.com/zooniverse/markdownz/pull/67) ([eatyourgreens](https://github.com/eatyourgreens))

## [v7.5.0](https://github.com/zooniverse/markdownz/tree/v7.5.0) (2018-03-09)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v7.4.2...v7.5.0)

**Closed issues:**

- Add support for HTML5 audio and video [\#65](https://github.com/zooniverse/markdownz/issues/65)
- Footnote text is not displayed [\#64](https://github.com/zooniverse/markdownz/issues/64)

**Merged pull requests:**

- Add support for \<audio\> and \<video\> [\#66](https://github.com/zooniverse/markdownz/pull/66) ([eatyourgreens](https://github.com/eatyourgreens))

## [v7.4.2](https://github.com/zooniverse/markdownz/tree/v7.4.2) (2018-02-21)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v7.4.1...v7.4.2)

**Merged pull requests:**

- Only process footnote links if component is mounted [\#63](https://github.com/zooniverse/markdownz/pull/63) ([eatyourgreens](https://github.com/eatyourgreens))

## [v7.4.1](https://github.com/zooniverse/markdownz/tree/v7.4.1) (2018-01-19)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v7.4.0...v7.4.1)

**Merged pull requests:**

- Use prop-types [\#61](https://github.com/zooniverse/markdownz/pull/61) ([srallen](https://github.com/srallen))

## [v7.4.0](https://github.com/zooniverse/markdownz/tree/v7.4.0) (2018-01-19)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v7.3.1...v7.4.0)

## [v7.3.1](https://github.com/zooniverse/markdownz/tree/v7.3.1) (2017-08-17)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v7.3.0...v7.3.1)

**Merged pull requests:**

- Fixed list rendering in help component. [\#59](https://github.com/zooniverse/markdownz/pull/59) ([srallen](https://github.com/srallen))

## [v7.3.0](https://github.com/zooniverse/markdownz/tree/v7.3.0) (2017-08-07)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v7.2.1...v7.3.0)

**Closed issues:**

- \[RFC\] Add MarkdownHelp component to Markdownz [\#57](https://github.com/zooniverse/markdownz/issues/57)

**Merged pull requests:**

- Add MarkdownHelp component [\#58](https://github.com/zooniverse/markdownz/pull/58) ([jelliotartz](https://github.com/jelliotartz))

## [v7.2.1](https://github.com/zooniverse/markdownz/tree/v7.2.1) (2017-06-19)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v7.2.0...v7.2.1)

**Merged pull requests:**

- Remove cruft deps and update markdown-it-imsize [\#56](https://github.com/zooniverse/markdownz/pull/56) ([srallen](https://github.com/srallen))

## [v7.2.0](https://github.com/zooniverse/markdownz/tree/v7.2.0) (2017-05-18)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v7.1.0...v7.2.0)

**Merged pull requests:**

- Use callback for refs and use enzyme [\#54](https://github.com/zooniverse/markdownz/pull/54) ([srallen](https://github.com/srallen))

## [v7.1.0](https://github.com/zooniverse/markdownz/tree/v7.1.0) (2017-05-15)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v5.0.0...v7.1.0)

**Closed issues:**

- transpile to es5 and point package.json to use it [\#32](https://github.com/zooniverse/markdownz/issues/32)
- Bundle size gets large when included [\#9](https://github.com/zooniverse/markdownz/issues/9)

**Merged pull requests:**

- React 15.4 [\#52](https://github.com/zooniverse/markdownz/pull/52) ([eatyourgreens](https://github.com/eatyourgreens))
- Bump version [\#51](https://github.com/zooniverse/markdownz/pull/51) ([parrish](https://github.com/parrish))
- Require spacing for @-mentions [\#50](https://github.com/zooniverse/markdownz/pull/50) ([parrish](https://github.com/parrish))
- Transpile and refactor [\#49](https://github.com/zooniverse/markdownz/pull/49) ([parrish](https://github.com/parrish))
- Fix export syntax [\#48](https://github.com/zooniverse/markdownz/pull/48) ([rogerhutchings](https://github.com/rogerhutchings))

## [v5.0.0](https://github.com/zooniverse/markdownz/tree/v5.0.0) (2016-11-22)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v4.1.5...v5.0.0)

**Closed issues:**

- babelify peer dependency [\#35](https://github.com/zooniverse/markdownz/issues/35)

**Merged pull requests:**

- React 15 [\#47](https://github.com/zooniverse/markdownz/pull/47) ([eatyourgreens](https://github.com/eatyourgreens))
- Version bump [\#46](https://github.com/zooniverse/markdownz/pull/46) ([parrish](https://github.com/parrish))
- Add markdown-anchor [\#45](https://github.com/zooniverse/markdownz/pull/45) ([eatyourgreens](https://github.com/eatyourgreens))
- Version bump [\#44](https://github.com/zooniverse/markdownz/pull/44) ([parrish](https://github.com/parrish))
- Add support for table-of-contents [\#43](https://github.com/zooniverse/markdownz/pull/43) ([eatyourgreens](https://github.com/eatyourgreens))

## [v4.1.5](https://github.com/zooniverse/markdownz/tree/v4.1.5) (2016-09-22)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/4.1.5...v4.1.5)

## [4.1.5](https://github.com/zooniverse/markdownz/tree/4.1.5) (2016-09-22)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v3.0.3...4.1.5)

**Implemented enhancements:**

- Add support for embedded youtube videos [\#40](https://github.com/zooniverse/markdownz/pull/40) ([eatyourgreens](https://github.com/eatyourgreens))

**Closed issues:**

- \(Moved to "Panoptes-Front-End"\) [\#41](https://github.com/zooniverse/markdownz/issues/41)
- Example image is broken [\#33](https://github.com/zooniverse/markdownz/issues/33)
- Tests fail under Firefox/IE [\#26](https://github.com/zooniverse/markdownz/issues/26)
- Add rel="nofollow" to external links? [\#22](https://github.com/zooniverse/markdownz/issues/22)

**Merged pull requests:**

- Update packages and fix footnotes [\#42](https://github.com/zooniverse/markdownz/pull/42) ([parrish](https://github.com/parrish))
- Preserve separator when parsing tags [\#39](https://github.com/zooniverse/markdownz/pull/39) ([parrish](https://github.com/parrish))
- Fix Travis [\#38](https://github.com/zooniverse/markdownz/pull/38) ([brian-c](https://github.com/brian-c))
- Parses tags correctly [\#37](https://github.com/zooniverse/markdownz/pull/37) ([parrish](https://github.com/parrish))
- import statements instead of requires [\#36](https://github.com/zooniverse/markdownz/pull/36) ([amy-langley](https://github.com/amy-langley))
- secure links and move to zoo logo from github [\#34](https://github.com/zooniverse/markdownz/pull/34) ([camallen](https://github.com/camallen))
- Support the defaultValue prop... [\#31](https://github.com/zooniverse/markdownz/pull/31) ([brian-c](https://github.com/brian-c))
- Fix hashtag links to correctly go to the hashtag results, and not... [\#30](https://github.com/zooniverse/markdownz/pull/30) ([alexbfree](https://github.com/alexbfree))
- Add previewing prop to readme [\#29](https://github.com/zooniverse/markdownz/pull/29) ([itsravenous](https://github.com/itsravenous))
- Honour preview prop lifecycle [\#28](https://github.com/zooniverse/markdownz/pull/28) ([itsravenous](https://github.com/itsravenous))
- Attempt to fix tests in Firefox/IE [\#27](https://github.com/zooniverse/markdownz/pull/27) ([chrissnyder](https://github.com/chrissnyder))
- Update to React 0.14.x [\#25](https://github.com/zooniverse/markdownz/pull/25) ([chrissnyder](https://github.com/chrissnyder))
- Add rel=nofollow attr to external markdown links  [\#24](https://github.com/zooniverse/markdownz/pull/24) ([aweiksnar](https://github.com/aweiksnar))

## [v3.0.3](https://github.com/zooniverse/markdownz/tree/v3.0.3) (2015-10-09)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v3.0.2...v3.0.3)

## [v3.0.2](https://github.com/zooniverse/markdownz/tree/v3.0.2) (2015-10-09)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v3.0.1...v3.0.2)

## [v3.0.1](https://github.com/zooniverse/markdownz/tree/v3.0.1) (2015-09-28)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v3.0.0...v3.0.1)

**Merged pull requests:**

- Fix markdown insert heading syntax to use \#\# [\#21](https://github.com/zooniverse/markdownz/pull/21) ([aweiksnar](https://github.com/aweiksnar))

## [v3.0.0](https://github.com/zooniverse/markdownz/tree/v3.0.0) (2015-09-25)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v2.5.1...v3.0.0)

**Merged pull requests:**

- Replace symbol generation with markdown [\#20](https://github.com/zooniverse/markdownz/pull/20) ([aweiksnar](https://github.com/aweiksnar))

## [v2.5.1](https://github.com/zooniverse/markdownz/tree/v2.5.1) (2015-09-22)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v2.5.0...v2.5.1)

## [v2.5.0](https://github.com/zooniverse/markdownz/tree/v2.5.0) (2015-09-22)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v2.4.0...v2.5.0)

**Merged pull requests:**

- Add the image-size plugin [\#19](https://github.com/zooniverse/markdownz/pull/19) ([parrish](https://github.com/parrish))

## [v2.4.0](https://github.com/zooniverse/markdownz/tree/v2.4.0) (2015-09-22)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v2.3.0...v2.4.0)

**Merged pull requests:**

- Add \#hashtag delimiter test cases, ignore urls [\#17](https://github.com/zooniverse/markdownz/pull/17) ([aweiksnar](https://github.com/aweiksnar))

## [v2.3.0](https://github.com/zooniverse/markdownz/tree/v2.3.0) (2015-09-22)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v2.2.0...v2.3.0)

**Merged pull requests:**

- Shorten subject link display, add titles [\#18](https://github.com/zooniverse/markdownz/pull/18) ([aweiksnar](https://github.com/aweiksnar))

## [v2.2.0](https://github.com/zooniverse/markdownz/tree/v2.2.0) (2015-09-11)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v2.1.0...v2.2.0)

**Merged pull requests:**

- Adds a list of restricted usernames that won't generate links [\#16](https://github.com/zooniverse/markdownz/pull/16) ([parrish](https://github.com/parrish))

## [v2.1.0](https://github.com/zooniverse/markdownz/tree/v2.1.0) (2015-09-02)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v2.0.1...v2.1.0)

**Closed issues:**

- Incorrect matches [\#11](https://github.com/zooniverse/markdownz/issues/11)

**Merged pull requests:**

- Update tests for prefix change [\#15](https://github.com/zooniverse/markdownz/pull/15) ([aweiksnar](https://github.com/aweiksnar))
- Add markdownit extension to open links in new tabs [\#14](https://github.com/zooniverse/markdownz/pull/14) ([aweiksnar](https://github.com/aweiksnar))

## [v2.0.1](https://github.com/zooniverse/markdownz/tree/v2.0.1) (2015-08-20)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v2.0.0...v2.0.1)

**Merged pull requests:**

- Update subject mention syntax prefix [\#13](https://github.com/zooniverse/markdownz/pull/13) ([aweiksnar](https://github.com/aweiksnar))

## [v2.0.0](https://github.com/zooniverse/markdownz/tree/v2.0.0) (2015-08-20)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v1.0.4...v2.0.0)

**Closed issues:**

- React Router Warnings [\#8](https://github.com/zooniverse/markdownz/issues/8)

**Merged pull requests:**

- Project as prop [\#12](https://github.com/zooniverse/markdownz/pull/12) ([edpaget](https://github.com/edpaget))
- Remove replaceSymbols method, add transform prop [\#10](https://github.com/zooniverse/markdownz/pull/10) ([brian-c](https://github.com/brian-c))

## [v1.0.4](https://github.com/zooniverse/markdownz/tree/v1.0.4) (2015-08-12)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v1.0.3...v1.0.4)

**Merged pull requests:**

- Update markdown \#tag matching [\#7](https://github.com/zooniverse/markdownz/pull/7) ([aweiksnar](https://github.com/aweiksnar))

## [v1.0.3](https://github.com/zooniverse/markdownz/tree/v1.0.3) (2015-08-06)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v1.0.2...v1.0.3)

**Merged pull requests:**

- Fix url/title ordering [\#6](https://github.com/zooniverse/markdownz/pull/6) ([edpaget](https://github.com/edpaget))
- Bump sauce build to node 0.12 [\#4](https://github.com/zooniverse/markdownz/pull/4) ([edpaget](https://github.com/edpaget))

## [v1.0.2](https://github.com/zooniverse/markdownz/tree/v1.0.2) (2015-08-04)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/v1.0.1...v1.0.2)

## [v1.0.1](https://github.com/zooniverse/markdownz/tree/v1.0.1) (2015-08-04)

[Full Changelog](https://github.com/zooniverse/markdownz/compare/3d9ceae8330003d6bafd70aaf773c02177899135...v1.0.1)

**Merged pull requests:**

- Setup zuul to test in sauce labs from travis-ci [\#3](https://github.com/zooniverse/markdownz/pull/3) ([edpaget](https://github.com/edpaget))
- Shallow dom setup & default props fix [\#2](https://github.com/zooniverse/markdownz/pull/2) ([aweiksnar](https://github.com/aweiksnar))
- Setup [\#1](https://github.com/zooniverse/markdownz/pull/1) ([edpaget](https://github.com/edpaget))



\* *This Changelog was automatically generated       by [github_changelog_generator]      (https://github.com/github-changelog-generator/github-changelog-generator)*

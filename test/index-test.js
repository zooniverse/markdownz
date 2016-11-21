import { Markdown, MarkdownEditor } from '../src/index';
import { expect } from 'chai';

describe('Exported Markdown component', () => {
    it('should exist', () => {
        expect(Markdown).to.be.ok;
    });
});

describe('Exported MarkdownEditor component', () => {
    it('should exist', () => {
        expect(MarkdownEditor).to.be.ok;
    });
});

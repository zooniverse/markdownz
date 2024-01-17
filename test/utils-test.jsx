import TestUtils from 'react-dom/test-utils';
import * as utils from '../src/lib/utils';

describe('Utilities', () => {
  describe('#markdownify', () => {
    it('renders markdown', () => {
      const md = utils.markdownify({ input: '# test header' });
      expect(md).to.equal('<h1 id="test-header" tabindex="-1">test header</h1>\n');
    });

    it('opens links in a new tab when prefixed by +tab+', () => {
      const md = utils.markdownify({ input: '[A link](+tab+http://www.google.com)' });
      expect(md).to.equal('<p><a href="http://www.google.com" target="_blank" rel="noopener nofollow noreferrer">A link</a></p>\n');
    });
  });

  describe('#getHtml', () => {
    const errorTransform = () => {
      throw new Error('fail');
    };

    it('returns the formatted html', () => {
      let html = utils.getHtml({ content: 'Test text' });
      expect(html).to.equal('<p>Test text</p>\n');
    });

    it('renders bare child content on error', () => {
      const html = utils.getHtml({ content: 'Test text', transform: errorTransform });
      expect(html).to.equal('Test text');
    });

    it('uses relNofollow when passed as a prop', () => {
      expect(utils.getHtml({ content: '[Test](link)', relNoFollow: true })).to.equal('<p><a rel="nofollow noreferrer" href="link">Test</a></p>\n');
    });

    it('doesn\'t use relNofollow when not passed as a prop', () => {
      expect(utils.getHtml({ content: '[Test](link)' })).to.equal('<p><a href="link">Test</a></p>\n');
    });

    it('opens +tab+ links in a new tab', function () {
      const html = utils.getHtml({ content: '[Test](+tab+https://www.example.com)', inline: true });
        expect(html).to.equal('<a rel="noopener nofollow noreferrer" target="_blank" href="https://www.example.com">Test</a>');
    });

    it('embeds HTML5 video with modified image syntax', function () {
      const html = utils.getHtml({ content: '![This is a video file.](https://panoptes-uploads.zooniverse.org/someVideo.mp4)', inline: true });
      expect(html).to.equal(`<video preload="metadata" controls="">
<source src="https://panoptes-uploads.zooniverse.org/someVideo.mp4" type="video/mp4">
Your browser does not support playing HTML5 video. You can <a download="" href="https://panoptes-uploads.zooniverse.org/someVideo.mp4">download a copy of the video file</a> instead.
</video>`);
    });

    it('embeds HTML5 audio with modified image syntax', function () {
      const html = utils.getHtml({ content: '![This is an audio file.](https://panoptes-uploads.zooniverse.org/someAudio.mp3)', inline: true });
      expect(html).to.equal(`<audio preload="metadata" controls="">
<source src="https://panoptes-uploads.zooniverse.org/someAudio.mp3" type="audio/mpeg">
Your browser does not support playing HTML5 audio. You can <a download="" href="https://panoptes-uploads.zooniverse.org/someAudio.mp3">download a copy of the audio file</a> instead.
</audio>`);
    });

    it('embeds YouTube videos with modified image syntax', function () {
      const html = utils.getHtml({ content: '@[youtube](dQw4w9WgXcQ)', inline: true });
      expect(html).to.equal('<div class="embed-responsive embed-responsive-16by9"><iframe allowfullscreen="" src="https://www.youtube.com/embed/dQw4w9WgXcQ" height="390" width="640" type="text/html" class="embed-responsive-item youtube-player"></iframe></div>');
    });
  });
});

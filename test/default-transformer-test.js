import replaceSymbols from '../src/lib/default-transformer';

describe('default-transformer', () => {
  let project;
  let baseURI;
  beforeEach(() => {
    project = null;
    baseURI = null;
  });

  it('replaces #hashtags with markdown hashtag links', () => {
    const tagLink = replaceSymbols('#test', { project, baseURI });
    expect(tagLink).to.equal('[#test](/talk/search?query=test)');
  });

  it('works in a sentence with multiple tags & a URL', () => {
    const sentence = '#test sentence #tag and url: http://docs.panoptes.apiary.io/#reference/user/users-collection/list-all-users';
    const htmlSentence = replaceSymbols(sentence, { project, baseURI });
    expect(htmlSentence).to.equal('[#test](/talk/search?query=test) sentence [#tag](/talk/search?query=tag) and url: http://docs.panoptes.apiary.io/#reference/user/users-collection/list-all-users');
  });

  it('ignores links with hashes', () => {
    const url = 'http://docs.panoptes.apiary.io/#reference/user/users-collection/list-all-users';
    const markup = replaceSymbols(url, { project, baseURI });
    expect(markup).to.equal(url);
  });

  it('allows delimiters in hashtags', () => {
    ['#test-tag', '#test_tag'].forEach((tag) => {
      const parsedTag = replaceSymbols(tag, { project, baseURI });
      expect(parsedTag).to.equal(`[${tag}](/talk/search?query=${tag.slice(1, tag.length)})`);
    });
  });

  it('replaces ^S<subject_id> mentions with subject links', () => {
    project = { slug: 'test/project' };
    const subjectLink = replaceSymbols('^S123456', { project, baseURI });
    expect(subjectLink).to.equal('[Subject 123456](/projects/test/project/talk/subjects/123456)');
  });

  it('replaces project #hashtag mentions with project links', () => {
    project = { slug: 'test/project' };
    const subjectLink = replaceSymbols('#S123456', { project, baseURI });
    expect(subjectLink).to.equal('[#S123456](/projects/test/project/talk/tags/S123456)');
  });


  it('does not format subject Ids when not in a routed context', () => {
    const subjectLink = replaceSymbols('^S123456', { project, baseURI });
    expect(subjectLink).to.equal('123456');
  });

  it('replaces @username mentions with user links', () => {
    const userLink = replaceSymbols('@testuser', { project, baseURI });
    expect(userLink).to.equal('[@testuser](/users/testuser)');
  });

  it('replaces @user.name mentions with user links', () => {
    const userLink = replaceSymbols('@test.user', { project, baseURI });
    expect(userLink).to.equal('[@test.user](/users/test.user)');
  });

  it('ignores non-separated @-names', () => {
    const nonUserLink = 'https://www.google.com/maps/@38.3462374,-77.978685,16z';
    expect(replaceSymbols(nonUserLink, { project, baseURI })).to.equal(nonUserLink);
  });

  it('it ignores restricted usernames', () => {
    const userLink = replaceSymbols('@admins @moderators @team @researchers @scientists', { project, baseURI });
    expect(userLink).to.equal('@admins @moderators @team @researchers @scientists');
  });

  it('replaces @ownerslug/project-slug^S<subject_id> mentions with links', () => {
    const projectSubjectLink = replaceSymbols('@owner/project-d^S123456', { project, baseURI });

    expect(projectSubjectLink).to.equal('[Subject 123456](/projects/owner/project-d/talk/subjects/123456)');
  });
});

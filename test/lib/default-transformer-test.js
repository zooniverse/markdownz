import replaceSymbols from '../../src/lib/default-transformer';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);

let {expect, spy} = chai;

describe('default-transformer', () => {
    var project, baseURI;
    beforeEach(() => {
        project = null;
        baseURI = null;
    });

    it('replaces #hashtags with hashtag links', () => {
        var tagLink = replaceSymbols('#test', {project, baseURI});
        expect(tagLink).to.equal('<a href="/talk/search?query=test">#test</a>');
    });

    it('replaces #hashtags inside of html without conflicting with urls', () => {
        let html = `<p>#good \n https://www.zooniverse.org/talk/17/1403?page=1&comment=3063</p>`;
        let htmlTagLink = replaceSymbols(html, {project, baseURI});

        expect(htmlTagLink).to.equal(`<p><a href="/talk/search?query=good">#good</a> \n https://www.zooniverse.org/talk/17/1403?page=1&comment=3063</p>`);
    });

    it('ignores links with hashes', () => {
        const url = "http://docs.panoptes.apiary.io/#reference/user/users-collection/list-all-users";
        const markup = replaceSymbols(url, {project, baseURI});

        expect(markup).to.equal(url)
    })

    it('allows delimiters in hashtags', () => {
        ['#test-tag', '#test_tag', '#test.tag'].forEach((tag) => {
            let parsedTag = replaceSymbols(tag, {project, baseURI})
            expect(parsedTag).to.equal(`<a href="/talk/search?query=${tag.slice(1, tag.length)}">${tag}</a>`)
        })
    })

    it('replaces ^S<subject_id> mentions with subject links', () =>{
        project = { slug: "test/project" };
        var subjectLink = replaceSymbols('^S123456', {project, baseURI});;
        expect(subjectLink).to.equal('<a href="/projects/test/project/talk/subjects/123456">test/project - Subject 123456</a>');
    });

    it('does not format subject Ids when not in a routed context', () =>{
        var subjectLink = replaceSymbols('^S123456', {project, baseURI});
        expect(subjectLink).to.equal("123456");
    });

    it('replaces @username mentions with user links', () => {
        const userLink = replaceSymbols('@testuser', {project, baseURI});
        expect(userLink).to.equal('<a href="/users/testuser">@testuser</a>');
    });

    it('replaces @user.name mentions with user links', () => {
        const userLink = replaceSymbols('@test.user', {project, baseURI});
        expect(userLink).to.equal('<a href="/users/test.user">@test.user</a>');
    });

    it('it ignores restricted usernames', () => {
        const userLink = replaceSymbols('@admins @moderators @team @test.user @researchers @scientists', {project, baseURI});
        expect(userLink).to.equal('@admins @moderators @team <a href="/users/test.user">@test.user</a> @researchers @scientists');
    });

    it('replaces @ownerslug/project-slug^S<subject_id> mentions with links', () => {
        var projectSubjectLink = replaceSymbols('@owner/project-d^S123456', {project, baseURI});

        expect(projectSubjectLink).to.equal('<a href="/projects/owner/project-d/talk/subjects/123456">owner/project-d - Subject 123456</a>');
    });
});

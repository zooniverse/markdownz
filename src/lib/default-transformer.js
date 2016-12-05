const tagReplacer = /(^|\s)#([-\w\d]{3,40})/g;
const projectSubjectLinker = /@(\b[\w-]+\b)\/(\b[\w-]+\b)\^S([0-9]+)/g;
const subjectLinker = /\^S([0-9]+)/g;
const userLinker = /\B@(\b[\w-.]+\b)/g;

export default function (input, { project, baseURI }) {
  let owner;
  let name;
  const restrictedUserNames = ['admins', 'moderators', 'researchers', 'scientists', 'team'];
  const prefix = baseURI || '';

  if (project) {
    [owner, name] = project.slug.split('/');
  }

  const replaceProjectSubjects = `[Subject $3](${prefix}/projects/$1/$2/talk/subjects/$3)`;

  function replaceTags(fullTag, separator, tagName) {
    if (owner && name) {
      return `${separator}[#${tagName}](${prefix}/projects/${owner}/${name}/talk/tags/${tagName})`;
    }
    return `${separator}[#${tagName}](${prefix}/talk/search?query=${tagName})`;
  }

  function replaceUsers(_, username) {
    if (restrictedUserNames.indexOf(username) < 0) {
      return `[@${username}](${prefix}/users/${username})`;
    }
    return `@${username}`;
  }

  function replaceSubjects(_, subjectID) {
    if (owner && name) {
      const text = `Subject ${subjectID}`;
      const url = `${prefix}/projects/${owner}/${name}/talk/subjects/${subjectID}`;
      return `[${text}](${url})`;
    }
    return subjectID;
  }

  return input.replace(tagReplacer, replaceTags)
    .replace(projectSubjectLinker, replaceProjectSubjects)
    .replace(subjectLinker, replaceSubjects)
    .replace(userLinker, replaceUsers);
}

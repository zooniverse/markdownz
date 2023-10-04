const tagReplacer = /(^|\s)#([-\w\d]{3,40})/g;
const projectSubjectLinker = /(^|\s)@(\b[\w-]+\b)\/(\b[\w-]+\b)\^S([0-9]+)/g;
const subjectLinker = /(^|\s)\^S([0-9]+)/g;
const userLinker = /(^|\s|\()@([\w\-.]+\b)/g;

export default function (input, { project, baseURI }) {
  let owner;
  let name;
  const restrictedUserNames = ['admins', 'moderators', 'researchers', 'scientists', 'team', 'support'];
  const prefix = baseURI || '';

  if (project) {
    [owner, name] = project.slug.split('/');
  }

  const replaceProjectSubjects = `[Subject $4](${prefix}/projects/$2/$3/talk/subjects/$4)`;

  function replaceTags(fullTag, separator, tagName) {
    if (owner && name) {
      return `${separator}[#${tagName}](${prefix}/projects/${owner}/${name}/talk/tags/${tagName})`;
    }
    return `${separator}[#${tagName}](${prefix}/talk/search?query=${tagName})`;
  }

  function replaceUsers(_, seperator, username) {
    if (restrictedUserNames.indexOf(username) < 0) {
      return `${seperator}[@${username}](${prefix}/users/${username})`;
    }
    return `${seperator}@${username}`;
  }

  function replaceSubjects(_, seperator, subjectID) {
    if (owner && name) {
      const text = `Subject ${subjectID}`;
      const url = `${prefix}/projects/${owner}/${name}/talk/subjects/${subjectID}`;
      return `${seperator}[${text}](${url})`;
    }
    return subjectID;
  }

  return input.replace(tagReplacer, replaceTags)
    .replace(projectSubjectLinker, replaceProjectSubjects)
    .replace(subjectLinker, replaceSubjects)
    .replace(userLinker, replaceUsers);
}

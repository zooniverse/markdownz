export default function(input, {project, baseURI}) {
    let owner, name, restrictedUserNames;
    if (project) {
        [owner, name] = project.slug.split("/");
    }
    if (!baseURI) {
        baseURI = "";
    }

    restrictedUserNames = ['admins', 'moderators', 'researchers', 'scientists', 'team'];

    return input
    // hashtags #tagname
        .replace(/(?:^|\s)\#([-\w\d]{3,40})/g, function(fullTag, tagName) {
            if (owner && name) {
                return `[#${tagName}](${baseURI}/projects/${owner}/${name}/talk/tags/${tagName})`
            }
            else {
                return `[#${tagName}](${baseURI}/talk/search?query=${tagName})`
            }
        })

    // subjects in a specific project : @owner-slug/project-slug^Ssubject_id
    // \b[\w-]+\b is hyphen boundary for slugs

        .replace(/@(\b[\w-]+\b)\/(\b[\w-]+\b)\^S([0-9]+)/g, `[Subject $3](${baseURI}/projects/$1/$2/talk/subjects/$3)`)

        .replace(/\^S([0-9]+)/g, function(_, subjectID) {
            if (owner && name) {
                return `[Subject ${subjectID}](${baseURI}/projects/${owner}/${name}/talk/subjects/${subjectID})`
            }
            else {
                return subjectID;
            }
        })

    // user mentions : @username
        .replace(/\B@(\b[\w-.]+\b)/g, function(_, username) {
          if(restrictedUserNames.indexOf(username) < 0) {
              return `[@${username}](${baseURI}/users/${username})`

          } else {
              return '@' + username;
          }
        });

}

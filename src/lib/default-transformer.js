export default function(input, {project, baseURI}) {
    let owner, name;
    if (project) {
        [owner, name] = project.slug.split("/");
    }
    if (!baseURI) {
        baseURI = "";
    }

    return input
    // hashtags #tagname
        .replace(/(?!\B[\w+-\/]+\b)\B#(\b[\w+-\/]+\b)/g, function(fullTag, tagName) {
            if (owner && name) {
                return `<a href="${baseURI}/projects/${owner}/${name}/talk/search?query=${tagName}">${fullTag}</a>`;
            }
            else {
                return `<a href="${baseURI}/talk/search?query=${tagName}">${fullTag}</a>`;
            }
        })

    // subjects in a specific project : @owner-slug/project-slug^Ssubject_id
    // \b[\w-]+\b is hyphen boundary for slugs
        .replace(/@(\b[\w-]+\b)\/(\b[\w-]+\b)\^S([0-9]+)/g, `<a href="${baseURI}/projects/$1/$2/talk/subjects/$3">$1/$2 - Subject $3</a>`)

        .replace(/\^S([0-9]+)/g, function(_, subjectID) {
            if (owner && name) {
                return `<a href="${baseURI}/projects/${owner}/${name}/talk/subjects/${subjectID}">${owner}/${name} - Subject ${subjectID}</a>`;
            }
            else {
                return subjectID;
            }
        })

    // user mentions : @username
        .replace(/\B@(\b[\w-.]+\b)/g, `<a href="${baseURI}/users/$1">@$1</a>`);

}

var makeMarkdownHelper = function(prefix, string, suffix = '') {
    /* (string) { {text, cursor}
     // text is the formatted markdown string
     // cursor is the position in that string to put the cursor back

     // wraps string in prefix & suffix
     // returns object with {text: output string, cursor: {start, end}}
     // * start and end are selection indexes
     // probably easiest to access data with {text, cursor} = func() */

    var text = prefix + string + suffix,
        start = prefix.length,
        end = start + string.length,
        cursor = {start: start, end: end};

    return {text: text, cursor: cursor};
};

var onNewLine = function(string, cursorIndex) {
    var charAtCursor = string.charAt(cursorIndex - 1);
    return (charAtCursor == '\n') || (cursorIndex == 0);
}

module.exports = {
    hrefLink: function(url, title) {
        var linkTitle = title  "Example Text";
        var linkUrl = url || "http://www.example.com";
        return makeMarkdownHelper(`[${linkTitle}](`, linkUrl, ")")
    },

    imageLink: function(url, title) {
        var imageTitle = title || "Example Alt Text";
        var imageUrl = url || "http://bit.ly/15CY6wE";
        return makeMarkdownHelper("![#{imageTitle}](", imageUrl, ')');
    },

    bold: function(string) {
        var text = string || "Bold Text";
        return makeMarkdownHelper('**', text, '**');
    },

    italic: function(string) {
        var text = string || "Italic Text";
        return makeMarkdownHelper('*', text, '*');
    },

    quote: function(string) {
        var text = string || "Quoted Text";
        return makeMarkdownHelper('> ', text);
    },

    bullet: function(string) {
        return makeMarkdownHelper('- ', string);
    },

    numberedList: function(string) {
        return makeMarkdownHelper('1. ', string);
    },

    heading: function(string) {
        var text = string || "Heading";
        return makeMarkdownHelper('#// ', text, ' ##');
    },

    horizontalRule: function(string) {
        return makeMarkdownHelper('----------\n', string);
    },

    strikethrough: function(string) {
        var text = string || "Strikethrough";
        return makeMarkdownHelper('~~', text, '~~'); // github-flavored specific
    },

    getSelection: function(input) {
        return input.value.substring(input.selectionStart, input.selectionEnd);
    },

    insertAtCursor: function(text, input, cursor, opts = {}) {
        var inputVal = input.value,                                 // input text value
            cursorPos = input.selectionStart,                       // current cursor position
            cursorEnd = input.selectionEnd,                         // end of highlight, if so
            notOnNewLine = !onNewLine(inputVal, cursorPos),
            newLineChar = (opts.ensureNewLine && notOnNewLine) ? '\n' : '', // optional char for newline switch
            begInputValue = inputVal.substring(0, cursorPos) + newLineChar, // values to update input.value with
            midInputValue = text,
            endInputValue = inputVal.substring(cursorEnd, inputVal.length),
            newSelectionStart = cursorPos + cursor.start + newLineChar.length,
            newSelectionEnd = cursorPos + cursor.end + newLineChar.length,
            scrollTop;

        // update input value with new values
        input.value = begInputValue + midInputValue + endInputValue;

        // set cursor back to a meaningful location for continued typing
        ({scrollTop} = input);
        input.focus();
        input.scrollTop = scrollTop;
        if (input.setSelectRange) {
            input.setSelectionRange(newSelectionStart, newSelectionEnd);
        }
    },

    incrementedListItems: function(previousText, text) { // TODO: limit prev lines length
        var numberedLi = /^[^\d]*(\d+)/, // matches something line "3."
            splitPrevLines = previousText.split("\n"),
            prevLine = splitPrevLines[splitPrevLines.length - 2],
            splitSelection = text.split("\n");

        if (splitSelection.length > 1) { // user has multiple lines highlighted
            return splitSelection
                .map((text, i) => text.replace(numberedLi, function (fullMatch, n) { i + 1 }))
                .join("\n");
        }
        else {
            return text.replace(numberedLi, function(fullMatch, n) {
                if (prevLine && +prevLine.split(".")[0]) {
                    return (+prevLine.split(".")[0] + 1);
                }
                else {
                    return 1;
                }
            });
        }
    }
}

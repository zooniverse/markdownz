function makeMarkdownHelper(prefix, string, suffix = '') {
  /* (string) { {text, cursor}
   // text is the formatted markdown string
   // cursor is the position in that string to put the cursor back

   // wraps string in prefix & suffix
   // returns object with {text: output string, cursor: {start, end}}
   // * start and end are selection indexes
   // probably easiest to access data with {text, cursor} = func() */

  const text = prefix + string + suffix;
  const start = prefix.length;
  const end = start + string.length;
  const cursor = { start, end };
  return { text, cursor };
}

function onNewLine(string, cursorIndex) {
  const charAtCursor = string.charAt(cursorIndex - 1);
  return (charAtCursor === '\n') || (cursorIndex === 0);
}

export default {
  hrefLink(title, url) {
    const linkTitle = title || 'Example Text';
    const linkUrl = url || 'https://www.example.com';
    return makeMarkdownHelper(`[${linkTitle}](`, linkUrl, ')');
  },

  imageLink(url, title) {
    const imageTitle = title || 'Example Alt Text';
    const imageUrl = url || 'https://bit.ly/1T3dYw2';
    return makeMarkdownHelper(`![${imageTitle}](`, imageUrl, ')');
  },

  videoLink(url, service) {
    const videoService = service || 'youtube';
    const videoUrl = url || 'https://www.youtube.com/watch?v=cjC94EhAs00';
    return makeMarkdownHelper(`@[${videoService}](`, videoUrl, ')');
  },

  bold(string) {
    const text = string || 'Bold Text';
    return makeMarkdownHelper('**', text, '**');
  },

  italic(string) {
    const text = string || 'Italic Text';
    return makeMarkdownHelper('*', text, '*');
  },

  quote(string) {
    const text = string || 'Quoted Text';
    return makeMarkdownHelper('> ', text);
  },

  bullet(string) {
    return makeMarkdownHelper('- ', string);
  },

  numberedList(string) {
    return makeMarkdownHelper('1. ', string);
  },

  heading(string) {
    const text = string || 'Heading';
    return makeMarkdownHelper('## ', text, ' ##');
  },

  horizontalRule(string) {
    return makeMarkdownHelper('----------\n', string);
  },

  strikethrough(string) {
    const text = string || 'Strikethrough';
    return makeMarkdownHelper('~~', text, '~~');
  },

  getSelection(input) {
    return input.value.substring(input.selectionStart, input.selectionEnd);
  },

  insertAtCursor(text, input, cursor, opts = {}) {
    const inputVal = input.value;
    const cursorPos = input.selectionStart;
    const cursorEnd = input.selectionEnd;
    const notOnNewLine = !onNewLine(inputVal, cursorPos);
    const newLineChar = (opts.ensureNewLine && notOnNewLine) ? '\n' : '';
    const begInputValue = inputVal.substring(0, cursorPos) + newLineChar;
    const midInputValue = text;
    const endInputValue = inputVal.substring(cursorEnd, inputVal.length);
    const newSelectionStart = cursorPos + cursor.start + newLineChar.length;
    const newSelectionEnd = cursorPos + cursor.end + newLineChar.length;
    const scrollPosition = input.scrollTop;

    // update input value with new values
    input.value = begInputValue + midInputValue + endInputValue;
    input.focus();
    input.scrollTop = scrollPosition;
    if (input.setSelectionRange) {
      input.setSelectionRange(newSelectionStart, newSelectionEnd);
    }
  },

  incrementedListItems(previousText, text) {
    const numberedLi = /^[^\d]*(\d+)/;
    const splitPrevLines = previousText.split('\n');
    const prevLine = splitPrevLines[splitPrevLines.length - 2];
    const splitSelection = text.split('\n');

    // user has multiple lines highlighted
    if (splitSelection.length > 1) {
      return splitSelection
        .map((lineText, i) => lineText.replace(numberedLi, () => i + 1))
        .join('\n');
    }

    return text.replace(numberedLi, () => {
      if (prevLine && +prevLine.split('.')[0]) {
        return (+prevLine.split('.')[0] + 1);
      }
      return 1;
    });
  }
};

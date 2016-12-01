import markdownInsert from '../src/lib/markdown-insert.js';

var setCursorStartEnd = function(text,cursor) {

};

describe("markdownInsert", function() {
    var text, cursor;

    describe("#hrefLink", function(){
        beforeEach(() =>{
            ({text,cursor} = markdownInsert.hrefLink("google", "https://google.com"));
        });

        it("should create markdown link", function() {
            expect(text).to.match(/\[[A-z]+\]\(https:\/\/[A-z\.]+\)/);
        });

        it("should set the link href to the first argument", function() {
            expect(text).to.match(/\(https:\/\/google.com\)/);
        });

        it("should set the link name to the second argument", function() {
            expect(text).to.match(/\[google\]/);
        });
    });

    describe("#imageLink", () => {
        beforeEach(() => {
            ({text,cursor} = markdownInsert.imageLink("https://google.com/test.png", "logor"));
        });

        it("should create a markdown image", () => {
            expect(text).to.match(/\![[A-z]+\]\(https:\/\/[A-z\.\/]+\)/);
        });

        it("should include a src attribute from the first argument", () => {
            expect(text).to.match(/\(https:\/\/google.com\/test.png\)/);
        });

        it("should include a src attribute from the second argument", () => {
            expect(text).to.match(/!\[logor\]/);
        });
    });
    
    describe("#videoLink", () => {
        beforeEach(() => {
            ({text,cursor} = markdownInsert.videoLink("https://youtu.be/cjC94EhAs00", "youtube"));
        });

        it("should create a markdown video", () => {
            expect(text).to.match(/\@[[A-z]+\]\(https:\/\/[A-z0-9\.\/]+\)/);
        });

        it("should include a src attribute from the first argument", () => {
            expect(text).to.match(/\(https:\/\/youtu.be\/cjC94EhAs00\)/);
        });

        it("should include a service name from the second argument", () => {
            expect(text).to.match(/@\[youtube\]/);
        });
    });

    describe("#bold", () => {
        it("should wrap the provided string in '**'", () => {
            ({text,cursor} = markdownInsert.bold("blahblah"));
            expect(text).to.match(/^\*\*[A-z]+\*\*$/);
        });
    });

    describe("#italic", () => {
        it("should wrap the provided string in '*'", () => {
            ({text,cursor} = markdownInsert.italic("blahblah"));
            expect(text).to.match(/^\*[A-z]+\*$/);
        });
    });

    describe("#quote", () => {
        it("should prefix the provided string with '> '", () => {
            ({text,cursor} = markdownInsert.quote("blahblah"));
            expect(text).to.match(/^>\s[A-z]+$/);
        });
    });

    describe("#bullet", () => {
        it("should prefix the provided string with '- '", () => {
            ({text,cursor} = markdownInsert.bullet("blahblah"));
            expect(text).to.match(/^-\s[A-z]+$/);
        });
    });

    describe("#numberedList", () => {
        it("should prefix the provided string with '- '", () => {
            ({text,cursor} = markdownInsert.numberedList("blahblah"));
            expect(text).to.match(/^1\.\s[A-z]+$/);
        });
    });

    describe("#heading", () => {
        it("should wrap the provided string in '*'", () => {
            ({text,cursor} = markdownInsert.heading("blahblah"));
            expect(text).to.match(/^##\s[A-z]+\s##$/);
        });
    });

    describe("#numberedList", () => {
        it("should prefix the provided string with '----------\\n '", () => {
            ({text,cursor} = markdownInsert.horizontalRule("blahblah"));
            expect(text).to.match(/^----------\n[A-z]+$/);
        });
    });

    describe("#strikethrough", () => {
        it("should wrap the provided string in '~~'", () => {
            ({text,cursor} = markdownInsert.strikethrough("blahblah"));
            expect(text).to.match(/^~~[A-z]+~~$/);
        });
    });

    describe("#getSelection", () => {
        it("should get the selected text inside an input", () => {
            let input = {
                selectionStart: 4,
                selectionEnd: 10,
                value: "A very long rather uninteresting string."
            };
            expect(markdownInsert.getSelection(input)).to.equal("ry lon");
        });
    });

    describe("#insertAtCursor", () => {
        var input;

        beforeEach(() => {
            input = {
                selectionStart: 4,
                selectionEnd: 10,
                value: "A very long rather uninteresting string.",
                scrollTop: 10
            };

            input.focus = function() {
                this.scrollTop = 0;
            };

            input.setSelectionRange = function(start, end) {
                this.selectionStart = start;
                this.selectionEnd = end;
            };
        });

        it("should set .scrollTop to the original value", () => {
            markdownInsert.insertAtCursor("**BOLDMOVE**", input, {start: 1, end: 21});
            expect(input.scrollTop).to.equal(10);
        });

        it("should set selected area to include inserted markdown", () => {
            markdownInsert.insertAtCursor("**BOLDMOVE**", input, {start: 1, end: 21});
            expect(input).to.have.property("selectionStart")
                .that.equals(5);
            expect(input).to.have.property("selectionEnd")
                .that.equals(25);
        });

        it("should call focus", () => {
            let focusSpy = spy.on(input, 'focus');
            markdownInsert.insertAtCursor("**BOLDMOVE**", input, {start: 1, end: 21});
            expect(focusSpy).to.have.been.called();
        });

        it("should update the input value within the selection", () => {
            markdownInsert.insertAtCursor("**BOLDMOVE**", input, {start: 1, end: 21});
            expect(input.value).to.equal("A ve**BOLDMOVE**g rather uninteresting string.");
        });

        context("when an the newline option is passed", () => {
            context("when input.value is not already on a newline", () => { 
                it("should insert a new line character before the inserted text", () => {
                    markdownInsert.insertAtCursor("**BOLDMOVE**", input, {start: 1, end: 21}, {ensureNewLine: true});
                    expect(input.value).to.equal("A ve\n**BOLDMOVE**g rather uninteresting string.");
                });
            });

            context("when input.value is not already on a newline", () => { 
                it("should insert the text", () => {
                    input.selectionStart = 0;
                    input.value = "";
                    markdownInsert.insertAtCursor("**BOLDMOVE**", input, {start: 1, end: 21}, {ensureNewLine: true});
                    expect(input.value).to.equal("**BOLDMOVE**");
                });
            });
        });
    });

    describe("#incrementListItems", () => {
        it("should number multiple lines in order", () => {
            let prevLines = "One\nTwo\nThree";
            let lines = "1. One\n1. Two\n1. Three";
            expect(markdownInsert.incrementedListItems(prevLines, lines)).to
                .equal("1. One\n2. Two\n3. Three");
        });
    });
});

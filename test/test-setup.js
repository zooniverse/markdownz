import {jsdom} from 'node-jsdom';

if (typeof document === 'undefined') {
    global.document = jsdom("<html><head></head><body></body></html>");
    global.window = document.parentWindow;
    global.navigator = {
        userAgent: 'node.js'
    };
}

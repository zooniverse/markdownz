import {expect} from "chai"

describe('The example test', function() {
    it('works', function () {
        var myString = "test string"
        expect(myString).to.be.a('string');
    });
});

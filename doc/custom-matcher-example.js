var customMatchers = {

  toBeGoofy: function (util, customEqualityTesters) {
    return {

      compare: function (actual, expected) {
        if (expected === undefined) {
          expected = '';
        }

        var result = {};
        result.pass = util.equals(actual.hyuk, "gawrsh" + expected, customEqualityTesters);

        if (result.pass) {
          result.message = "Expected " + actual + " not to be quite so goofy";
        } else {

          result.message = "Expected " + actual + " to be goofy, but it was not very goofy";
        }

        return result;
      }
    };
  }
};

describe("Custom matcher: 'toBeGoofy'", function () {

  beforeEach(function () {
    jasmine.addMatchers(customMatchers);
  });

  it("is available on an expectation", function () {
    expect({
      hyuk: 'gawrsh'
    }).toBeGoofy();
  });

  it("can take an 'expected' parameter", function () {
    expect({
      hyuk: 'gawrsh is fun'
    }).toBeGoofy(' is fun');
  });

  it("can be negated", function () {
    expect({
      hyuk: 'this is fun'
    }).not.toBeGoofy();
  });
});

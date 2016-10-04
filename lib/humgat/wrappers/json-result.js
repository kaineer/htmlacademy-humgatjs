// lib/humgat/wrappers/json-result.js

var prettyJson = function(json) {
  return JSON.stringify(json, null, 2);
};

var JsonResult = module.exports = function(humgat) {
  var ho = humgat;

  ho.exitWithJson = function(json) {
    var string;

    try {
      json.log = this.logger.getMessages();
      string = prettyJson(json);
    } catch(err) {
      string = prettyJson({
        result: 'FAILURE',
        reason: 'Не удалось вывести результат',
        error: err.toString()
      });
    }

    console.log(string);
    phantom.exit();
  };

  ho.abortOnFailure = function(reason) {
    this.exitWithJson({
      title: this.title || 'Задание без имени',
      type: 'phantom',
      result: 'FAILURE',
      reason: reason
    });
  };

  ho.exitWithSuiteResults = function() {
    this.exitWithJson({
      title: this.title || 'Задание без имени',
      type: 'phantom',
      result: this.results.getResult(),
      asserts: this.results.getAsserts()
    });
  };
};

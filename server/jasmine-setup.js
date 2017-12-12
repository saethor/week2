require('./globals');


let JasmineConsoleReporter = require('jasmine-console-reporter');
let reporters = require('jasmine-reporters');
let consoleReporter = new JasmineConsoleReporter({
    colors: 1,           // (0|false)|(1|true)|2
    cleanStack: 1,       // (0|false)|(1|true)|2|3
    verbosity: 4,        // (0|false)|1|2|(3|true)|4
    listStyle: 'indent', // "flat"|"indent"
    activity: false
});
let junitReporter = new reporters.JUnitXmlReporter({
    savePath: 'junitreports',
    consolidateAll: false
});
jasmine.getEnv().addReporter(consoleReporter);
jasmine.getEnv().addReporter(junitReporters);
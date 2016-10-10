// lib/index.js

'use strict';

// Как это должно работать
// -----------------------
//
// * Запомнить рабочий каталог и путь к файлу
// * Передать путь к скрипту, как параметр в humgat.js
// * Внутри скрипта прочитать код и заeval-ить
//
// ```javascript
//   var text = fs.read(filename);
//   try {
//     eval(text);
//   } catch(err) {
//     console.log(err.toString());
//     console.log(err.stack.toString());
//     phantom.exit(1);
//   }
// ```
//
// * А в этом коде и будет использован humgat, как уже доступный объект

// Находим конфиг в текущем каталоге, или глубже
var findConfig = require('./humgat/find-config.js');
var config = findConfig();

// Загружаем собственно, humgat
var humgat = require('./humgat/index.js').create(config);
require('./humgat/common.js')(humgat);

var fs = require('fs');
var system = require('system');

var args = system.args;
var relativeScriptPath = args[1];
var fullScriptPath = relativeScriptPath;

var code;

if(!fs.isAbsolute(fullScriptPath)) {
  fullScriptPath =
    fs.workingDirectory + fs.separator + relativeScriptPath;
}

if(fs.exist(fullScriptPath)) {
  /* eslint no-eval: off */
  code = fs.read(fullScriptPath);
  eval(code);
  // Предполагаем, что в скрипте пользователь
  //   * не будет запускать #run()
  //   * и не будет создавать humgat самостоятельно
  humgat.run();
} else {
  // Где скрипт, я вас спрашиваю?
  phantom.exit(1);
}

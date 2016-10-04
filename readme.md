
 * Запомнить рабочий каталог и путь к файлу
 * Передать путь к скрипту, как параметр в humgat.js
 * Внутри скрипта прочитать код и заeval-ить

```javascript
  var text = fs.read(filename);
  try {
    eval(text);
  } catch(err) {
    console.log(err.toString());
    console.log(err.stack.toString());
    phantom.exit(1);
  }
```

 * А в этом коде и будет использован humgat, как уже доступный объект


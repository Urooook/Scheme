# Библиотека для валидации данных
Библиотека предоставлялет удобный API для валидации данных согласно заданной схеме. Библиотека поддерживает расширения новыми правилами валидации, в том числе - асинхронными. Вложенность может быть любой.
## Пример использования:
```ts
const userScheme = scheme.create({
  name: sheme.string.min(5).max(20).check(isUnique /* Функция возвращает промис */),
  age: scheme.number.min(10).max(90),
  desc: scheme.optional.string.max(200)
});

userScheme.validate({
  name: 'Urooook',
  age: 21
});
```

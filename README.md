# Библиотека для валидации данных
Библиотека предоставлялет удобный API для валидации данных согласно заданной схеме. Библиотека поддерживает расширения новыми правилами валидации, в том числе - асинхронными. Вложенность может быть любой.
## Пример использования:
```ts
const scheme = new Scheme();

const userScheme = scheme.create({
  name: sheme.string().min(5).max(20).check(isUnique /* Функция возвращает промис */),
  age: scheme.number().min(10).max(90),
  desc: scheme.optional().string().max(200)
});

userScheme.validate({
  name: 'Urooook',
  age: 21
});
```
### Create:
Метод класса Scheme, который создает правила для валидации данных. Принимает объект с данными и правилами
### Validate:
Метод класса Scheme, который проверяет переданные данные на соответствие правилам, заданным в create
## Типы данных для валидации:
- number() - Возвращает класс [NumberScheme](https://github.com/Urooook/Scheme/tree/main/src/Scheme/NumberScheme)
- string() - Возвращает класс [StringScheme](https://github.com/Urooook/Scheme/tree/main/src/Scheme/StringScheme)
- iterable() - Возвращает класс [IterableScheme](https://github.com/Urooook/Scheme/tree/main/src/Scheme/IterableScheme)
- boolean() - Возвращает класс [BooleanScheme](https://github.com/Urooook/Scheme/tree/main/src/Scheme/BooleanScheme)
- optional() - ВОзвращает класс Scheme. Говорит о том, что значение не обязательное и его можно не прокидывать в validate



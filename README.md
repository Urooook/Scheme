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
Метод класса Scheme, который проверяет переданные данные на соответствие правилам, заданным в create. Возвращает Promise. В then прокидываются ошибки, которые были выявлены на этапе валидации.
## Типы данных для валидации:
- number() - Возвращает класс [NumberScheme](https://github.com/Urooook/Scheme/tree/main/src/Scheme/NumberScheme)
- string() - Возвращает класс [StringScheme](https://github.com/Urooook/Scheme/tree/main/src/Scheme/StringScheme)
- iterable() - Возвращает класс [IterableScheme](https://github.com/Urooook/Scheme/tree/main/src/Scheme/IterableScheme)
- boolean() - Возвращает класс [BooleanScheme](https://github.com/Urooook/Scheme/tree/main/src/Scheme/BooleanScheme)
- optional() - ВОзвращает класс Scheme. Говорит о том, что значение не обязательное и его можно не прокидывать в validate
## Большой пример
```ts

const scheme = new Scheme();
const userScheme = scheme.create({
    age: scheme.number().max(1000).min(10),
    arr: scheme.optional().iterable().lengthMoreThen(8).has('b12dla'),
    name: scheme.optional().string().isTrimmed().email().min(5).max(16).checkIsUnique(() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(false);
        }, 1000)
    })
}).isLowerCase(),
    val: scheme.boolean().isFalse()
});
const a = new Set();
a.add('bla');
a.add('fla');
a.add('ala');
a.add([1,2,3])
userScheme.validate({
     age: 23,
     name: 'kot@sd.ru',
     val: false,
    arr: a
})
     .then((Errors) => console.log(Errors));
```



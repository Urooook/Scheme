# StringScheme
StringScheme - это класс для валидации строк. 
Ниже представлены методы этого класса:
- Проверка есть ли в строке суррогатные пары:
```ts
withSurrogatePairs(realValue?: string): string | StringScheme
```
- Проверка на Email: 
```ts
email(realValue?: string): string | StringScheme
```
- Проверка на дату XX-MM-YYYY: 
```ts
date(realValue?: string): string | StringScheme
```
- Проверка на Url: 
```ts
url(realValue?: string): string | StringScheme
```
- Для проверки уникальности значения. Первым аргументом принимает callback функцию, которая возвращает Promise
```ts
checkIsUnique(func: () => Promise<void | Response | any>, realValue?: string): Promise<any> | NumberScheme 
```
- Соответствует ли строка переданному регулярному выражению:
```ts
matches(regular: RegExp, realValue?: string): string | StringScheme
```
- Для установки минимального порога длины строки
```ts
min(val: number, realValue?: string): string | StringScheme
```
- Для установки максимального порога длины строки
```ts
max(val: number, realValue?: string): string | StringScheme
```
- Проверка на верхний регистр:
```ts
isUpperCase(realValue?: string): string | StringScheme
```
- Проверка на нижний регистр:
```ts
isLowerCase(realValue?: string): string | StringScheme
```
- Есть ли в строке лишние проблемы:
```ts
isTrimmed(realValue?: string): string | StringScheme
```


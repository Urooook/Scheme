# NumberScheme
NumberScheme - это класс для валидации числовых данных. 
Ниже представлены методы этого класса:
- Для установки минимального порога 
```ts
min(val: number, realValue?: number): number | NumberScheme 
```
- Для установки максимального порога
```ts
max(val: number, realValue?: number): number | NumberScheme
```
- Для проверки входит ли заданное число в массив
```ts
notOneOf(value: number[], realValue?: number): number | NumberScheme
``` 
- Позитивное ли число
```ts
positive(realValue?: number): number | NumberScheme
```
- Отрицательное ли число
```ts
negative(realValue?: number): number | NumberScheme
```
- Число больше чем
```ts
moreThen(val: number, realValue?: number): number | NumberScheme 
```
- Число менее чем
```ts
lessThen(val: number, realValue?: number): number | NumberScheme 
```
- Целое ли число
```ts
isInteger(realValue?: number): number | NumberScheme 
```
- Нецелое число 
```ts
isFloat(realValue?: number): number | NumberScheme 
```


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


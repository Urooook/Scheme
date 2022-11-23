# NumberScheme
NumberScheme - это класс для валидации числовых данных. 
Ниже представлены методы этого класса:
```ts min(val: number, realValue?: number): number | NumberScheme ``` // Для установки минимального порога
max(val: number, realValue?: number): number | NumberScheme // Для установки максимального порога
notOneOf(value: number[], realValue?: number): number | NumberScheme // Для проверки входит ли заданное число в массив

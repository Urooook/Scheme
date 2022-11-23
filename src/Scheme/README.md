# IterableScheme
IterableScheme - это класс для валидации Iterable объектов. 
Ниже представлены методы этого класса:
- Для установки минимального количества значений
```ts
min<T>(val: number, realValue?: IterableIterator<T>): IterableIterator<T> | IterableScheme
```
- Для установки максимального количества значений
```ts
max<T>(val: number, realValue?: IterableIterator<T>): IterableIterator<T> | IterableScheme
```
- Длина коллекции больше, чем:
```ts
lengthMoreThen<T>(val: number, realValue?: IterableIterator<T>): IterableIterator<T> | IterableScheme 
```
- Есть ли значение в коллекции:
```ts
has<T>(val: number | string, realValue?: IterableIterator<T>): IterableIterator<T> | IterableScheme
```

import {ValuesObjectNumberElementType} from "../AbstracrScheme";

export default class IterableScheme {
    rulesObj: IterableSchemeObjectType = {
        type: 'iterable',
        * [Symbol.iterator](): Generator<ValuesObjectNumberElementType> {
            const keys = Object.keys(this);
            for (const key of keys) {
                yield {
                    key,
                    value: this[key],
                }
            }
        },
    };

    constructor(obj?: IterableSchemeObjectType) {
        if (obj) {
            this.rulesObj = obj
        }
    }

    min(val: number): IterableScheme;
    min<T>(val: number, realValue: IterableIterator<T>): IterableIterator<T>;
    min<T>(val: number, realValue?: IterableIterator<T>): IterableIterator<T> | IterableScheme {
        if (typeof val === 'number') {
            if (realValue) {
                const iterator = realValue[Symbol.iterator]();
                let count = 0;
                let result = iterator.next();
                while(!result.done){
                    count++;
                    result = iterator.next();
                }
                if(count < val){
                    return realValue;
                } else {
                    throw new Error('Min Iterable Error');
                }
            } else {
                this.rulesObj = {
                    ...this.rulesObj,
                    min: val,
                }
                return new IterableScheme(this.rulesObj)
            }
        } else {
            throw new Error('Must be number')
        }
    }

    max(val: number): IterableScheme;
    max<T>(val: number, realValue: IterableIterator<T>): IterableIterator<T>;
    max<T>(val: number, realValue?: IterableIterator<T>): IterableIterator<T> | IterableScheme {
        if (typeof val === 'number') {
            if (realValue) {
                const iterator = realValue[Symbol.iterator]();
                let count = 0;
                let result = iterator.next();
                while(!result.done){
                    count++;
                    result = iterator.next();
                }
                if(count > val){
                    return realValue;
                } else {
                    throw new Error('Max Iterable Error');
                }
            } else {
                this.rulesObj = {
                    ...this.rulesObj,
                    max: val,
                }
                return new IterableScheme(this.rulesObj)
            }
        } else {
            throw new Error('Must be number')
        }
    }

    lengthMoreThen(val: number): IterableScheme;
    lengthMoreThen<T>(val: number, realValue: IterableIterator<T>): IterableIterator<T>;
    lengthMoreThen<T>(val: number, realValue?: IterableIterator<T>): IterableIterator<T> | IterableScheme {
        if (typeof val === 'number') {
            if (realValue) {
                const iterator = realValue[Symbol.iterator]();
                let count = 0;
                let result = iterator.next();
                while(!result.done){
                    count++;
                    result = iterator.next();
                }
                if(count > val){
                    return realValue;
                } else {
                    throw new Error('LengthMoreThen Iterable Error');
                }
            } else {
                this.rulesObj = {
                    ...this.rulesObj,
                    lengthMoreThen: val,
                }
                return new IterableScheme(this.rulesObj)
            }
        } else {
            throw new Error('Must be number')
        }
    }

    has(val: number | string): IterableScheme;
    has<T>(val: number | string, realValue: IterableIterator<T>): IterableIterator<T>;
    has<T>(val: number | string, realValue?: IterableIterator<T>): IterableIterator<T> | IterableScheme {
        if (typeof val === 'number' || typeof val === 'string') {
            if (realValue) {
                const iterator = realValue[Symbol.iterator]();
                let result = iterator.next();
                while(!result.done){
                    if(result.value === val) {
                        return realValue;
                    }
                    result = iterator.next();
                }
                throw new Error('Has Iterable Error');
                // if(count > val){
                //     return realValue;
                // } else {
                //     throw new Error('Has Iterable Error');
                // }
            } else {
                this.rulesObj = {
                    ...this.rulesObj,
                    has: val,
                }
                return new IterableScheme(this.rulesObj)
            }
        } else {
            throw new Error('Must be number')
        }
    }
}

export type IterableSchemeObjectType = {
    type: 'iterable'
    min?: number
    max?: number
    lengthMoreThen?: number
    has?: number | string
    [Symbol.iterator](): Generator
}
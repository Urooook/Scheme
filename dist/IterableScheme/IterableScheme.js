"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IterableScheme {
    constructor(obj) {
        this.rulesObj = {
            type: 'iterable',
            optional: false,
            *[Symbol.iterator]() {
                const keys = Object.keys(this);
                for (const key of keys) {
                    yield {
                        key,
                        value: this[key],
                    };
                }
            },
        };
        if (obj) {
            this.rulesObj = {
                ...this.rulesObj,
                ...obj
            };
        }
    }
    min(val, realValue) {
        if (typeof val === 'number') {
            if (realValue) {
                const iterator = realValue[Symbol.iterator]();
                let count = 0;
                let result = iterator.next();
                while (!result.done) {
                    count++;
                    result = iterator.next();
                }
                if (count < val) {
                    return realValue;
                }
                else {
                    throw new Error('Min Iterable Error');
                }
            }
            else {
                this.rulesObj = {
                    ...this.rulesObj,
                    min: val,
                };
                return new IterableScheme(this.rulesObj);
            }
        }
        else {
            throw new Error('Must be number');
        }
    }
    max(val, realValue) {
        if (typeof val === 'number') {
            if (realValue) {
                const iterator = realValue[Symbol.iterator]();
                let count = 0;
                let result = iterator.next();
                while (!result.done) {
                    count++;
                    result = iterator.next();
                }
                if (count > val) {
                    return realValue;
                }
                else {
                    throw new Error('Max Iterable Error');
                }
            }
            else {
                this.rulesObj = {
                    ...this.rulesObj,
                    max: val,
                };
                return new IterableScheme(this.rulesObj);
            }
        }
        else {
            throw new Error('Must be number');
        }
    }
    lengthMoreThen(val, realValue) {
        if (typeof val === 'number') {
            if (realValue) {
                const iterator = realValue[Symbol.iterator]();
                let count = 0;
                let result = iterator.next();
                while (!result.done) {
                    count++;
                    result = iterator.next();
                }
                if (count > val) {
                    return realValue;
                }
                else {
                    throw new Error('LengthMoreThen Iterable Error');
                }
            }
            else {
                this.rulesObj = {
                    ...this.rulesObj,
                    lengthMoreThen: val,
                };
                return new IterableScheme(this.rulesObj);
            }
        }
        else {
            throw new Error('Must be number');
        }
    }
    has(val, realValue) {
        if (typeof val === 'number' || typeof val === 'string') {
            if (realValue) {
                const iterator = realValue[Symbol.iterator]();
                let result = iterator.next();
                while (!result.done) {
                    if (result.value === val) {
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
            }
            else {
                this.rulesObj = {
                    ...this.rulesObj,
                    has: val,
                };
                return new IterableScheme(this.rulesObj);
            }
        }
        else {
            throw new Error('Must be number');
        }
    }
}
exports.default = IterableScheme;

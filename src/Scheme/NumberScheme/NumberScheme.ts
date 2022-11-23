import {ValuesObjectNumberElementType} from "../AbstracrScheme";
import {Optional} from "../types/types";
import {NumberSchemeObjectType} from "./numberTypes";

export default class NumberScheme {
    rulesObj: NumberSchemeObjectType = {
        type: 'number',
        optional: false,
        *[Symbol.iterator](): Generator<ValuesObjectNumberElementType> {
            const keys = Object.keys(this);
            for(const key of keys) {
                yield {
                    key,
                    value: this[key],
                }
            }
        },
    };

    constructor(obj?: NumberSchemeObjectType | Optional) {
        if(obj){
            this.rulesObj = {
                ...this.rulesObj,
                ...obj
            }
        }
    }

    min(val: number): NumberScheme;
    min(val: number, realValue: number): number;
    min(val: number, realValue?: number): number | NumberScheme {
        if(typeof val === 'number') {
            if(realValue) {
                if(realValue > val) {
                    return realValue;
                } else {
                    throw new Error('Min error')
                }
            } else {
                this.rulesObj = {
                    ...this.rulesObj,
                    min: val,
                }
                return new NumberScheme(this.rulesObj)
            }
        } else {
            throw new Error('Must be number')
        }
    }

    max(val: number): NumberScheme;
    max(val: number, realValue: number): number;
    max(val: number, realValue?: number): number | NumberScheme {
        if(typeof val === 'number') {
                if(realValue){
                    if(realValue < val) {
                        return realValue;
                    } else {
                        throw new Error('Max error')
                    }
                } else {
                    this.rulesObj = {
                        ...this.rulesObj,
                        max: val,
                    }
                    return new NumberScheme(this.rulesObj)
                }
        } else {
            throw new Error('Not a number')
        }
    }

    notOneOf(value: number[]): NumberScheme;
    notOneOf(value: number[], realValue: number): number;
    notOneOf(value: number[], realValue?: number): number | NumberScheme {
        if (value.length > -1) {
            if (realValue) {
                for (let i = 0; i < value.length; i++) {
                    if (value[i] === realValue) throw new Error('Array includes value');
                }
                return realValue;
            } else {
                for (let i = 0; i < value.length; i++) {
                    if (typeof value[i] !== "number") throw new Error('Array must consist of numbers')
                }
                this.rulesObj = {
                    ...this.rulesObj,
                    notOneOf: value,
                }
            }
            return new NumberScheme(this.rulesObj)
        } else {
            throw new Error('Not Array');
        }
    }

    positive(): NumberScheme;
    positive(realValue: number): number;
    positive(realValue?: number): number | NumberScheme {
        if(realValue){
            if(realValue > 0) {
                return realValue;
            } else {
                throw new Error('Positive error')
            }
        } else {
            this.rulesObj = {
                ...this.rulesObj,
                positive: true,
            }
            return new NumberScheme(this.rulesObj)
        }
    }

    negative(): NumberScheme;
    negative(realValue: number): number;
    negative(realValue?: number): number | NumberScheme {
        if(realValue){
            if(realValue < 0) {
                return realValue;
            } else {
                throw new Error('Negative error')
            }
        } else {
            this.rulesObj = {
                ...this.rulesObj,
                negative: true,
            }
            return new NumberScheme(this.rulesObj)
        }
    }

    moreThen(val: number): NumberScheme;
    moreThen(val: number, realValue: number): number;
    moreThen(val: number, realValue?: number): number | NumberScheme {
        if(typeof val === 'number') {
            if(realValue){
                if(realValue > val) {
                    return realValue;
                } else {
                    throw new Error(`This value less then ${val}`)
                }
            } else {
                this.rulesObj = {
                    ...this.rulesObj,
                    moreThen: val,
                }
                return new NumberScheme(this.rulesObj)
            }
        } else {
            throw new Error('Not a number')
        }
    }

    lessThen(val: number): NumberScheme;
    lessThen(val: number, realValue: number): number;
    lessThen(val: number, realValue?: number): number | NumberScheme {
        if(typeof val === 'number') {
            if(realValue){
                if(realValue < val) {
                    return realValue;
                } else {
                    throw new Error(`This value more then ${val}`)
                }
            } else {
                this.rulesObj = {
                    ...this.rulesObj,
                    lessThen: val,
                }
                return new NumberScheme(this.rulesObj)
            }
        } else {
            throw new Error('Not a number')
        }
    }

    isInteger(): NumberScheme;
    isInteger(realValue: number): number;
    isInteger(realValue?: number): number | NumberScheme {
        if(realValue){
            if(Number.isInteger(realValue)) {
                return realValue;
            } else {
                throw new Error('Integer error')
            }
        } else {
            this.rulesObj = {
                ...this.rulesObj,
                isInteger: true,
            }
            return new NumberScheme(this.rulesObj)
        }
    }

    isFloat(): NumberScheme;
    isFloat(realValue: number): number;
    isFloat(realValue?: number): number | NumberScheme {
        if(realValue){
            if(!Number.isInteger(realValue)) {
                return realValue;
            } else {
                throw new Error('Float error')
            }
        } else {
            this.rulesObj = {
                ...this.rulesObj,
                isFloat: true,
            }
            return new NumberScheme(this.rulesObj)
        }
    }

    checkIsUnique(func: () => Promise<void | Response | any>): NumberScheme;
    checkIsUnique(func: () => Promise<void | Response | any>, realValue: number): Promise<any>;
    checkIsUnique(func: () => Promise<void | Response | any>, realValue?: number): Promise<any> | NumberScheme {
       if(realValue) {
           return new Promise((resolve) => {
               func().then((data) => resolve(data));
           }).then((res) => {
               if(Boolean(res) === true){
                   return realValue;
               } else {
                   throw new Error('Value is not unique')
               }
           }).finally(() => new NumberScheme());
       } else {
           this.rulesObj = {
               ...this.rulesObj,
               checkIsUnique: func,
           }
           return new NumberScheme(this.rulesObj)
       }
    }
}
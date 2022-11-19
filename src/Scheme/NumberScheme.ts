import Scheme from "./Scheme";

export default class NumberScheme {
    numberObj: any = {
        type: 'number',
    };

    constructor(obj?: any) {
        // super();
        if(obj){
            this.numberObj = obj
        }
    }

    min(val: number): NumberScheme;
    min(val: number, realValue: number): boolean;
    min(val: number, realValue?: number): boolean | NumberScheme {
        if(typeof val === 'number') {
            if(realValue) {
                if(realValue > val) {
                    return true;
                } else {
                    throw new Error('Min error')
                }
            } else {
                this.numberObj = {
                    ...this.numberObj,
                    min: val,
                }
            }
            return new NumberScheme(this.numberObj)
        } else {
            throw new Error('Must be number')
        }
    }

    max(val: number): NumberScheme;
    max(val: number, realValue: number): boolean;
    max(val: number, realValue?: number): boolean | NumberScheme {
        if(typeof val === 'number') {
                if(realValue){
                    if(realValue < val) {
                        return true;
                    } else {
                        throw new Error('Max error')
                    }
                } else {
                    this.numberObj = {
                        ...this.numberObj,
                        max: val,
                    }
                }
                return new NumberScheme(this.numberObj)
        } else {
            throw new Error('Max error')
        }
    }

    notOneOf(value: number[]): NumberScheme;
    notOneOf(value: number[], realValue: number): boolean;
    notOneOf(value: number[], realValue?: number): boolean | NumberScheme {
        if (value.length > -1) {
            if (realValue) {
                for (let i = 0; i < value.length; i++) {
                    if (value[i] === realValue) return false;
                }
            } else {
                for (let i = 0; i < value.length; i++) {
                    if (typeof value[i] !== "number") throw new Error('Array must consist of numbers')
                }
                this.numberObj = {
                    ...this.numberObj,
                    notOneOf: value,
                }
            }
            return new NumberScheme(this.numberObj)
        } else {
            throw new Error('Not Array');
        }
    }
}
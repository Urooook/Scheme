import {ValuesObjectNumberElementType} from "../AbstracrScheme";
import NumberScheme from "../NumberScheme";

export default class StringScheme {
    rulesObj: StringSchemeObjectType = {
        type: 'string',
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

    constructor(obj?: any) {
        if(obj){
            this.rulesObj = obj
        }
    }

    min(val: number): StringScheme;
    min(val: number, realValue: string): string;
    min(val: number, realValue?: string): string | StringScheme {
        console.log(val);
        if(typeof val === "number") {
            if(realValue) {
                console.log(123)
                if(realValue.length > val) {
                    return realValue;
                } else {
                    throw new Error('Min error')
                }
            } else {
                this.rulesObj = {
                    ...this.rulesObj,
                    min: val,
                }
                return new StringScheme(this.rulesObj)
            }
        } else {
            throw new Error('Must be number')
        }
    }

    max(val: number): StringScheme;
    max(val: number, realValue: string): string;
    max(val: number, realValue?: string): string | StringScheme {
        if(typeof val === "number") {
            if(realValue){
                if(realValue.length < val) {
                    return realValue;
                } else {
                    throw new Error('Max error')
                }
            } else {
                this.rulesObj = {
                    ...this.rulesObj,
                    max: val,
                }
                return new StringScheme(this.rulesObj)
            }
        } else {
            throw new Error('Not a number')
        }
    }

    matches(val: RegExp): StringScheme;
    matches(val: RegExp, realValue: string): string;
    matches(val: RegExp, realValue?: string): string | StringScheme {
        if(val) {
            if(realValue){
                if(realValue.length < val) {
                    return realValue;
                } else {
                    throw new Error('Max error')
                }
            } else {
                this.rulesObj = {
                    ...this.rulesObj,
                    max: val,
                }
                return new StringScheme(this.rulesObj)
            }
        } else {
            throw new Error('Not a number')
        }
    }


    // checkIsUnique(func: () => Promise<void | Response | any>): NumberScheme;
    // checkIsUnique(func: () => Promise<void | Response | any>, realValue: number): Promise<any>;
    // checkIsUnique(func: () => Promise<void | Response | any>, realValue?: number): Promise<any> | NumberScheme {
    //     if(realValue) {
    //         return new Promise((resolve) => {
    //             func().then((data) => resolve(data));
    //         }).then((res) => {
    //             console.log('res2', res)
    //             if(Boolean(res) === true){
    //                 return true;
    //             } else {
    //                 throw new Error('Value is not unique')
    //             }
    //         }).catch((error) => console.log(error)).finally(() => new NumberScheme());
    //     } else {
    //         this.numberObj = {
    //             ...this.numberObj,
    //             checkIsUnique: func,
    //         }
    //         // console.log(' this.numberObj',  this.numberObj)
    //         return new NumberScheme(this.numberObj)
    //     }
    // }
}

export type PartialStringScheme = Record<string, StringScheme> & {
    [Symbol.iterator](): Generator<StringSchemeObjectType>
}
export type StringSchemeObjectType = {
    type: 'string'
    min?: number
    max?: number
    checkIsUnique?: () => Promise<void | Response | any>
    [Symbol.iterator](): Generator
}
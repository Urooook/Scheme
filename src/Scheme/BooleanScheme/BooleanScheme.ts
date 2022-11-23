import {ValuesObjectNumberElementType} from "../AbstracrScheme";

export default class BooleanScheme {
    rulesObj: BooleanSchemeObjectType = {
        type: 'boolean',
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

    constructor(obj?: BooleanSchemeObjectType) {
        if (obj) {
            this.rulesObj = obj
        }
    }

    isTrue(): BooleanScheme;
    isTrue(realValue: boolean): boolean;
    isTrue(realValue?: boolean): boolean | BooleanScheme {
        if (typeof realValue === 'boolean') {
            if(realValue === true){
                return realValue;
            } else {
                throw new Error('Its not true');
            }
        } else {
            this.rulesObj = {
                ...this.rulesObj,
                isTrue: true,
            }
            return new BooleanScheme(this.rulesObj)
        }
    }

    isFalse(): BooleanScheme;
    isFalse(realValue: boolean): boolean;
    isFalse(realValue?: boolean): boolean | BooleanScheme {
        if (typeof realValue === 'boolean') {
            if(realValue !== true){
                return realValue;
            } else {
                throw new Error('Its not false');
            }
        } else {
            this.rulesObj = {
                ...this.rulesObj,
                isFalse: true,
            }
            return new BooleanScheme(this.rulesObj)
        }
    }
}

export type BooleanSchemeObjectType = {
    type: 'boolean'
    isTrue?: boolean
    isFalse?: boolean
    [Symbol.iterator](): Generator
}
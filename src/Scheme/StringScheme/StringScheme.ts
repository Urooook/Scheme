import {ValuesObjectNumberElementType} from "../AbstracrScheme";
import NumberScheme from "../NumberScheme";


export type Nullable<T> = T | null;

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

    private firstSurrogateRange = [0xd800, 0xdbff];

    private secondSurrogateRange = [0xdc00, 0xdfff];

    private isFirstSurrogate(code: number): boolean {
        return code >= this.firstSurrogateRange[0] && code <= this.firstSurrogateRange[1];
    }

    private isSecondSurrogate(code: number): boolean {
        return code >= this.secondSurrogateRange[0] && code <= this.secondSurrogateRange[1];
    }

    private emailRegExp =  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    private urlRegExp =  /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
    private dateRegExp = /(\d{2}\.){2}(\d{4}| \d{2})(?!\d)/

    constructor(obj?: StringSchemeObjectType) {
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

    matches(regular: RegExp): StringScheme;
    matches(regular: RegExp, realValue: string): string;
    matches(regular: RegExp, realValue?: string): string | StringScheme {
        if(regular) {
            if(realValue){
                if(regular.test(realValue)) {
                    return realValue;
                } else {
                    throw new Error('RegExpError')
                }
            } else {
                this.rulesObj = {
                    ...this.rulesObj,
                    matches: regular,
                }
                return new StringScheme(this.rulesObj)
            }
        } else {
            throw new Error('Not a regular')
        }
    }

    isUpperCase(): StringScheme;
    isUpperCase(realValue: string): string;
    isUpperCase(realValue?: string): string | StringScheme {
        if(realValue){
            if(realValue.toUpperCase() === realValue) {
                return realValue;
            } else {
                throw new Error('UpperCase error');
            }
        } else {
            this.rulesObj = {
                ...this.rulesObj,
                isUpperCase: true,
            }
            return new StringScheme(this.rulesObj)
        }
    }

    isLowerCase(): StringScheme;
    isLowerCase(realValue: string): string;
    isLowerCase(realValue?: string): string | StringScheme {
        if(realValue){
            if(realValue.toLowerCase() === realValue) {
                return realValue;
            } else {
                throw new Error('LowerCase error');
            }
        } else {
            this.rulesObj = {
                ...this.rulesObj,
                isLowerCase: true,
            }
            return new StringScheme(this.rulesObj)
        }
    }

    isTrimmed(): StringScheme;
    isTrimmed(realValue: string): string;
    isTrimmed(realValue?: string): string | StringScheme {
        if(realValue){
            if(realValue.trim() === realValue) {
                return realValue;
            } else {
                throw new Error('Trim error');
            }
        } else {
            this.rulesObj = {
                ...this.rulesObj,
                isTrimmed: true,
            }
            return new StringScheme(this.rulesObj)
        }
    }

    #iterate(string: string): IterableIterator<string> {
        const normalizedString = string.normalize();
        let firstSurrogate: Nullable<number> = null;
        let pointer = 0;
        const self = this;

        return {
            next(): IteratorResult<string> {
                if (pointer >= normalizedString.length) return {done: true, value: undefined};

                const charCode = normalizedString.charCodeAt(pointer);
                if (self.isFirstSurrogate(charCode)) {
                    firstSurrogate = charCode;
                    pointer += 1;
                }

                if (self.isSecondSurrogate(charCode)) {
                    pointer += 1;

                    if (firstSurrogate !== null) {
                        const value = String.fromCharCode(firstSurrogate, charCode);
                        firstSurrogate = null;

                        return {done: false, value};
                    }
                }

                const regularChar = String.fromCharCode(charCode);
                firstSurrogate = null;
                pointer += 1;

                return {done: false, value: regularChar};
            },
            [Symbol.iterator](): IterableIterator<string> {
                return this;
            },
        };
    };

    withSurrogatePairs(): StringScheme;
    withSurrogatePairs(realValue: string): string;
    withSurrogatePairs(realValue?: string): string | StringScheme {
        if(realValue){
            let count = 0;
            for (const el of this.#iterate(realValue)) {
              count++;
            }
            if(count !== realValue.length) {
                return realValue
            } else {
                throw new Error('Not Surrogate Pairs')
            }
        } else {
            this.rulesObj = {
                ...this.rulesObj,
                withSurrogatePairs: true,
            }
            return new StringScheme(this.rulesObj)
        }

    }

    checkIsUnique(func: () => Promise<void | Response | any>): StringScheme;
    checkIsUnique(func: () => Promise<void | Response | any>, realValue: string): Promise<any>;
    checkIsUnique(func: () => Promise<void | Response | any>, realValue?: string): Promise<any> | StringScheme {
        if(realValue) {
            return new Promise((resolve) => {
                func().then((data) => resolve(data));
            }).then((res) => {
                console.log('res2', res)
                if(Boolean(res) === true){
                    return realValue;
                } else {
                    throw new Error('Value is not unique')
                }
            }).finally(() => new StringScheme());
        } else {
            this.rulesObj = {
                ...this.rulesObj,
                checkIsUnique: func,
            }
            return new StringScheme(this.rulesObj)
        }
    }

    email(): StringScheme;
    email(realValue: string): string;
    email(realValue?: string): string | StringScheme {
        if(realValue){
            if(this.emailRegExp.test(realValue)) {
                return realValue;
            } else {
                throw new Error('Not Email')
            }
        } else {
            this.rulesObj = {
                ...this.rulesObj,
                email: true,
            }
            return new StringScheme(this.rulesObj)
        }
    }

    date(): StringScheme;
    date(realValue: string): string;
    date(realValue?: string): string | StringScheme {
        if(realValue){
            if(this.dateRegExp.test(realValue)) {
                return realValue;
            } else {
                throw new Error('Not Date')
            }
        } else {
            this.rulesObj = {
                ...this.rulesObj,
                date: true,
            }
            return new StringScheme(this.rulesObj)
        }
    }

    url(): StringScheme;
    url(realValue: string): string;
    url(realValue?: string): string | StringScheme {
        if(realValue){
            if(this.urlRegExp.test(realValue)) {
                return realValue;
            } else {
                throw new Error('Not Url')
            }
        } else {
            this.rulesObj = {
                ...this.rulesObj,
                url: true,
            }
            return new StringScheme(this.rulesObj)
        }
    }
}

export type PartialStringScheme = Record<string, StringScheme> & {
    [Symbol.iterator](): Generator<StringSchemeObjectType>
}
export type StringSchemeObjectType = {
    type: 'string'
    min?: number
    max?: number
    matches?: RegExp
    isUpperCase?: boolean
    isLowerCase?: boolean
    withSurrogatePairs?: boolean
    email?: boolean
    url?: boolean
    isTrimmed?: boolean
    date?: boolean
    checkIsUnique?: () => Promise<void | Response | any>
    [Symbol.iterator](): Generator
}
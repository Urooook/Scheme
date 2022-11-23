import NumberScheme from "./NumberScheme/NumberScheme";
import {StringSchemeObjectType} from "./StringScheme/stringTypes";
import {BooleanSchemeObjectType} from "./BooleanScheme/boolTypes";
import BooleanScheme from "./BooleanScheme/BooleanScheme";
import IterableScheme from "./IterableScheme/IterableScheme";
import {IterableSchemeObjectType} from "./IterableScheme/iterableTypes";
import StringScheme from "./StringScheme/StringScheme";
import {PartialScheme, SchemeContract, ValidatorTypes} from "./types/types";
import {NumberSchemeObjectType} from "./NumberScheme/numberTypes";


export type ValuesObjectNumberElementType = {
    key: string
    value: NumberScheme
}

export default abstract class AbstractScheme {
    values: PartialScheme;
    errors = [];

    protected constructor() {
    }

    create(obj: Record<string, SchemeContract>): AbstractScheme {
        const valuesObject = {
            ...obj,
            * [Symbol.iterator](): Generator<ValuesObjectNumberElementType> {
                const keys = Object.keys(this);
                for (const key of keys) {
                    if (typeof this[key] === 'function') {
                        return;
                    }
                    yield {
                        key,
                        value: this[key],
                    }
                }
            },
        }
        this.values = valuesObject;
        return this;
    }

    validate(obj: Record<string, number | string | any>) {
        const keys = Object.keys(obj);
        const promises: Array<Promise<void | any>> = [];
        for (const el of this.values) {
            this.errors[el.key] = [];
            if (keys.indexOf(el.key) !== -1) {
                const testPromises = this.#test(el.value.rulesObj, obj[el.key], el.key);
                promises.push(...testPromises)
            } else {
                if (!el.value.rulesObj.optional) {
                    const undErr = Promise.reject(`${el.key} is required`).catch((err) => {
                        this.errors[el.key].push({
                            key: 'Required',
                            error: err,
                        });
                    });
                    promises.push(undErr);
                }
            }
        }
        return Promise.all(promises).then(() => {
            return this.errors
        });
    }

    #test(elem: NumberSchemeObjectType | StringSchemeObjectType | IterableSchemeObjectType | BooleanSchemeObjectType, realValue: number | string, key: string): Array<Promise<void>> {
        let Validator: NumberScheme | StringScheme | IterableScheme | BooleanScheme;

        switch (elem.type) {
            case ValidatorTypes.number: {
                Validator = new NumberScheme();
                break;
            };
            case ValidatorTypes.string: {
                Validator = new StringScheme();
                break;
            }
            case ValidatorTypes.iterable: {
                Validator = new IterableScheme();
                break;
            }
            case ValidatorTypes.boolean: {
                Validator = new BooleanScheme();
                break;
            }
            default: {
                throw new Error('Unknown type');
            }
        }

        const iterator = elem[Symbol.iterator]();
        let result = iterator.next()
        const testPromises = [];
        while (!result.done) {
            result = iterator.next()
            const value: ValuesObjectNumberElementType = result.value;
            if (value && value.key !== 'type' && value.key !== 'optional' && elem.type === (typeof realValue === "object" ? "iterable" : `${typeof realValue}`)) {
                const test = new Promise((resolve) => {
                    const res = typeof elem[value.key] === 'boolean' ? Validator[value.key](realValue) : Validator[value.key](elem[value.key], realValue);
                    resolve(res);
                })
                    .catch((err) => {
                        this.errors[key].push({
                            key: value.key,
                            error: err,
                        });
                    });
                testPromises.push(test)
            } else {
                if (elem.type !== (typeof realValue === "object" ? "iterable" : `${typeof realValue}`)) {
                    const typeError = Promise.reject('Inconsistent types in the creation and validation schema').catch((err) => {
                        this.errors[key].push({
                            key: 'TypeError',
                            error: err,
                        });
                    });
                    testPromises.push(typeError);
                }
            }
        }
        return testPromises;
    }
}

import NumberScheme, {NumberSchemeObjectType, PartialNumberScheme} from "./NumberScheme";
import StringScheme, {StringSchemeObjectType} from "./StringScheme/StringScheme";
import IterableScheme, {IterableSchemeObjectType} from "./IterableScheme/IterableScheme";
import BooleanScheme, {BooleanSchemeObjectType} from "./BooleanScheme/BooleanScheme";

export type ValuesObjectNumberElementType = {
    key: string
    value: NumberScheme
}

export default abstract class AbstractScheme {
    values: PartialNumberScheme;
    errors = [];

    protected constructor() {}

    create(obj: Record<string, NumberScheme | StringScheme | IterableScheme | BooleanScheme>): AbstractScheme {
        console.log(obj)
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
        const promises: Array<Promise<void>> = [];

        for (const el of this.values) {
            if (keys.indexOf(el.key) !== -1) {
                this.errors[el.key] = [];
                const testPromises = this.#test(el.value.rulesObj, obj[el.key], el.key);
                promises.push(...testPromises)
            }
        }
        return Promise.all(promises).then(() => {
            return this.errors
        });
    }

    #test(elem: NumberSchemeObjectType | StringSchemeObjectType | IterableSchemeObjectType | BooleanSchemeObjectType, realValue: number | string, key: string): Array<Promise<void>> {
        let Validator: NumberScheme | StringScheme | IterableScheme | BooleanScheme;
        // console.log('elem', elem)
        switch (elem.type) {
            case 'number': {
                Validator = new NumberScheme();
                break;
            };
            case 'string': {
                Validator = new StringScheme();
                break;
            }
            case 'iterable': {
                Validator = new IterableScheme();
                break;
            }
            case "boolean": {
                Validator = new BooleanScheme();
                break;
            }
            default: {
                throw new Error('Unknown type');
            }
        }
        // console.log(elem)

        const iterator = elem[Symbol.iterator]();
        let result = iterator.next()
        const testPromises = [];
        while (!result.done) {
            // console.log(result);
            result = iterator.next()
            // console.log(result)
            const value: ValuesObjectNumberElementType = result.value;
            // console.log('realValue', realValue)
            if (value && value.key !== 'type') {
                 const test = new Promise( (resolve) => {
                    const result1 = typeof elem[value.key] === 'boolean' ? Validator[value.key](realValue) : Validator[value.key](elem[value.key], realValue);
                    // console.log('result1', result1)
                    resolve(result1);
                })
                    // .then((res) => console.log('res', res))
                    .catch((err) => {
                        this.errors[key].push({
                            key: value.key,
                            error: err,
                        });
                        // console.log('WWWWWWWWWWWWWWWWWWWWW',this.errors)
                    });
                 testPromises.push(test)
            }
        }
        return testPromises;
    }
}

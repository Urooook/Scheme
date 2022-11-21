import NumberScheme, {NumberSchemeObjectType, PartialNumberScheme} from "./NumberScheme";
import StringScheme, {StringSchemeObjectType} from "./StringScheme/StringScheme";

export type ValuesObjectNumberElementType = {
    key: string
    value: NumberScheme
}

export type NumberSchemeObjectType1 = {
    [Symbol.iterator](): Generator
}

export default abstract class AbstractScheme {
    values: PartialNumberScheme;
    errors = [];

    protected constructor() {
    }

    create(obj: Record<string, NumberScheme | StringScheme>): AbstractScheme {
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

    validate(obj: Record<string, number | string>) {
        const keys = Object.keys(obj);
        // console.log('values', this.values)
        for (const el of this.values) {
            if (keys.indexOf(el.key) !== -1) {
                // console.log(el.value)
                this.#test(el.value.rulesObj, obj[el.key]);
                // console.log(obj[el.key])
            }
        }
    }

    #test(elem: NumberSchemeObjectType | StringSchemeObjectType, realValue: number | string): void {
        // console.log(elem)
        let Validator: NumberScheme | StringScheme;
        switch (elem.type) {
            case 'number': {
                Validator = new NumberScheme();
                break;
            }
                ;
            case 'string': {
                Validator = new StringScheme();
                break;
            }
            default: {
                throw new Error('Unknown type');
            }
        }
        // console.log(elem)
        const numberValidator = Validator;
        const iterator = elem[Symbol.iterator]();
        let result = iterator.next()
        while (!result.done) {
            // console.log(result);
            result = iterator.next()
            const value: ValuesObjectNumberElementType = result.value;
            // console.log('realValue', realValue)
            if (value && value.key !== 'type') {
                new Promise((resolve) => {
                    const result1 = typeof elem[value.key] === 'boolean' ? numberValidator[value.key](realValue) : numberValidator[value.key](elem[value.key], realValue);
                    console.log('result1', result1)
                    resolve(result1);
                })
                    .then((res) => console.log('res', res))
                    .catch((err) => {
                        this.errors.push(err);
                        console.log('Errors', this.errors)
                    })
            }
        }
        console.log(this.errors)
    }
}

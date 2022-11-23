import AbstractScheme from "./AbstracrScheme";
import NumberScheme from "./NumberScheme";
import StringScheme from "./StringScheme/StringScheme";
import IterableScheme from "./IterableScheme/IterableScheme";
import BooleanScheme from "./BooleanScheme/BooleanScheme";

export default class Scheme extends AbstractScheme {
    constructor() {
        super();
    }

    number(): NumberScheme {
        return new NumberScheme();
    }

    string(): StringScheme {
        return new StringScheme();
    }

    iterable(): IterableScheme {
        return new IterableScheme();
    }

    boolean(): BooleanScheme {
        return new BooleanScheme();
    }
}


const scheme = new Scheme();
const userScheme = scheme.create({
    age: scheme.number().notOneOf([1,2,3,4,5]).min(2).max(30).positive().checkIsUnique(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 1000)
        })
    }).isInteger().moreThen(5),
    arr: scheme.iterable().lengthMoreThen(3).has('bla'),
    // name: scheme.string().min(3).max(9).matches(/^[\w$]+$/g).isUpperCase()
    name: scheme.string().isTrimmed().email().min(5).max(26).checkIsUnique(() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(false);
        }, 1000)
    })
}),
    val: scheme.boolean().isFalse()
});
const a = new Set();
a.add('bla');
a.add('fla');
a.add('ala');
a.add([1,2,3])
userScheme.validate({
     age: 12,
    // name: '12.12.1212'
    arr: a,
    name: 'kot@sd.ru',
    val: false
     // count: -1,
    // ggwp: 6,
    // ggp: 6,
}).then((res) => console.log('Then', res));
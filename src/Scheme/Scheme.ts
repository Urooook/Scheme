import AbstractScheme from "./AbstracrScheme";
import NumberScheme from "./NumberScheme/NumberScheme";
import StringScheme from "./StringScheme/StringScheme";
import IterableScheme from "./IterableScheme/IterableScheme";
import BooleanScheme from "./BooleanScheme/BooleanScheme";

export default class Scheme extends AbstractScheme {
    #isOptional: boolean = false;

    constructor() {
        super();
    }

    #checkOptional(): boolean {
        const optional = this.#isOptional;
        this.#isOptional = false;
        return optional;
    }

    number(): NumberScheme {
        const optional = this.#checkOptional();
        return new NumberScheme({optional});
    }

    string(): StringScheme {
        const optional = this.#checkOptional();
        return new StringScheme({optional});
    }

    iterable(): IterableScheme {
        const optional = this.#checkOptional();
        return new IterableScheme({optional});
    }

    boolean(): BooleanScheme {
        const optional = this.#checkOptional();
        return new BooleanScheme({optional});
    }

    optional(): Scheme {
        this.#isOptional = true;
        return this;
    }
}


const scheme = new Scheme();
const userScheme = scheme.create({
     age: scheme.number().max(1000).min(10),
    arr: scheme.optional().iterable().lengthMoreThen(8).has('b12dla'),
    // name: scheme.string().min(3).max(9).matches(/^[\w$]+$/g).isUpperCase()
    name: scheme.optional().string().isTrimmed().email().min(5).max(6).checkIsUnique(() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(false);
        }, 1000)
    })
}).isLowerCase(),
//     val: scheme.boolean().isFalse()
});
const a = new Set();
a.add('bla');
a.add('fla');
a.add('ala');
a.add([1,2,3])
userScheme.validate({
     age: 23,
    name: '12.12.1212',
    // arr: a,
    // name: 'kot@sd.ru',
    val: false
     // count: -1,
    // ggwp: 6,
    // ggp: 6,
})
     .then((res) => console.log('Then', res));

// new Promise((resolve) => {
//     resolve(new BooleanScheme().isTrue(false));
// }).then((res) => console.log('qqqq', res))
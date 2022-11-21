import AbstractScheme from "./AbstracrScheme";
import NumberScheme from "./NumberScheme";
import StringScheme from "./StringScheme/StringScheme";

export default class Scheme extends AbstractScheme {
    constructor() {
        super();
    }

    number() {
        return new NumberScheme();
     }

     string() {
        return new StringScheme();
     }
}


const scheme = new Scheme();
const userScheme = scheme.create({
    // age: scheme.number().notOneOf([1,2,3,4,5]).min(2).max(10).positive().checkIsUnique(() => {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve(true);
    //         }, 1000)
    //     })
    // }).isInteger(),
    name: scheme.string().min(3).max(5)
    // count: scheme.number().max(90000).min(-2).negative(),
    // ggwp: scheme.number().notOneOf([1,2,3,4,5]).min(2).max(10),
    // ggp: scheme.number().notOneOf([1,2,3,4,5])
});

userScheme.validate({
    // age: 3,
    name: '1df1'
     // count: -1,
    // ggwp: 6,
    // ggp: 6,
});


console.log(userScheme.errors)
import AbstractScheme from "./AbstracrScheme";
import NumberScheme from "./NumberScheme";

export default class Scheme extends AbstractScheme {
    currentValue: any;
    isError: boolean = false;
    // readonly number = new NumberScheme();

    constructor(cv?: any) {
        super();
        if(cv){
            this.currentValue = cv;
        }
    }

    number() {
        return new NumberScheme();
     }
}


const scheme = new Scheme();
const userScheme = scheme.create({
    age: scheme.number().min(10).max(90),
    count: scheme.number().min(1000).max(90000),
    ggwp: scheme.number().notOneOf([1,2,3,4,5])
});

userScheme.validate({
    age: 33,
    count: 1500,
    ggwp: 6,
});

// for (const el of scheme.values){
//     console.log(el.value.numberObj)
// }
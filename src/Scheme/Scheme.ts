import AbstractScheme from "./AbstracrScheme";

export default class Scheme extends AbstractScheme {
    currentValue: any;
    isError: boolean = false;

    constructor(cv?: any) {
        super();
        if(cv){
            this.currentValue = cv;
        }
    }

    number(val) {
        if(typeof val === 'number'){
            this.currentValue = val;
            return val;
        } else if(typeof val === 'number' && val === +val){
            this.currentValue = val;
            return Number(val);
        } else {
            this.isError = true;
            throw new Error('Value is not a number')
        }
    }
}


const scheme = new Scheme();
const userScheme = scheme.create({
    age: scheme.number().min(10).max(90),
});

userScheme.validate({
    name: 'Andrey',
    age: 33
});

for (const el of scheme.values){
    console.log(el)
}
import NumberScheme from "./NumberScheme";

export default abstract class AbstractScheme {
    values: any;
    errors = [];

    protected constructor() {}

    create(obj: any) {
        const valuesObject = {
            ...obj,
            *[Symbol.iterator]() {
                const keys = Object.keys(this);
                for(const key of keys) {
                    if(typeof this[key] === 'function'){
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

    validate(obj: any){
      const keys = Object.keys(obj);

      for(const el of this.values) {
          if(keys.indexOf(el.key) !== -1){
              // console.log(el)
                this.test(el.value.numberObj, obj[el.key]);
              // console.log(obj[el.key])
          }
      }
    }

    test(elem: any, realValue: number) {
        // console.log(elem)
        if(elem.type === 'number'){
            const numberValidator = new NumberScheme();
            for(const el in elem){
                console.log(el)
                console.log(elem[el])
                try{
                    if(el !== 'type'){
                        const isValidate = numberValidator[el](elem[el], realValue);
                        if(!isValidate){
                            this.errors.push('Error')
                            console.log('Error')
                        }
                    }
                } catch (err){
                    console.log(err);
                    this.errors.push(err);
                }
            }
            console.log(this.errors)
        }
    }
}

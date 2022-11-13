export default abstract class AbstractScheme {
    values: any;

    protected constructor() {}

    create(obj: any) {
        const valuesObject = {
            ...obj,
            *[Symbol.iterator]() {
                const keys = Object.keys(this);
                for(const key of keys) {
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
              console.log(obj[el.key])
          }
      }
    }
}

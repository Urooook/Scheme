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

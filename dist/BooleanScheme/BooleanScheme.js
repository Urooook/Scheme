"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BooleanScheme {
    constructor(obj) {
        this.rulesObj = {
            type: 'boolean',
            optional: false,
            *[Symbol.iterator]() {
                const keys = Object.keys(this);
                for (const key of keys) {
                    yield {
                        key,
                        value: this[key],
                    };
                }
            },
        };
        if (obj) {
            this.rulesObj = {
                ...this.rulesObj,
                ...obj
            };
        }
    }
    isTrue(realValue) {
        if (typeof realValue === 'boolean') {
            if (realValue === true) {
                return realValue;
            }
            else {
                throw new Error('Its not true');
            }
        }
        else {
            this.rulesObj = {
                ...this.rulesObj,
                isTrue: true,
            };
            return new BooleanScheme(this.rulesObj);
        }
    }
    isFalse(realValue) {
        if (typeof realValue === 'boolean') {
            if (realValue !== true) {
                return realValue;
            }
            else {
                throw new Error('Its not false');
            }
        }
        else {
            this.rulesObj = {
                ...this.rulesObj,
                isFalse: true,
            };
            return new BooleanScheme(this.rulesObj);
        }
    }
}
exports.default = BooleanScheme;

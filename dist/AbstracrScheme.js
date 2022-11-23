"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AbstractScheme_instances, _AbstractScheme_test;
Object.defineProperty(exports, "__esModule", { value: true });
const NumberScheme_1 = require("./NumberScheme/NumberScheme");
const BooleanScheme_1 = require("./BooleanScheme/BooleanScheme");
const IterableScheme_1 = require("./IterableScheme/IterableScheme");
const StringScheme_1 = require("./StringScheme/StringScheme");
const types_1 = require("./types/types");
class AbstractScheme {
    constructor() {
        _AbstractScheme_instances.add(this);
        this.errors = [];
    }
    create(obj) {
        const valuesObject = {
            ...obj,
            *[Symbol.iterator]() {
                const keys = Object.keys(this);
                for (const key of keys) {
                    if (typeof this[key] === 'function') {
                        return;
                    }
                    yield {
                        key,
                        value: this[key],
                    };
                }
            },
        };
        this.values = valuesObject;
        return this;
    }
    validate(obj) {
        const keys = Object.keys(obj);
        const promises = [];
        for (const el of this.values) {
            this.errors[el.key] = [];
            if (keys.indexOf(el.key) !== -1) {
                const testPromises = __classPrivateFieldGet(this, _AbstractScheme_instances, "m", _AbstractScheme_test).call(this, el.value.rulesObj, obj[el.key], el.key);
                promises.push(...testPromises);
            }
            else {
                if (!el.value.rulesObj.optional) {
                    const undErr = Promise.reject(`${el.key} is required`).catch((err) => {
                        this.errors[el.key].push({
                            key: 'Required',
                            error: err,
                        });
                    });
                    promises.push(undErr);
                }
            }
        }
        return Promise.all(promises).then(() => {
            return this.errors;
        });
    }
}
exports.default = AbstractScheme;
_AbstractScheme_instances = new WeakSet(), _AbstractScheme_test = function _AbstractScheme_test(elem, realValue, key) {
    let Validator;
    switch (elem.type) {
        case types_1.ValidatorTypes.number:
            {
                Validator = new NumberScheme_1.default();
                break;
            }
            ;
        case types_1.ValidatorTypes.string: {
            Validator = new StringScheme_1.default();
            break;
        }
        case types_1.ValidatorTypes.iterable: {
            Validator = new IterableScheme_1.default();
            break;
        }
        case types_1.ValidatorTypes.boolean: {
            Validator = new BooleanScheme_1.default();
            break;
        }
        default: {
            throw new Error('Unknown type');
        }
    }
    const iterator = elem[Symbol.iterator]();
    let result = iterator.next();
    const testPromises = [];
    while (!result.done) {
        result = iterator.next();
        const value = result.value;
        if (value && value.key !== 'type' && value.key !== 'optional' && elem.type === (typeof realValue === "object" ? "iterable" : `${typeof realValue}`)) {
            const test = new Promise((resolve) => {
                const res = typeof elem[value.key] === 'boolean' ? Validator[value.key](realValue) : Validator[value.key](elem[value.key], realValue);
                resolve(res);
            })
                .catch((err) => {
                this.errors[key].push({
                    key: value.key,
                    error: err,
                });
            });
            testPromises.push(test);
        }
        else {
            if (elem.type !== (typeof realValue === "object" ? "iterable" : `${typeof realValue}`)) {
                const typeError = Promise.reject('Inconsistent types in the creation and validation schema').catch((err) => {
                    this.errors[key].push({
                        key: 'TypeError',
                        error: err,
                    });
                });
                testPromises.push(typeError);
            }
        }
    }
    return testPromises;
};

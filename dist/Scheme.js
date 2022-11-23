"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Scheme_instances, _Scheme_isOptional, _Scheme_checkOptional;
Object.defineProperty(exports, "__esModule", { value: true });
const AbstracrScheme_1 = require("./AbstracrScheme");
const NumberScheme_1 = require("./NumberScheme/NumberScheme");
const StringScheme_1 = require("./StringScheme/StringScheme");
const IterableScheme_1 = require("./IterableScheme/IterableScheme");
const BooleanScheme_1 = require("./BooleanScheme/BooleanScheme");
class Scheme extends AbstracrScheme_1.default {
    constructor() {
        super();
        _Scheme_instances.add(this);
        _Scheme_isOptional.set(this, false);
    }
    number() {
        const optional = __classPrivateFieldGet(this, _Scheme_instances, "m", _Scheme_checkOptional).call(this);
        return new NumberScheme_1.default({ optional });
    }
    string() {
        const optional = __classPrivateFieldGet(this, _Scheme_instances, "m", _Scheme_checkOptional).call(this);
        return new StringScheme_1.default({ optional });
    }
    iterable() {
        const optional = __classPrivateFieldGet(this, _Scheme_instances, "m", _Scheme_checkOptional).call(this);
        return new IterableScheme_1.default({ optional });
    }
    boolean() {
        const optional = __classPrivateFieldGet(this, _Scheme_instances, "m", _Scheme_checkOptional).call(this);
        return new BooleanScheme_1.default({ optional });
    }
    optional() {
        __classPrivateFieldSet(this, _Scheme_isOptional, true, "f");
        return this;
    }
}
exports.default = Scheme;
_Scheme_isOptional = new WeakMap(), _Scheme_instances = new WeakSet(), _Scheme_checkOptional = function _Scheme_checkOptional() {
    const optional = __classPrivateFieldGet(this, _Scheme_isOptional, "f");
    __classPrivateFieldSet(this, _Scheme_isOptional, false, "f");
    return optional;
};

"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StringScheme_instances, _StringScheme_iterate;
Object.defineProperty(exports, "__esModule", { value: true });
class StringScheme {
    constructor(obj) {
        _StringScheme_instances.add(this);
        this.rulesObj = {
            type: 'string',
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
        this.firstSurrogateRange = [0xd800, 0xdbff];
        this.secondSurrogateRange = [0xdc00, 0xdfff];
        this.emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        this.urlRegExp = /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
        this.dateRegExp = /(\d{2}\.){2}(\d{4}| \d{2})(?!\d)/;
        if (obj) {
            this.rulesObj = {
                ...this.rulesObj,
                ...obj
            };
        }
    }
    isFirstSurrogate(code) {
        return code >= this.firstSurrogateRange[0] && code <= this.firstSurrogateRange[1];
    }
    isSecondSurrogate(code) {
        return code >= this.secondSurrogateRange[0] && code <= this.secondSurrogateRange[1];
    }
    min(val, realValue) {
        if (typeof val === "number") {
            if (realValue) {
                if (realValue.length > val) {
                    return realValue;
                }
                else {
                    throw new Error('Min error');
                }
            }
            else {
                this.rulesObj = {
                    ...this.rulesObj,
                    min: val,
                };
                return new StringScheme(this.rulesObj);
            }
        }
        else {
            throw new Error('Must be number');
        }
    }
    max(val, realValue) {
        if (typeof val === "number") {
            if (realValue) {
                if (realValue.length < val) {
                    return realValue;
                }
                else {
                    throw new Error('Max error');
                }
            }
            else {
                this.rulesObj = {
                    ...this.rulesObj,
                    max: val,
                };
                return new StringScheme(this.rulesObj);
            }
        }
        else {
            throw new Error('Not a number');
        }
    }
    matches(regular, realValue) {
        if (regular) {
            if (realValue) {
                if (regular.test(realValue)) {
                    return realValue;
                }
                else {
                    throw new Error('RegExpError');
                }
            }
            else {
                this.rulesObj = {
                    ...this.rulesObj,
                    matches: regular,
                };
                return new StringScheme(this.rulesObj);
            }
        }
        else {
            throw new Error('Not a regular');
        }
    }
    isUpperCase(realValue) {
        if (realValue) {
            if (realValue.toUpperCase() === realValue) {
                return realValue;
            }
            else {
                throw new Error('UpperCase error');
            }
        }
        else {
            this.rulesObj = {
                ...this.rulesObj,
                isUpperCase: true,
            };
            return new StringScheme(this.rulesObj);
        }
    }
    isLowerCase(realValue) {
        if (realValue) {
            if (realValue.toLowerCase() === realValue) {
                return realValue;
            }
            else {
                throw new Error('LowerCase error');
            }
        }
        else {
            this.rulesObj = {
                ...this.rulesObj,
                isLowerCase: true,
            };
            return new StringScheme(this.rulesObj);
        }
    }
    isTrimmed(realValue) {
        if (realValue) {
            if (realValue.trim() === realValue) {
                return realValue;
            }
            else {
                throw new Error('Trim error');
            }
        }
        else {
            this.rulesObj = {
                ...this.rulesObj,
                isTrimmed: true,
            };
            return new StringScheme(this.rulesObj);
        }
    }
    ;
    withSurrogatePairs(realValue) {
        if (realValue) {
            let count = 0;
            for (const el of __classPrivateFieldGet(this, _StringScheme_instances, "m", _StringScheme_iterate).call(this, realValue)) {
                count++;
            }
            if (count !== realValue.length) {
                return realValue;
            }
            else {
                throw new Error('Not Surrogate Pairs');
            }
        }
        else {
            this.rulesObj = {
                ...this.rulesObj,
                withSurrogatePairs: true,
            };
            return new StringScheme(this.rulesObj);
        }
    }
    checkIsUnique(func, realValue) {
        if (realValue) {
            return new Promise((resolve) => {
                func().then((data) => resolve(data));
            }).then((res) => {
                if (Boolean(res) === true) {
                    return realValue;
                }
                else {
                    throw new Error('Value is not unique');
                }
            }).finally(() => new StringScheme());
        }
        else {
            this.rulesObj = {
                ...this.rulesObj,
                checkIsUnique: func,
            };
            return new StringScheme(this.rulesObj);
        }
    }
    email(realValue) {
        if (realValue) {
            if (this.emailRegExp.test(realValue)) {
                return realValue;
            }
            else {
                throw new Error('Not Email');
            }
        }
        else {
            this.rulesObj = {
                ...this.rulesObj,
                email: true,
            };
            return new StringScheme(this.rulesObj);
        }
    }
    date(realValue) {
        if (realValue) {
            if (this.dateRegExp.test(realValue)) {
                return realValue;
            }
            else {
                throw new Error('Not Date');
            }
        }
        else {
            this.rulesObj = {
                ...this.rulesObj,
                date: true,
            };
            return new StringScheme(this.rulesObj);
        }
    }
    url(realValue) {
        if (realValue) {
            if (this.urlRegExp.test(realValue)) {
                return realValue;
            }
            else {
                throw new Error('Not Url');
            }
        }
        else {
            this.rulesObj = {
                ...this.rulesObj,
                url: true,
            };
            return new StringScheme(this.rulesObj);
        }
    }
}
exports.default = StringScheme;
_StringScheme_instances = new WeakSet(), _StringScheme_iterate = function _StringScheme_iterate(string) {
    const normalizedString = string.normalize();
    let firstSurrogate = null;
    let pointer = 0;
    const self = this;
    return {
        next() {
            if (pointer >= normalizedString.length)
                return { done: true, value: undefined };
            const charCode = normalizedString.charCodeAt(pointer);
            if (self.isFirstSurrogate(charCode)) {
                firstSurrogate = charCode;
                pointer += 1;
            }
            if (self.isSecondSurrogate(charCode)) {
                pointer += 1;
                if (firstSurrogate !== null) {
                    const value = String.fromCharCode(firstSurrogate, charCode);
                    firstSurrogate = null;
                    return { done: false, value };
                }
            }
            const regularChar = String.fromCharCode(charCode);
            firstSurrogate = null;
            pointer += 1;
            return { done: false, value: regularChar };
        },
        [Symbol.iterator]() {
            return this;
        },
    };
};

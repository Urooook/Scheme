"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringScheme_1 = require("./StringScheme");
describe('String Scheme API', () => {
    it("min", async function () {
        const str = new StringScheme_1.default();
        const realVal = 'blaFoo';
        new Promise((resolve) => {
            resolve(str.min(3, realVal));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === 'Min error');
        });
    });
    it("max", async function () {
        const str = new StringScheme_1.default();
        const realVal = 'blaFoo';
        new Promise((resolve) => {
            resolve(str.max(13, realVal));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === 'Max error');
        });
    });
    it("matches", async function () {
        const str = new StringScheme_1.default();
        const realVal = 'asd$_123';
        new Promise((resolve) => {
            resolve(str.matches(/^[\w$]+$/g, realVal));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === 'RegExpError');
        });
    });
    it("isUpperCase", async function () {
        const str = new StringScheme_1.default();
        const realVal = 'QQQ';
        new Promise((resolve) => {
            resolve(str.isUpperCase(realVal));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === 'UpperCase error');
        });
    });
    it("isLowerCase", async function () {
        const str = new StringScheme_1.default();
        const realVal = 'sdsd';
        new Promise((resolve) => {
            resolve(str.isLowerCase(realVal));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === 'LowerCase error');
        });
    });
    it("isTrimmed", async function () {
        const str = new StringScheme_1.default();
        const realVal = 'sdsd';
        new Promise((resolve) => {
            resolve(str.isTrimmed(realVal));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === 'Trim error');
        });
    });
    it("withSurrogatePairs", async function () {
        const str = new StringScheme_1.default();
        const realVal = '🤪😛😝';
        new Promise((resolve) => {
            resolve(str.withSurrogatePairs(realVal));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === 'Not Surrogate Pairs');
        });
    });
    it("checkIsUnique", async function () {
        const str = new StringScheme_1.default();
        const realVal = 'bla';
        new Promise((resolve) => {
            resolve(str.checkIsUnique(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true);
                    }, 1000);
                });
            }));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === 'Value is not unique');
        });
    });
    it("email", async function () {
        const str = new StringScheme_1.default();
        const realVal = 'kot@ya.ru';
        new Promise((resolve) => {
            resolve(str.email(realVal));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === 'Not Email');
        });
    });
    it("date", async function () {
        const str = new StringScheme_1.default();
        const realVal = '11.11.2022';
        new Promise((resolve) => {
            resolve(str.email(realVal));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === 'Not Date');
        });
    });
    it("url", async function () {
        const str = new StringScheme_1.default();
        const realVal = 'https://github.com/Urooook/CSFrontend/tree/main/HW5/src';
        new Promise((resolve) => {
            resolve(str.url(realVal));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === 'Not Url');
        });
    });
});

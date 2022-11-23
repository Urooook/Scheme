import StringScheme from "../StringScheme/StringScheme";
import NumberScheme from "./NumberScheme";

describe('String Scheme API',  () => {
    it("min", async function () {
        const str = new NumberScheme();
        const realVal = 5
        new Promise((resolve) => {
            resolve(str.min(3, realVal));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === 'Min error')
        });
    });

    it("max", async function () {
        const str = new NumberScheme();
        const realVal = 12;
        new Promise((resolve) => {
            resolve(str.max(13, realVal));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === 'Max error')
        });
    });

    it("notOneOf", async function () {
        const str = new NumberScheme();
        const realVal = 4;
        new Promise((resolve) => {
            resolve(str.notOneOf([1,2,3], realVal));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === 'Array includes value')
        });
    });

    it("Positive", async function () {
        const str = new NumberScheme();
        const realVal = 4;
        new Promise((resolve) => {
            resolve(str.positive(realVal));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === 'Positive error')
        });
    });

    it("Negative", async function () {
        const str = new NumberScheme();
        const realVal = -4;
        new Promise((resolve) => {
            resolve(str.negative(realVal));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === 'Negative error')
        });
    });

    it("MoreThen", async function () {
        const str = new NumberScheme();
        const realVal = 4;
        new Promise((resolve) => {
            resolve(str.moreThen(3, realVal));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === `This value less then ${realVal}`)
        });
    });

    it("LessThen", async function () {
        const str = new NumberScheme();
        const realVal = 2;
        new Promise((resolve) => {
            resolve(str.lessThen(3, realVal));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === `This value more then ${realVal}`)
        });
    });

    it("isInteger", async function () {
        const str = new NumberScheme();
        const realVal = 2;
        new Promise((resolve) => {
            resolve(str.isInteger(realVal));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === `This value more then ${realVal}`)
        });
    });

    it("isFloat", async function () {
        const str = new NumberScheme();
        const realVal = 1.22;
        new Promise((resolve) => {
            resolve(str.isFloat(realVal));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === `This value more then ${realVal}`)
        });
    });

    it("checkIsUnique", async function () {
        const str = new NumberScheme();
        const realVal = 6;
        new Promise((resolve) => {
            resolve(str.checkIsUnique(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true);
                    }, 1000)
                })
            }));
        }).then((res) => {
            expect(res === realVal);
        }).catch((err) => {
            expect(err === 'Value is not unique')
        });
    });
});
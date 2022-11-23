import BooleanScheme from "./BooleanScheme";

describe('Boolean Scheme API',  () => {
    it("isTrue", async function () {
        const bool = new BooleanScheme();
        new Promise((resolve) => {
            resolve(bool.isTrue(true));
        }).then((res) => {
            expect(res === true);
        }).catch((err) => {
            expect(err === 'Its not true')
        });
    });

    it("isFalse", async function () {
        const bool = new BooleanScheme();
        new Promise((resolve) => {
            resolve(bool.isFalse(false));
        }).then((res) => {
            expect(res === false);
        }).catch((err) => {
            expect(err === 'Its not false')
        });
    });
})
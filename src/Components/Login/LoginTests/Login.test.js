import { usernameValidated, passwordValidated } from './LoginLogic'
//SETH STANLEY-GRAY

describe('Making Sure the library works', () => {
    test('Jest works!', () => {
        expect('string').toBe('string')
        expect(2).toBe(2)
    })
})

describe('Test Validation On Username', () => {
    test('Make Sure That Input Is Boolean', () => {
        expect(typeof usernameValidated()).toBe("boolean")
    })

    test("Making sure it fails when 1 char passed in", () => {
        expect(usernameValidated("a")).toBe(false)
    })

    test('Making Sure The Submit Works With 3 or more chars', () => {
        expect(usernameValidated("aaa")).toBe(true)
    })
})

describe('Test Validation For Password', () => {
    test('Make Sure It Returns A Boolean', () => {
        expect(typeof passwordValidated()).toBe("boolean")
    })

    test("Make Sure On Submit Fails If Only 1 Char", () => {
        expect(passwordValidated("a")).toBe(false)
    })

    test("Make Sure Submit Works With 3 or more Chars", () => {
        expect(passwordValidated("aaa")).toBe(true)
    })

})
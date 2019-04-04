import {handleInput, usernameValidate, passwordValidate} from './RegisterLogic'
 
describe('Making sure the library works', () => {
    test('Jest works', ()=> {
      expect(2).toBe(2);
    })
  })

describe('Check validation for username', () => {
  test('Make sure that it returns a boolean', () => {
        expect(typeof usernameValidate()).toBe("boolean")
    })

    test("Making sure it fails when 1 char passed in", () => {
        expect(usernameValidate("a")).toBe(false)
    })

    test("Make sure it passes with 3 chars", () => {
        expect(usernameValidate('aaa')).toBe(true)
    })

})

describe('check validation for password', () => {
    test('Make sure that it returns a boolean', () => {
        expect(typeof passwordValidate()).toBe('boolean')
    })

    test("Making sure it fails when 1 char passed in", () => {
        expect(passwordValidate("aaa")).toBe(true)
    })
})
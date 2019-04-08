import { displayGhost } from './questionnairelogic'
//Mark Levitas

describe('Making Sure the library works', () => {
    test('Jest works!', () => {
        expect('string').toBe('string')
        expect(2).toBe(2)
    })
})
describe('testing display ghost', () => {
    test('if arguments is empty', () => {
        expect(displayGhost()).toBe(null)
    })
    test('if arguments is true', () => {
        expect(displayGhost(true)).toBe(true)
    })
    test('if argument is false', () => {
        expect(displayGhost(false)).toBe(false)
    })
})
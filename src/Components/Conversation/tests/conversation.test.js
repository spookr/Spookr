import { roomNameTest } from './conversationlogic'
//Mark Levitas

describe('Making Sure the library works', () => {
    test('Jest works!', () => {
        expect('string').toBe('string')
        expect(2).toBe(2)
    })
})
describe('testing roomname builder', () => {
    test('if arguments are empty', () => {
        expect(roomNameTest()).toBe(false)
    })
    test('should return a string', () => {
        expect(typeof roomNameTest(3, 6)).toBe('string')
    })
})


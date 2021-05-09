import { padStart, isNil } from '../base'

describe('#padStart', () => {
  it('should add two paddings 0 to beginning of string', () => {
    const testingString = 'abc'

    expect(padStart(testingString, 5, '0')).toBe(`00${testingString}`)
  })

  it("shouldn't add padding if string has reached the target length", () => {
    const testingString = 'abc'

    expect(padStart(testingString, 3, '0')).toBe(testingString)
  })

  it('should cut string if target length is less than the length of the given string', () => {
    const testingString = 'abc'

    expect(padStart(testingString, 2, '0')).toBe('bc')
  })
})

describe('#isNil', () => {
  it('should return false', () => {
    expect(isNil('a')).toBeFalsy()
    expect(isNil(123)).toBeFalsy()
    expect(isNil([])).toBeFalsy()
    expect(isNil({})).toBeFalsy()
    expect(isNil('')).toBeFalsy()
  })

  it('should return true', () => {
    expect(isNil(undefined)).toBeTruthy()
    expect(isNil(null)).toBeTruthy()
  })
})

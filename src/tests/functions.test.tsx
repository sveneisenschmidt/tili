import { describe, it, expect } from 'vitest'
import { getCalculation, evaluateCalculation, randomNumber } from '@/functions'
import { Settings } from '@/classes/Settings'
import { Calculation } from '@/classes/Calculation'
import { OPERATOR_ADD, OPERATOR_SUBTRACT } from '@/constants'

describe('getCalculation', () => {
  it('should return a Calculation object for addition mode', () => {
    const settings = new Settings([OPERATOR_ADD], 1, 10, 1)
    const calc = getCalculation(settings)
    expect(calc).toBeInstanceOf(Calculation)
    expect(calc.operator).toBe(OPERATOR_ADD)
  })

  it('should return a Calculation object for subtraction mode', () => {
    const settings = new Settings([OPERATOR_SUBTRACT], 1, 10, 1)
    const calc = getCalculation(settings)
    expect(calc).toBeInstanceOf(Calculation)
    expect(calc.operator).toBe(OPERATOR_SUBTRACT)
  })

  it('should throw an error if no modes are available', () => {
    const settings = new Settings(['TEMP_MODE'], 1, 10, 1)
    settings.modes = []
    expect(() => getCalculation(settings)).toThrow('No modes available in settings')
  })

  it('should throw an error if mode is unsupported', () => {
    const settings = new Settings(['unsupported_mode'], 1, 10, 1)
    expect(() => getCalculation(settings)).toThrow('Unsupported mode')
  })
})

describe('evaluateCalculation', () => {
  it('should return true for correct input', () => {
    const calc = new Calculation(2, 3, 5, OPERATOR_ADD)
    expect(evaluateCalculation(calc, 5)).toBe(true)
  })

  it('should return false for incorrect input', () => {
    const calc = new Calculation(2, 3, 5, OPERATOR_ADD)
    expect(evaluateCalculation(calc, 4)).toBe(false)
  })

  it('should handle string input correctly', () => {
    const calc = new Calculation(2, 3, 5, OPERATOR_ADD)
    expect(evaluateCalculation(calc, '5')).toBe(true)
  })
})

describe('getCalculationSubtract', () => {
  it('should return a Calculation object for valid settings', () => {
    const settings = new Settings([OPERATOR_SUBTRACT], 1, 10, 1)
    const calc = getCalculation(settings)
    expect(calc).toBeInstanceOf(Calculation)
    expect(calc.operator).toBe(OPERATOR_SUBTRACT)
  })

  it('should throw an error if min are undefined', () => {
    const settings = new Settings([OPERATOR_SUBTRACT], undefined, 10, 1)
    settings.min = undefined!

    expect(() => getCalculation(settings)).toThrow('min, max, and many must be defined')
  })

  it('should throw an error if  max are undefined', () => {
    const settings = new Settings([OPERATOR_SUBTRACT], undefined, 10, 1)
    settings.max = undefined!

    expect(() => getCalculation(settings)).toThrow('min, max, and many must be defined')
  })

  it('should throw an error if many are undefined', () => {
    const settings = new Settings([OPERATOR_SUBTRACT], undefined, 10, 1)
    settings.many = undefined!

    expect(() => getCalculation(settings)).toThrow('min, max, and many must be defined')
  })

  it('should throw an error if no valid calculation is found within max attempts', () => {
    const settings = new Settings([OPERATOR_SUBTRACT], 1, 10, 1)
    expect(() => getCalculation(settings, -1)).toThrow('No calculation found within -1 iterations')
  })

  it('should return a Calculation object with correct values', () => {
    const settings = new Settings([OPERATOR_SUBTRACT], 1, 10, 1)
    const calc = getCalculation(settings)
    expect(calc.a - calc.b).toBe(calc.c)
  })
})

describe('getCalculationAdd', () => {
  it('should return a Calculation object for valid settings', () => {
    const settings = new Settings([OPERATOR_ADD], 1, 10, 1)
    const calc = getCalculation(settings)
    expect(calc).toBeInstanceOf(Calculation)
    expect(calc.operator).toBe(OPERATOR_ADD)
  })

  it('should throw an error if min are undefined', () => {
    const settings = new Settings([OPERATOR_ADD], undefined, 10, 1)
    settings.min = undefined!

    expect(() => getCalculation(settings)).toThrow('min, max, and many must be defined')
  })

  it('should throw an error if  max are undefined', () => {
    const settings = new Settings([OPERATOR_ADD], undefined, 10, 1)
    settings.max = undefined!

    expect(() => getCalculation(settings)).toThrow('min, max, and many must be defined')
  })

  it('should throw an error if many are undefined', () => {
    const settings = new Settings([OPERATOR_ADD], undefined, 10, 1)
    settings.many = undefined!

    expect(() => getCalculation(settings)).toThrow('min, max, and many must be defined')
  })

  it('should throw an error if no valid calculation is found within max attempts', () => {
    const settings = new Settings([OPERATOR_ADD], 1, 10, 1)
    expect(() => getCalculation(settings, -1)).toThrow('No calculation found within -1 iterations')
  })

  it('should return a Calculation object with correct values', () => {
    const settings = new Settings([OPERATOR_ADD], 1, 10, 1)
    const calc = getCalculation(settings)
    expect(calc.a + calc.b).toBe(calc.c)
  })
})

describe('evaluateCalculation', () => {
  it('should return true for correct input', () => {
    const calc = new Calculation(2, 3, 5, OPERATOR_ADD)
    expect(evaluateCalculation(calc, 5)).toBe(true)
  })

  it('should return false for incorrect input', () => {
    const calc = new Calculation(2, 3, 5, OPERATOR_ADD)
    expect(evaluateCalculation(calc, 4)).toBe(false)
  })

  it('should handle string input correctly', () => {
    const calc = new Calculation(2, 3, 5, OPERATOR_ADD)
    expect(evaluateCalculation(calc, '5')).toBe(true)
  })
})

describe('randomNumber', () => {
  it('should return a number within the specified range that is a many of the given number', () => {
    const min = 1
    const max = 10
    const many = 2
    const result = randomNumber(min, max, many)
    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
    expect(result % many).toBe(0)
  })

  it('should throw an error if no many is found within the specified number of attempts', () => {
    const min = 1
    const max = 10
    const many = 11
    expect(() => randomNumber(min, max, many, 5)).toThrow('No calculation found within 5 iterations')
  })

  it('should return a number that is exactly the min value if min and max are the same and it is a many', () => {
    const min = 4
    const max = 4
    const many = 2
    const result = randomNumber(min, max, many)
    expect(result).toBe(4)
  })

  it('should throw an error if min and max are the same and it is not a many', () => {
    const min = 5
    const max = 5
    const many = 2
    expect(() => randomNumber(min, max, many, 5)).toThrow('No calculation found within 5 iterations')
  })
})

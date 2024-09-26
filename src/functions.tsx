import { MAX_ATTEMPTS, OPERATOR_ADD, OPERATOR_SUBTRACT } from './constants'
import _random from 'lodash.random'
import { Settings } from '@/classes/Settings'
import { Calculation } from '@/classes/Calculation'

/**
 * Performs a calculation based on the provided settings.
 *
 * @param {Settings} settings - The settings object containing the mode and other parameters for the calculation.
 * @returns {Calculation} The result of the calculation.
 * @throws {Error} Throws an error if the mode is unknown.
 */
export function getCalculation(settings: Settings, maxAttempts = MAX_ATTEMPTS): Calculation {
  if (!Array.isArray(settings.modes) || settings.modes.length === 0) {
    throw new Error('No modes available in settings')
  }

  const mode = settings.modes[_random(0, settings.modes.length - 1)]

  switch (mode) {
    case OPERATOR_ADD:
      return getCalculationAdd(settings, maxAttempts)
    case OPERATOR_SUBTRACT:
      return getCalculationSubtract(settings, maxAttempts)
    default:
      throw Error('Unsupported mode')
  }
}

/**
 * Generates a calculation for subtraction based on the provided settings.
 *
 * @param {Settings} settings - The settings for the calculation, including min, max, and many.
 * @returns {Calculation} - A new Calculation object representing the subtraction operation.
 * @throws {Error} - Throws an error if min, max, or many are undefined, or if no valid calculation is found within 100 iterations.
 */
function getCalculationSubtract(settings: Settings, maxAttempts = MAX_ATTEMPTS) {
  const { min, max, many } = settings

  if (min === undefined || max === undefined || many === undefined) {
    throw new Error('min, max, and many must be defined')
  }

  let attempts = 0

  while (attempts < maxAttempts) {
    const [a, b] = [randomNumber(min, max, many), randomNumber(min, max, many)].sort().reverse()

    if (a - b >= 0) {
      const c = a - b
      const operator = OPERATOR_SUBTRACT
      return new Calculation(a, b, c, operator)
    }

    attempts++
  }

  throw new Error(`No calculation found within ${maxAttempts} iterations`)
}

/**
 * Generates a calculation for addition based on the provided settings.
 *
 * @param {Settings} settings - The settings for the calculation, including min, max, and many.
 * @returns {Calculation} - A new Calculation object representing the addition operation.
 * @throws {Error} - Throws an error if min, max, or many are undefined, or if no valid calculation is found within 100 iterations.
 */
function getCalculationAdd(settings: Settings, maxAttempts = MAX_ATTEMPTS): Calculation {
  const { min, max, many } = settings

  if (min === undefined || max === undefined || many === undefined) {
    throw new Error('min, max, and many must be defined')
  }

  let attempts = 0

  while (attempts < maxAttempts) {
    const [a, b] = [randomNumber(min, max, many), randomNumber(min, max, many)].sort().reverse()

    if (a + b <= max && a !== 0 && b !== 0) {
      const c = a + b
      const operator = OPERATOR_ADD

      return new Calculation(a, b, c, operator)
    }

    attempts++
  }

  throw new Error(`No calculation found within ${maxAttempts} iterations`)
}

/**
 * Generates a random number within a specified range that is a many of a given number.
 *
 * @param min - The minimum value of the range (inclusive).
 * @param max - The maximum value of the range (inclusive).
 * @param many - The number that the generated random number must be a many of.
 * @param MAX_ATTEMPTS - The maximum number of attempts to find a valid many (default is 100).
 * @returns A random number within the specified range that is a many of the given number.
 * @throws Will throw an error if no many is found within the specified number of attempts.
 */
export function randomNumber(min: number, max: number, many: number, maxAttempts = MAX_ATTEMPTS): number {
  let candidate: number
  let attempts = 0

  while (attempts < maxAttempts) {
    candidate = _random(min, max)
    if (candidate % many === 0) return candidate
    attempts++
  }

  throw new Error(`No calculation found within ${maxAttempts} iterations`)
}

/**
 * Evaluates a calculation by comparing the provided input with the expected result.
 *
 * @param {any} calucation - The calculation object containing the expected result.
 * @param {number | string} input - The input value to compare against the calculation's expected result.
 * @returns {boolean} - Returns true if the input matches the expected result, otherwise false.
 */
export function evaluateCalculation(calucation: any, input: number | string): boolean {
  return calucation.c == input
}

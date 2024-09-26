import { describe, it, expect } from 'vitest'
import { Settings } from '../classes/Settings'

describe('Settings', () => {
  it('should create an instance with default values', () => {
    const settings = new Settings(['mode1'])
    expect(settings.modes).toEqual(['mode1'])
    expect(settings.min).toBe(0)
    expect(settings.max).toBe(100)
    expect(settings.many).toBe(1)
  })

  it('should create an instance with provided values', () => {
    const settings = new Settings(['mode1', 'mode2'], 10, 200, 5)
    expect(settings.modes).toEqual(['mode1', 'mode2'])
    expect(settings.min).toBe(10)
    expect(settings.max).toBe(200)
    expect(settings.many).toBe(5)
  })

  it('should throw an error if modes array is empty', () => {
    expect(() => new Settings([])).toThrowError("'modes' parameter can not be empty")
  })

  it('should set min, max, and many to default values if not provided', () => {
    const settings = new Settings(['mode1'])
    expect(settings.min).toBe(0)
    expect(settings.max).toBe(100)
    expect(settings.many).toBe(1)
  })
})
it('should set min to default value if not provided', () => {
  const settings = new Settings(['mode1'])
  expect(settings.min).toBe(0)
})

it('should set max to default value if not provided', () => {
  const settings = new Settings(['mode1'])
  expect(settings.max).toBe(100)
})

it('should set many to default value if not provided', () => {
  const settings = new Settings(['mode1'])
  expect(settings.many).toBe(1)
})

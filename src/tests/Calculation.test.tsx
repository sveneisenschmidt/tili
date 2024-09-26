import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import { Calculation } from '../classes/Calculation'

describe('Calculation', () => {
  it('should create an instance of Calculation with given parameters', () => {
    const calc = new Calculation(1, 2, 3, '+')
    expect(calc.a).toBe(1)
    expect(calc.b).toBe(2)
    expect(calc.c).toBe(3)
    expect(calc.operator).toBe('+')
  })
})

describe('Calculation with random numbers', () => {
  it('should create an instance of Calculation with random parameters', () => {
    const a = faker.number.int(100)
    const b = faker.number.int(100)
    const c = faker.number.int(100)
    const operators = ['+', '-', '*', '/']
    const operator = operators[Math.floor(Math.random() * operators.length)]
    const calc = new Calculation(a, b, c, operator)
    expect(calc.a).toBe(a)
    expect(calc.b).toBe(b)
    expect(calc.c).toBe(c)
    expect(calc.operator).toBe(operator)
  })
})

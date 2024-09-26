/**
 * Represents a mathematical calculation.
 */
export class Calculation {
  /**
   * The first operand.
   */
  a: number

  /**
   * The second operand.
   */
  b: number

  /**
   * The result of the calculation.
   */
  c: number

  /**
   * The operator to be used in the calculation.
   */
  operator: string

  /**
   * Creates an instance of Calculation.
   *
   * @param a - The first operand.
   * @param b - The second operand.
   * @param c - The result.
   * @param operator - The operator to be used in the calculation.
   */
  constructor(a: number, b: number, c: number, operator: string) {
    this.a = a
    this.b = b
    this.c = c
    this.operator = operator
  }
}

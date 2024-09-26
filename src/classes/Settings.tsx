/**
 * Represents the settings for a calculation.
 */
export class Settings {
  /**
   * An array of strings representing the modes.
   */
  modes: Array<string>

  /**
   * The minimum value. Defaults to 0.
   */
  min: number

  /**
   * The maximum value. Defaults to 100.
   */
  max: number

  /**
   * The many value. Defaults to 1.
   */
  many: number

  /**
   * Creates an instance of the Settings class.
   *
   * @param modes - An array of strings representing the modes. Must contain at least one mode.
   * @param min - The minimum value. Defaults to 0.
   * @param max - The maximum value. Defaults to 100.
   * @param many - The many value. Defaults to 1.
   *
   * @throws Will throw an error if the 'modes' parameter is empty.
   */
  constructor(modes: Array<string>, min: number = 0, max: number = 100, many: number = 1) {
    if (modes.length < 1) {
      throw new Error("'modes' parameter can not be empty")
    }
    this.modes = modes
    this.min = min
    this.max = max
    this.many = many
  }
}

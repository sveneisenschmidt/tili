<script setup lang="ts">
// Internals
import { ref, watch } from 'vue'
import { useStorage as storedRef } from '@vueuse/core'

// Classes
import { Settings } from '@/classes/Settings'

// Constants
import { OPERATOR_ADD, OPERATOR_SUBTRACT } from '@/constants'

// Functions
import { getCalculation, evaluateCalculation } from '@/functions'

// Components
import { FontAwesomeIcon as Icon } from '@fortawesome/vue-fontawesome'
import {
  faPlusMinus,
  faA,
  faRotate,
  faGears,
  faToggleOn,
  faToggleOff,
  faClose,
  faEquals,
  faStar
} from '@fortawesome/free-solid-svg-icons'

// Default values
const DEFAULT_SETTING_MODES = [OPERATOR_ADD]
const DEFAULT_SETTING_MIN = 1
const DEFAULT_SETTING_MAX = 10
const DEFAULT_SETTING_MANY = 1
const INPUT_MAX_LENGTH = 4

// State: Settings
const settings = storedRef(
  'settings',
  new Settings(DEFAULT_SETTING_MODES, DEFAULT_SETTING_MIN, DEFAULT_SETTING_MAX, DEFAULT_SETTING_MANY)
) // @type {Settings}

const settingsVisible = storedRef('settingsVisible', false)
const settingsToggleModes = ref<Record<string, boolean>>({
  OPERATOR_ADD: settings.value.modes.includes(OPERATOR_ADD),
  OPERATOR_SUBTRACT: settings.value.modes.includes(OPERATOR_SUBTRACT)
})

// State: Caculations
const calculation = storedRef('calculation', getCalculation(settings.value)) // @type {Calculation}
const [input, output] = [storedRef('input', ''), storedRef('output', 0)]
const inputPlaceholder = ref('?')
const outputClassName = ref(`state-${output.value}`)

// Watchers

/**
 * Watches for changes in the `settings` object and triggers the `reload` function.
 * Maintains the visibility state of the settings panel before and after the reload.
 *
 * @param {Object} settings - The settings object being watched.
 * @param {boolean} options.deep - Indicates that the watcher should deeply watch the `settings` object.
 */
watch(
  settings,
  () => {
    let wasSettingsVisible = settingsVisible.value
    reload()
    settingsVisible.value = wasSettingsVisible
  },
  { deep: true }
)

//

/**
 * Evaluates the current calculation based on the input value.
 * If the input value is not present, the function returns immediately.
 *
 * The function updates the output value based on the result of the
 * evaluateCalculation function. If the evaluation is true, the output
 * value is set to 1, otherwise it is set to 2.
 *
 * Additionally, the outputClassName is updated to reflect the current
 * state of the output value.
 */
function evaluate() {
  if (!input.value) return

  output.value = evaluateCalculation(calculation.value, input.value) ? 1 : 2
  outputClassName.value = `state-${output.value}`
}

/**
 * Adds a value to the input if the current input length is less than the maximum allowed length.
 *
 * @param {number | string} value - The value to be added to the input.
 * @returns {void}
 */
function add(value: number | string) {
  if (`${input.value || ''}`.length >= INPUT_MAX_LENGTH) return
  input.value = `${input.value || ''}${value}`
}

/**
 * Toggles the specified mode in the calculator settings.
 *
 * @param {string} mode - The mode to toggle. Must be either OPERATOR_ADD or OPERATOR_SUBTRACT.
 * @returns {boolean} - Returns true if the mode was successfully toggled, false otherwise.
 *
 * The function performs the following steps:
 * 1. Checks if the provided mode is valid (either OPERATOR_ADD or OPERATOR_SUBTRACT).
 * 2. Toggles the corresponding mode in the settingsToggleModes object.
 * 3. Ensures that at least one mode is always enabled.
 * 4. Updates the modes in the settings object based on the current state of settingsToggleModes.
 */
function toggleMode(mode: string): boolean {
  // Check if the provided mode is valid (either OPERATOR_ADD or OPERATOR_SUBTRACT)
  if (![OPERATOR_ADD, OPERATOR_SUBTRACT].includes(mode)) return false

  // Toggle the corresponding mode in the settingsToggleModes object
  settingsToggleModes.value[mode] = !settingsToggleModes.value[mode]

  // Ensure that at least one mode is always enabled
  if (!settingsToggleModes.value.OPERATOR_ADD && !settingsToggleModes.value.OPERATOR_SUBTRACT) {
    DEFAULT_SETTING_MODES.forEach((mode) => (settingsToggleModes.value[mode] = true))
  }

  // Update the modes in the settings object based on the current state of settingsToggleModes
  settings.value.modes = Object.keys(settingsToggleModes.value).filter((key) => settingsToggleModes.value[key])

  // Return true indicating the mode was successfully toggled
  return true
}

/**
 * Resets the calculator component to its initial state.
 *
 * This function performs the following actions:
 * - Clears the input field.
 * - Resets the output value to 0.
 * - Hides the settings panel.
 * - Updates the output class name based on the reset output value.
 */
function reset() {
  input.value = ''
  output.value = 0
  settingsVisible.value = false
  outputClassName.value = `state-${output.value}`
}

/**
 * Removes the last character from the input value.
 * If the input value becomes empty after removal, it calls the reset function.
 */
function remove() {
  input.value = input.value.slice(0, -1)
  if (input.value.length === 0) reset()
}

/**
 * Reloads the calculator by resetting it and updating the calculation value
 * based on the current settings.
 */
function reload() {
  reset()
  calculation.value = getCalculation(settings.value)
}

/**
 * Changes the input value to an integer.
 *
 * @param {Event} e - The event triggered by the input change.
 * @param {number} defaultNumber - The default number to return if parsing fails.
 * @returns {number} - The parsed integer value from the input or the default number.
 */
function changeInputInt(e: Event, defaultNumber: number): number {
  return parseInt((e.target as HTMLTextAreaElement).value) || defaultNumber
}
</script>

<style scoped src="./Calculator.css"></style>

<template>
  <div class="calculator">
    <div class="screen">
      <div class="formula">
        {{ calculation.a }}
        <span v-if="calculation.operator === OPERATOR_ADD">+</span>
        <span v-if="calculation.operator === OPERATOR_SUBTRACT">-</span>
        {{ calculation.b }} =
      </div>
      <div class="input-container" :class="outputClassName">
        <input readonly :maxlength="INPUT_MAX_LENGTH" :placeholder="inputPlaceholder" v-model="input" />
      </div>
    </div>
    <div class="numpad">
      <div class="numpad-container">
        <div v-for="n in 9" :key="n">
          <button @click="add(n)" :class="{ locked: output === 1 }">{{ n }}</button>
        </div>
        <div>
          <button class="remove" :class="{ locked: input.length === 0 || output === 1 }" @click="remove">
            <Icon :icon="faClose" />
          </button>
        </div>
        <div>
          <button :class="{ locked: output === 1 || (calculation.c !== 0 && input.length === 0) }" @click="add(0)">
            0
          </button>
        </div>
        <div v-if="output !== 1">
          <button class="evaluate" :class="{ locked: output === 2 || input.length === 0 }" @click="evaluate">
            <Icon :icon="faEquals" />
          </button>
        </div>
        <div v-if="output === 1">
          <button class="reload" @click="reload"><Icon :icon="faStar" /></button>
        </div>
      </div>
    </div>
    <div v-if="settingsVisible" class="settings">
      <div class="settings-container">
        <span class="heading">{{ $t('settings.headline') }}</span>

        <div class="options">
          <div class="option-label">{{ $t('settings.addition') }}</div>
          <div class="option-field">
            <span @click="toggleMode(OPERATOR_ADD)">
              <Icon :icon="settingsToggleModes.OPERATOR_ADD ? faToggleOn : faToggleOff" />
            </span>
          </div>
          <div class="option-label">{{ $t('settings.number_min') }}</div>
          <div class="option-field">
            <input :value="settings.min" type="number" @input="(e) => (settings.min = changeInputInt(e, 9))" />
          </div>
          <div class="option-label">{{ $t('settings.subtraction') }}</div>
          <div class="option-field">
            <span @click="toggleMode(OPERATOR_SUBTRACT)">
              <Icon :icon="settingsToggleModes.OPERATOR_SUBTRACT ? faToggleOn : faToggleOff" />
            </span>
          </div>
          <div class="option-label">{{ $t('settings.number_max') }}</div>
          <div class="option-field">
            <input :value="settings.max" type="number" @input="(e) => (settings.max = changeInputInt(e, 9))" />
          </div>
          <div class="option-spacer"></div>
          <div class="option-label">{{ $t('settings.number_many') }}</div>
          <div class="option-field">
            <input :value="settings.many" type="number" @input="(e) => (settings.many = changeInputInt(e, 9))" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <span class="hidden">
    {{ output }}
    {{ settings }}
  </span>
  <div class="footer">
    <!--
    <span>
      <RouterLink class="calculator" to="/">
        <Icon :icon="faPlusMinus" />
      </RouterLink>
    </span>
    <span>
      <RouterLink class="words" to="/words">
        <Icon :icon="faA" />
      </RouterLink>
    </span>
    -->
    <span>
      <a class="settings" @click="settingsVisible = !settingsVisible">
        <Icon :icon="faGears" />
      </a>
    </span>
    <span>
      <a class="reload" @click="reload">
        <Icon :icon="faRotate" />
      </a>
    </span>
  </div>
</template>

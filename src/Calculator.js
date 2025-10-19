import {
  ERROR_INVALID_INPUT,
  ERROR_LONG_SEPARATOR,
  ERROR_NUMBER_SEPARATOR,
  ERROR_START_OR_END_SEPARATOR,
} from './constants/messages.js';

const DEFAULT_SEPARATORS = [',', ':'];

class Calculator {
  constructor(inputValue) {
    this.inputValue = inputValue;
    this.separators = [...DEFAULT_SEPARATORS];
    this.customSeparator = null;
  }

  extractCustomSeparator() {
    if (!this.inputValue.startsWith('//')) return;

    const endIdx = this.inputValue.indexOf('\\n');
    if (endIdx === -1) {
      return;
    }

    this.customSeparator = this.inputValue.slice(2, endIdx);
    this.separators = [...DEFAULT_SEPARATORS, this.customSeparator];
    this.inputValue = this.inputValue.slice(endIdx + 2);
  }

  splitInput() {
    const regex = new RegExp(`[${this.separators.join('')}]`);
    this.splitString = this.inputValue.split(regex);
  }

  isNumber(value) {
    const regex = /^[0-9]+$/;
    return regex.test(value);
  }

  isStartOrEndWithSeparator() {
    const startChar = this.inputValue.charAt(0);
    const endChar = this.inputValue.charAt(this.inputValue.length - 1);
    return (
      this.separators.includes(startChar) || this.separators.includes(endChar)
    );
  }

  isCustomSeparatorTooLong(value) {
    return value.length >= 2;
  }

  validate() {
    if (this.isStartOrEndWithSeparator()) {
      throw new Error(`${ERROR_START_OR_END_SEPARATOR}`);
    }
    this.splitString.forEach((value) => {
      if (!this.isNumber(value)) {
        throw new Error(`${ERROR_INVALID_INPUT}`);
      }
    });
    if (
      this.customSeparator &&
      this.isCustomSeparatorTooLong(this.customSeparator)
    ) {
      throw new Error(`${ERROR_LONG_SEPARATOR}`);
    }
    if (this.isNumber(this.customSeparator)) {
      throw new Error(`${ERROR_NUMBER_SEPARATOR}`);
    }
  }

  calculate() {
    if (this.inputValue === '') {
      return 0;
    }
    this.extractCustomSeparator();
    this.splitInput();
    this.validate();
    return this.splitString.reduce((sum, value) => sum + Number(value), 0);
  }
}

export default Calculator;

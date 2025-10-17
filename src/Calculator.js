const DEFAULT_SEPARATORS = [',', ':'];

class Calculator {
  constructor(inputValue) {
    this.inputValue = inputValue;
    this.separators = [...DEFAULT_SEPARATORS];
    this.customSeparator = null;
  }
  extractCustomSeparator() {
    if (this.inputValue.startsWith('//')) {
      const endIdx = this.inputValue.indexOf('\\n');
      this.customSeparator = this.inputValue.slice(2, endIdx);
      this.separators = [...DEFAULT_SEPARATORS, this.customSeparator];
      this.inputValue = this.inputValue.slice(endIdx + 2);
    } else {
      this.separators = DEFAULT_SEPARATORS;
    }
  }
  splitInput() {
    const regex = new RegExp(`[${this.separators.join('')}]`);
    this.splitString = this.inputValue.split(regex);
  }
  isNumInput(value) {
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
      throw new Error('[ERROR] 구분자로 시작하거나 끝날 수 없습니다.');
    }
    this.splitString.forEach((value) => {
      if (!this.isNumInput(value)) {
        throw new Error('[ERROR] 유효하지 않은 입력값입니다.');
      }
    });
    if (
      this.customSeparator &&
      this.isCustomSeparatorTooLong(this.customSeparator)
    ) {
      throw new Error('[ERROR] 구분자가 2자 이상일 수 없습니다.');
    }
  }
  calculate() {
    this.extractCustomSeparator();
    this.splitInput();
    this.validate();
  }
}

export default Calculator;

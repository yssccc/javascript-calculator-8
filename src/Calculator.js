const DEFAULT_SEPARATORS = [',', ':'];

class Calculator {
  constructor(inputValue) {
    this.inputValue = inputValue;
    this.separators = [...DEFAULT_SEPARATORS];
  }
  extractCustomSeparator() {
    if (this.inputValue.startsWith('//')) {
      const endIdx = this.inputValue.indexOf('\\n');
      const customSeparator = this.inputValue.slice(2, endIdx);
      this.separators = [...DEFAULT_SEPARATORS, customSeparator];
    } else {
      this.separators = DEFAULT_SEPARATORS;
    }
  }
}

export default Calculator;

import Calculator from './Calculator.js';
import { INPUT_MESSAGE } from './constants/messages.js';
import Input from './Input.js';
class App {
  constructor() {
    this.input = new Input();
  }
  async run() {
    const inputValue = await this.input.getInput(INPUT_MESSAGE);
    const calculator = new Calculator(inputValue);
    calculator.extractCustomSeparator();
  }
}

export default App;

import Calculator from './Calculator.js';
import { INPUT_MESSAGE, OUTPUT_MESSAGE } from './constants/messages.js';
import Input from './Input.js';
import { Console } from '@woowacourse/mission-utils';
class App {
  constructor() {
    this.input = new Input();
  }
  async run() {
    try {
      const inputValue = await this.input.getInput(INPUT_MESSAGE);
      const calculator = new Calculator(inputValue);
      calculator.calculate();
    } catch (error) {
      Console.print(error.message);
    }
  }
}

export default App;

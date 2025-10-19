import { Console } from '@woowacourse/mission-utils';
import Calculator from './Calculator.js';
import { INPUT_MESSAGE, OUTPUT_MESSAGE } from './constants/messages.js';
import Input from './Input.js';

class App {
  constructor() {
    this.input = new Input();
  }

  async run() {
    try {
      const inputValue = await this.input.getInput(INPUT_MESSAGE);
      const calculator = new Calculator(inputValue);
      const sum = calculator.calculate();
      if (sum !== null && sum !== undefined) {
        Console.print(`${OUTPUT_MESSAGE} ${sum}`);
      }
    } catch (error) {
      Console.print(error.message);
      throw error;
    }
  }
}

export default App;

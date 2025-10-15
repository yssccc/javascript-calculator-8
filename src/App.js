import { INPUT_MESSAGE } from './constants/messages.js';
import Input from './input.js';
class App {
  constructor() {
    this.input = new Input();
  }
  async run() {
    const inputValue = await this.input.getInput(INPUT_MESSAGE);
  }
}

export default App;

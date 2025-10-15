import { Console } from '@woowacourse/mission-utils';

class Input {
  async getInput(message) {
    const input = await Console.readLineAsync(message);
    return input;
  }
}
export default Input;

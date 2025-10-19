import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('문자열 계산기', () => {
  test('커스텀 구분자 사용', async () => {
    const inputs = ['//;\\n1'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 1'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('공백 입력 시 0 출력', async () => {
    const inputs = ['    '];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 0'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('예외 테스트', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);

    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  describe('추가 예외 테스트', () => {
    test('구분자로 시작하거나 끝날 수 없습니다. (시작)', async () => {
      const inputs = [',1,2,3'];
      mockQuestions(inputs);

      const app = new App();
      await expect(app.run()).rejects.toThrow(
        '[ERROR] 구분자로 시작하거나 끝날 수 없습니다.',
      );
    });

    test('구분자로 시작하거나 끝날 수 없습니다. (끝)', async () => {
      const inputs = ['1,2,3,'];
      mockQuestions(inputs);

      const app = new App();
      await expect(app.run()).rejects.toThrow(
        '[ERROR] 구분자로 시작하거나 끝날 수 없습니다.',
      );
    });

    test('유효하지 않은 입력값입니다.', async () => {
      const inputs = ['1,a,3'];
      mockQuestions(inputs);

      const app = new App();
      await expect(app.run()).rejects.toThrow(
        '[ERROR] 유효하지 않은 입력값입니다.',
      );
    });

    test('구분자가 2자 이상일 수 없습니다.', async () => {
      const inputs = ['//;;\\n1;;2;;3'];
      mockQuestions(inputs);

      const app = new App();
      await expect(app.run()).rejects.toThrow(
        '[ERROR] 구분자가 2자 이상일 수 없습니다.',
      );
    });

    test('구분자가 숫자일 수 없습니다.', async () => {
      const inputs = ['//1\\n123'];
      mockQuestions(inputs);

      const app = new App();
      await expect(app.run()).rejects.toThrow(
        '[ERROR] 구분자가 숫자일 수 없습니다.',
      );
    });

    test('구분자가 공백일 수 없습니다.', async () => {
      const inputs = ['// \\n1 2 3'];
      mockQuestions(inputs);

      const app = new App();
      await expect(app.run()).rejects.toThrow(
        '[ERROR] 구분자가 공백일 수 없습니다.',
      );
    });
  });
});

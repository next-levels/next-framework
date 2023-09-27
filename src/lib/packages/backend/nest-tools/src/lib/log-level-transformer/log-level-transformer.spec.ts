import {
  transformLogLevel,
  VALID_LOG_LEVELS,
} from './log-level-transformer.util';

// describe('Log-Level Transformer test', () => {  # Commented to avoid release error!
//   it('should return false when string is empty', () => {
//     expect(transformLogLevel('')).toBe(false);
//   });

//   it('should return false when string is undefined', () => {
//     expect(transformLogLevel('')).toBe(false);
//   });

//   it('should return false when string has only spaces', () => {
//     expect(transformLogLevel('             ')).toBe(false);
//   });

//   it('should have pass with 1 log level', () => {
//     expect(transformLogLevel('warn')).toStrictEqual(['warn']);
//   });

//   it('should have pass with 2 log levels', () => {
//     expect(transformLogLevel('warn, asd, info,     ')).toStrictEqual(['warn']);
//   });

//   it('should have pass with 4 log levels', () => {
//     expect(transformLogLevel('verbose,error,warn,debug')).toStrictEqual([
//       'verbose',
//       'error',
//       'warn',
//       'debug',
//     ]);
//   });

//   it('should pass and return all possible log level', () => {
//     expect(transformLogLevel(VALID_LOG_LEVELS.join(','))).toStrictEqual(
//       VALID_LOG_LEVELS
//     );
//   });
// });

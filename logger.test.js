const logger = require('./logger');
const fs = require('fs');
const path = require('path');

describe('Logger Tests', () => {
  const logFilePath = path.join(__dirname, 'logs', 'combined.log');

  beforeAll(() => {
    // Ensure log directory exists
    if (!fs.existsSync(path.dirname(logFilePath))) {
      fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
    }
    // Clear log file before tests
    if (fs.existsSync(logFilePath)) {
      fs.unlinkSync(logFilePath);
    }
  });

  test('should log info messages to combined.log', (done) => {
    logger.info('Test info message');

    setTimeout(() => {
      const logContent = fs.readFileSync(logFilePath, 'utf8');
      expect(logContent).toMatch(/Test info message/);
      done();
    }, 100); // Wait for the logger to write to the file
  });
});

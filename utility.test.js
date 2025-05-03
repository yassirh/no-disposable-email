const fs = require('fs');
const path = require('path');

jest.mock('fs');

const { isDisposable } = require('./utility');

describe('isDisposable', () => {
  beforeEach(() => {
    // Mock disposable_email_blocklist.conf with two domains
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue('mailinator.com\ntemp-mail.org\n');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns true for a disposable domain', () => {
    expect(isDisposable('test@mailinator.com')).toBe(true);
    expect(isDisposable('user@temp-mail.org')).toBe(true);
  });

  it('returns false for a non-disposable domain', () => {
    expect(isDisposable('test@gmail.com')).toBe(false);
    expect(isDisposable('user@example.com')).toBe(false);
  });

  it('returns false for malformed emails', () => {
    expect(isDisposable('notanemail')).toBe(false);
    expect(isDisposable('user@')).toBe(false);
  });
});

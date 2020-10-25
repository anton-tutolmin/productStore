const {
  UserValidationService,
} = require('../../src/sevices/userValidationService');
const errors = require('../../src/errors/errors');

const userValidationService = new UserValidationService();

describe('Test user validation service', () => {
  it('validation username should throw error', async () => {
    const validate = userValidationService.validateUsername;

    expect(() => validate('ant')).toThrowError(errors.notCorrectUsername);
    expect(() => validate()).toThrowError(errors.notCorrectUsername);
    expect(() => validate('!^?ant')).toThrowError(errors.notCorrectUsername);
  });

  it('validation password should throw error', async () => {
    const validate = userValidationService.validatePassword;

    expect(() => validate()).toThrowError(errors.notCorrectPassword);
    expect(() => validate('')).toThrowError(errors.notCorrectPassword);
  });

  it('validation phone should throw error', async () => {
    const validate = userValidationService.validatePhone;

    expect(() => validate()).toThrowError(errors.notCorrectPhone);
    expect(() => validate(1234)).toThrowError(errors.notCorrectPhone);
    expect(() => validate('1111111').toThrowError(errors.notCorrectPhone));
    expect(() => validate('1111111111r').toThrowError(errors.notCorrectPhone));
  });

  it('validation email should throw error', async () => {
    const validate = userValidationService.validateEmail;

    expect(() => validate()).toThrowError(errors.notCorrectEmail);
    expect(() => validate(1234)).toThrowError(errors.notCorrectEmail);
    expect(() => validate('anton@test.com')).toThrowError(
      errors.notCorrectEmail,
    );
  });

  it('validation balance should throw error', async () => {
    const validate = userValidationService.validateBalance;

    expect(() => validate()).toThrowError(errors.notCorrectBalance);
    expect(() => validate('1234')).toThrowError(errors.notCorrectBalance);
    expect(() => validate(-1)).toThrowError(errors.notCorrectBalance);
  });

  it('validation status should throw error', async () => {
    const validate = userValidationService.validateStatus;

    expect(() => validate()).toThrowError(errors.notCorrectStatus);
    expect(() => validate(1234)).toThrowError(errors.notCorrectStatus);
    expect(() => validate('something')).toThrowError(errors.notCorrectStatus);
  });
});

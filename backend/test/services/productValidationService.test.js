const {
  ProductValidationService,
} = require('../../src/sevices/productValidationService');
const errors = require('../../src/errors/errors');

const productValidationService = new ProductValidationService();

describe('Test product validation service', () => {
  it('validation productname should throw error', async () => {
    expect(() => productValidationService.validateProductname()).toThrowError(
      errors.notCorrectProductname,
    );

    expect(() =>
      productValidationService.validateProductname('asd'),
    ).toThrowError(errors.notCorrectProductname);

    expect(() =>
      productValidationService.validateProductname('asd123##!asd'),
    ).toThrowError(errors.notCorrectProductname);
  });

  it('validation description should throw error', async () => {
    expect(() => productValidationService.validateDescription()).toThrowError(
      errors.notCorrectDescription,
    );

    expect(() =>
      productValidationService.validateDescription('asdf'),
    ).toThrowError(errors.notCorrectDescription);

    expect(() =>
      productValidationService.validateDescription('asd!@#asd'),
    ).toThrowError(errors.notCorrectDescription);
  });

  it('validation coast should throw error', async () => {
    expect(() => productValidationService.validateCoast()).toThrowError(
      errors.notCorrectCoast,
    );

    expect(() => productValidationService.validateCoast('15')).toThrowError(
      errors.notCorrectCoast,
    );

    expect(() => productValidationService.validateCoast(-15)).toThrowError(
      errors.notCorrectCoast,
    );
  });

  it('validation img should throw error', async () => {
    expect(() => productValidationService.validateImg()).toThrowError(
      errors.notCorrectImg,
    );

    expect(() => productValidationService.validateImg(4567)).toThrowError(
      errors.notCorrectImg,
    );

    expect(() =>
      productValidationService.validateImg('ad!@#s.jpg'),
    ).toThrowError(errors.notCorrectImg);
  });
});

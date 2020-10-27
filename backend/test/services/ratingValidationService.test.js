const {
  RatingValidationService,
} = require('../../src/sevices/ratingValidationService');
const errors = require('../../src/errors/errors');

describe('Test rating validation test', () => {
  it('validation creating rating should throw error', async () => {
    const rvs1 = new RatingValidationService({
      checkIfClientExists: () => false,
      checkIfCurierExists: () => true,
    });

    expect(
      rvs1.validateCreating({ clientId: 1, curierId: 1, rating: 5 }),
    ).rejects.toEqual(new Error(errors.notCorrectClientId));

    expect(rvs1.validateCreating({ curierId: 1, rating: 5 })).rejects.toEqual(
      new Error(errors.notCorrectClientId),
    );

    expect(
      rvs1.validateCreating({ clientId: '1', curierId: 1, rating: 5 }),
    ).rejects.toEqual(new Error(errors.noSuchClient));

    const rvs2 = new RatingValidationService({
      checkIfClientExists: () => true,
      checkIfCurierExists: () => false,
    });

    expect(
      rvs2.validateCreating({ clientId: '1', curierId: 1, rating: 5 }),
    ).rejects.toEqual(new Error(errors.notCorrectCurierId));

    expect(rvs2.validateCreating({ clientId: '1', rating: 5 })).rejects.toEqual(
      new Error(errors.notCorrectCurierId),
    );

    expect(
      rvs2.validateCreating({ clientId: '1', curierId: '1', rating: 5 }),
    ).rejects.toEqual(new Error(errors.noSuchCurier));

    const rvs3 = new RatingValidationService({
      checkIfClientExists: () => true,
      checkIfCurierExists: () => true,
    });

    expect(
      rvs3.validateCreating({ clientId: '1', curierId: '1', rating: 6 }),
    ).rejects.toEqual(new Error(errors.notCorrectRating));

    expect(
      rvs3.validateCreating({ clientId: '1', curierId: '1' }),
    ).rejects.toEqual(new Error(errors.notCorrectRating));

    expect(
      rvs3.validateCreating({ clientId: '1', curierId: '1', rating: '6' }),
    ).rejects.toEqual(new Error(errors.notCorrectRating));
  });

  it('validation removing rating should throw error', async () => {
    const rvs1 = new RatingValidationService({
      checkIfClientExists: () => false,
      checkIfCurierExists: () => true,
    });

    expect(
      rvs1.validateRemoving({ clientId: 1, curierId: 1, rating: 5 }),
    ).rejects.toEqual(new Error(errors.notCorrectClientId));

    expect(rvs1.validateRemoving({ curierId: 1, rating: 5 })).rejects.toEqual(
      new Error(errors.notCorrectClientId),
    );

    expect(
      rvs1.validateRemoving({ clientId: '1', curierId: 1, rating: 5 }),
    ).rejects.toEqual(new Error(errors.noSuchClient));

    const rvs2 = new RatingValidationService({
      checkIfClientExists: () => true,
      checkIfCurierExists: () => false,
    });

    expect(
      rvs2.validateRemoving({ clientId: '1', curierId: 1, rating: 5 }),
    ).rejects.toEqual(new Error(errors.notCorrectCurierId));

    expect(rvs2.validateRemoving({ clientId: '1', rating: 5 })).rejects.toEqual(
      new Error(errors.notCorrectCurierId),
    );

    expect(
      rvs2.validateRemoving({ clientId: '1', curierId: '1', rating: 5 }),
    ).rejects.toEqual(new Error(errors.noSuchCurier));
  });
});

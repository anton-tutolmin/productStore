const {
  OrderValidationService,
} = require('../../src/sevices/orderValidationService');
const errors = require('../../src/errors/errors');

const orderValidationService = new OrderValidationService();

describe('Test order validation service', () => {
  it('validation update order by client should throw error', async () => {
    expect(() =>
      orderValidationService
        .validateClientUpdate('delivering', 'created', 'client')
        .toThrowError(errors.notAllowedOrderStatus),
    );

    expect(() =>
      orderValidationService
        .validateClientUpdate('done', 'delivering', 'client')
        .toThrowError(errors.clientMayOnlyDone),
    );

    expect(() =>
      orderValidationService
        .validateClientUpdate('canceled', 'delivering', 'client')
        .toThrowError(errors.cancelDoneOrder),
    );
  });

  it('validation update order by curier should throw error', async () => {
    expect(() =>
      orderValidationService.validateCurierUpdate(
        'delivering',
        'delivering',
        'curier',
      ),
    ).toThrowError(errors.alreadyDeliveringOrCancel);

    expect(() =>
      orderValidationService.validateCurierUpdate(
        'delivered',
        'created',
        'curier',
      ),
    ).toThrowError(errors.notDelivering);

    expect(() =>
      orderValidationService.validateCurierUpdate('canceled', 'done', 'curier'),
    ).toThrowError(errors.cancelMayOnlyClient);

    expect(() =>
      orderValidationService.validateCurierUpdate('created', 'done', 'curier'),
    ).toThrowError(errors.resetNotDelivering);
  });
});

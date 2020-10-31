const errors = require('../errors/errors');

class OrderValidationService {
  constructor() {
    this.allowedStatus = [
      'created',
      'delivering',
      'delivered',
      'done',
      'canceled',
      'reset',
    ];
  }

  validateUpdateBody(newStatus, oldStatus, userType) {
    if (!this.allowedStatus.includes(newStatus)) {
      throw new Error(errors.notAllowedOrderStatus);
    }

    if (userType === 'client') {
      this.validateClientUpdate(newStatus, oldStatus);
    } else if (userType === 'curier') {
      this.validateCurierUpdate(newStatus, oldStatus);
    } else if (userType === 'admin') {
      this.validateAdminUpdate(newStatus);
    } else {
      throw new Error(errors.notCorrectUserType);
    }
  }

  // For case when client changes order status
  validateClientUpdate(newStatus, oldStatus) {
    if (newStatus !== 'done' && newStatus !== 'canceled') {
      throw new Error(errors.notAllowedOrderStatus);
    }
    if (newStatus === 'done' && oldStatus !== 'delivered') {
      throw new Error(errors.clientMayOnlyDone);
    }
    if (newStatus === 'canceled' && oldStatus !== 'created') {
      throw new Error(errors.cancelDoneOrder);
    }
  }

  // For case when curier changes order status
  validateCurierUpdate(newStatus, oldStatus) {
    if (newStatus === 'delivering' && oldStatus !== 'created') {
      throw new Error(errors.alreadyDeliveringOrCancel);
    }
    if (newStatus === 'delivered' && oldStatus !== 'delivering') {
      throw new Error(errors.notDelivering);
    }
    if (newStatus === 'canceled' || newStatus === 'done') {
      throw new Error(errors.cancelMayOnlyClient);
    }
    if (newStatus === 'created' && oldStatus !== 'delivering') {
      throw new Error(errors.resetNotDelivering);
    }
  }
}

module.exports = {
  OrderValidationService,
  orderValidationService: new OrderValidationService(),
};

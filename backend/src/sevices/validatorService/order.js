const errors = require('../../errors/errors');

const allowedStatus = [
  'created',
  'delivering',
  'delivered',
  'done',
  'canceled',
  'reset',
];

function validateUpdateBody(newStatus, oldStatus, userType) {
  if (!allowedStatus.includes(newStatus)) {
    throw new Error(errors.notAllowedOrderStatus);
  }

  if (userType === 1) {
    validateClientUpdate(newStatus, oldStatus);
  } else if (userType === 2) {
    validateCurierUpdate(newStatus, oldStatus);
  } else if (userType === 3) {
    validateAdminUpdate(newStatus);
  } else {
    throw new Error(errors.notCorrectUserType);
  }
}

// For case when client changes order status
function validateClientUpdate(newStatus, oldStatus) {
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
function validateCurierUpdate(newStatus, oldStatus) {
  if (newStatus === 'delivering' && oldStatus !== 'created') {
    throw new Error(errors.alreadyDeliveringOrCancel);
  }
  if (newStatus === 'delivered' && oldStatus !== 'delivering') {
    throw new Error(errors.notDelivering);
  }
  if (newStatus === 'canceled' || newStatus === 'done') {
    throw new Error(errors.cancelMayOnlyClient);
  }
  if (
    newStatus === 'created' &&
    oldStatus !== 'delivering' &&
    oldStatus !== 'delivered'
  ) {
    throw new Error(errors.resetNotDelivering);
  }
}

// For case when admin change order status
function validateAdminUpdate(newStatus) {
  // TODO
}

module.exports = {
  validateUpdateBody,
};

const allowedStatus = ['created', 'delivering', 'delivered', 'done', 'canceled'];

function validateUpdateBody(newStatus, oldStatus, userType) {
  if (!allowedStatus.includes(newStatus)) {
    throw new Error('Not allowed order status');
  }
  if (userType === 1) {
    validateClientUpdate(newStatus, oldStatus);
  } else if (userType === 2) {
    validateCurierUpdate(newStatus, oldStatus);
  } else if (userType === 3) {
    validateAdminUpdate(newStatus);
  } else {
    throw new Error('Not correct user type');
  }
}

// For case when client changes order status
function validateClientUpdate(newStatus, oldStatus) {
  if (newStatus !== 'done' && newStatus !== 'cancel') {
    throw new Error('Not allowed order status');
  }
  if (newStatus === 'done' && oldStatus !== 'delivered') {
    throw new Error('Client may set order status only done');
  }
  if (newStatus === 'canceled' && oldStatus === 'done') {
    throw new Error('Cant cancel order that is done');
  }
}

// For case when curier changes order status
function validateCurierUpdate(newStatus, oldStatus) {
  if (newStatus === 'delivering' && oldStatus !== 'created') {
    throw new Error('This order is already delivering or canceled');
  }
  if (newStatus === 'delivered' && oldStatus !== 'delivering') {
    throw new Error('Order was not delivering');
  }
  if (newStatus === 'canceled' || newStatus === 'done') {
    throw new Error('Cancel or done order may only client');
  }
  if (newStatus === 'created' && (oldStatus !== 'delivering' && oldStatus !== 'delivered')) {
    throw new Error('Cant reset not delivering order')
  }
  if (!allowedStatus.includes(newStatus)) {
    throw new Error('Not correct status');
  }
}

// For case when admin change order status
function validateAdminUpdate(newStatus) {
  if (!allowedStatus.includes(newStatus)) {
    throw new Error('Not correct status');
  }
}

module.exports = {
  validateUpdateBody
}
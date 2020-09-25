import React from 'react';
import { connect } from 'react-redux';
import { RequestItem } from '../../components/request/requestItem.jsx';
import { doUpdateOrder } from '../../store/actions/async/order';
import './requests.sass';

const Requests = (props) => {
  const { requests, takeRequest } = props;

  const onTakeRequest = (orderId) => {
    takeRequest(orderId, 'delivering');
  };

  return (
    <div className="requests">
      {requests.map((r) => (
        <div className="request__container" key={r.id}>
          <RequestItem
            product={r.product}
            client={r.client}
            orderId={r.id}
            take={onTakeRequest}
          />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  requests: state.requests.requests,
});

const mapDispatchToProps = (dispatch) => ({
  takeRequest: (orderId, status) =>
    dispatch(doUpdateOrder(orderId, status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Requests);

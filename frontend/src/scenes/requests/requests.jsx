import React from 'react';
import { connect } from 'react-redux';
import { RequestItem } from '../../components/request/requestItem.jsx';
import { doTakeRequest } from '../../store/actions/async/order';
import { Loader } from '../../components/loader/loader.jsx';
import './requests.sass';

const Requests = (props) => {
  const { requests, loading, takeRequest } = props;

  const onTakeRequest = (orderId) => {
    takeRequest(orderId);
  };

  return (
    <div className="requests">
      {loading ? (
        <Loader />
      ) : (
        requests.map((r) => (
          <div className="request__container" key={r.id}>
            <RequestItem
              orderId={r.id}
              productId={r.productId}
              clientId={r.clientId}
              take={onTakeRequest}
            />
          </div>
        ))
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  requests: state.requests.requests,
  loading: state.requests.loading,
});

const mapDispatchToProps = (dispatch) => ({
  takeRequest: (orderId) => dispatch(doTakeRequest(orderId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Requests);

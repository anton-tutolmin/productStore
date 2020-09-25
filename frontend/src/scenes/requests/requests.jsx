import React from 'react';
import { connect } from 'react-redux';
import { RequestItem } from '../../components/request/requestItem.jsx';
import './requests.sass';

const Requests = (props) => {
  const { requests } = props;
  return (
    <div className="requests">
      {requests.map((r) => (
        <div className="request__container" key={r.id}>
          <RequestItem
            product={r.product}
            client={r.client}
            orderId={r.id}
          />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  requests: state.requests.requests,
});

export default connect(mapStateToProps, null)(Requests);

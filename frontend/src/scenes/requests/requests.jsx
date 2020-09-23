import React from 'react';
import { connect } from 'react-redux';
import { RequestItem } from '../../components/request/requestItem.jsx';
import { products } from '../../constants/mock';
import './request.sass';

const Requests = (props) => {
  console.log(props.requests);
  return (
    <div className="requests">
      {products.map((p) => (
        <div className="request__container" key={p.id}>
          <RequestItem product={p} />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  requests: state.requests.requests,
});

export default connect(mapStateToProps, null)(Requests);

import React, { useState, useEffect } from 'react';
import orderAgent from '../../utils/agent/orders';
import { CardButton } from '../../components/buttons/cardButton';
import './orderInfo.sass';

export function OrderInfo(props) {
  const [status, setStatus] = useState('');
  const [product, setProduct] = useState({});
  const [curier, setCurier] = useState({});

  useEffect(() => {
    let unmounted = false;

    async function loadOrder() {
      const response = await orderAgent.loadById(props.match.params.id);

      if (!unmounted) {
        setProduct(response.product);
        setStatus(response.status);

        if (response.curier) {
          setCurier(response.curier);
        }
      }
    }

    loadOrder();

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <div className="order-info">
      <div className="order-info__container">
        <h1>Info:</h1>
        <ul>
          <li>
            <img className="order-info__img" src={product.img} alt="product" />
          </li>
          <li>name: {product.productname}</li>
          <li>coast: ${product.coast}</li>
          <li>status: {status}</li>
          <li>curier: {curier.username}</li>
        </ul>
        {!curier.username ? (
          <CandidateList
            orderId={props.match.params.id}
            setCurier={setCurier}
          />
        ) : null}
      </div>
    </div>
  );
}

function CandidateList(props) {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    let unmounted = false;

    async function loadCandidates() {
      const response = await orderAgent.loadCandidates(props.orderId);
      if (!unmounted) {
        setCandidates(response.candidates);
      }
    }

    loadCandidates();

    return () => {
      unmounted = true;
    };
  }, []);

  const pickCandidate = async (candidate) => {
    await orderAgent.pickCandidate(props.orderId, candidate.id);
    props.setCurier(candidate);
  };

  return (
    <div>
      <h1>Candidates:</h1>
      {candidates.map((candidate) => (
        <CandidateItem
          key={candidate.id}
          candidate={candidate}
          pickCandidate={pickCandidate}
        />
      ))}
    </div>
  );
}

function CandidateItem(props) {
  const { candidate, pickCandidate } = props;

  return (
    <div className="candidate__item">
      <div>{candidate.username}</div>
      <div>
        <CardButton label="Pick" onClick={() => pickCandidate(candidate)} />
      </div>
    </div>
  );
}

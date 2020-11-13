import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import Scenes from '../scenes/index.jsx';
import { doAuth } from '../store/actions/async/auth';
import './App.sass';
import { RatingModal } from '../components/modals/ratingModal';

const App = (props) => {
  useEffect(() => {
    if (props.needAuth) {
      props.authorize();
    }
  });

  return (
    <div className="app">
      <Router>
        {/* <Scenes /> */}
        <RatingModal />
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  needAuth: state.auth.needAuth,
});

const mapDispatchToProps = (dispatch) => ({
  authorize: () => dispatch(doAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

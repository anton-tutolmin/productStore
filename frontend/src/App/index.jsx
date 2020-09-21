import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import Scenes from '../scenes/index.jsx';
import { doAuth } from '../store/actions/async/auth';
import './App.sass';

const App = (props) => {
  useEffect(() => {
    if (props.needAuth) {
      props.authorize();
    }
  });

  return (
    <div className="app">
      <Router>
        <Scenes auth={props.auth} />
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth.auth,
  needAuth: state.auth.needAuth,
});

const mapDispatchToProps = (dispatch) => ({
  authorize: () => dispatch(doAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

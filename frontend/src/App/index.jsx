import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import Scenes from '../scenes/index.jsx';
import './App.sass';

const App = (props) => {
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
});

export default connect(mapStateToProps, null)(App);

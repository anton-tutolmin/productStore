import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';

import { Navbar } from '../components/navbar/navbar.jsx';
import { NavbarItem } from '../components/navbar/navbarItem.jsx';
import './App.sass';

export const App = () => {
  return (
    <div className="app">
      <Provider store={store}>
        <Router>
          <Navbar>
            <NavbarItem path="/products" label="Products" />
            <NavbarItem path="/order" label="Order" />
            <NavbarItem path="/delivery" label="Delivery" />
            <NavbarItem path="/request" label="Request" />
          </Navbar>
        </Router>
      </Provider>
    </div>
  );
};

export default App;

import React from 'react';
import './App.sass'
import {Navbar} from '../components/navbar/Navbar.jsx'

export const App = props => {
  return (
   <div className="app">
     <Navbar/>
     Content
     <span>SCSS</span>
   </div>
  );
}
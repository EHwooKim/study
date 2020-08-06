import React from 'react';
import './App.css';

import Header from './components/Header/Header'
import Todo from './components/Todo/Todo'

const App = () => {
  return (
    <div className="App">
      <Header />
      <Todo />
    </div>
  );
}

export default App;

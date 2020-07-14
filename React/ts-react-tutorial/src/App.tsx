import React from 'react';
import Greetings from './Greetings'
import Counter from './Counter'
import ReducerCounter from './ReducerCounter'
import ReducerSample from './ReducerSample'
import MyForm from './MyForm'
import './App.css';

function App() {
  const onClick = (name: string) => {
    console.log(`${name} says hello`)
  }
  const onSubmit = (form:{name: string, description: string}): void => {
    console.log(`${form.name} - ${form.description}`)
  }
  return (
    <> 
      <Greetings name='Kim' onClick={onClick}/>
      <Counter />
      <MyForm onSubmit={onSubmit}/>
      <ReducerCounter />
      <ReducerSample />
    </>
  );
}

export default App;

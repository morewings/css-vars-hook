import React from 'react';
import {DemoColor} from 'environment/DemoColor';
import {DemoMovement} from 'environment/DemoMovement';
import classes from './App.module.css';

const App = () => (
  <div className={classes.container}>
    <DemoColor />
    <DemoMovement />
  </div>
);

export default App;

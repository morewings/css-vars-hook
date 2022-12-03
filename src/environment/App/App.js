import React from 'react';
import {DemoColor} from 'environment/DemoColor';
import {DemoMovement} from 'environment/DemoMovement';
import {DemoRoot} from 'environment/DemoRoot';
import classes from './App.module.css';

export const App = () => (
  <div className={classes.container}>
    <DemoColor />
    <DemoMovement />
    <DemoRoot />
  </div>
);

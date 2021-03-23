import React, { Component } from 'react';
import Main from './components/Main';
import './App.css';
import { SnackbarProvider } from 'notistack';

export default class App extends Component
{
  render ()
  {
    return (
      <div id="anchor">
        <SnackbarProvider maxSnack={ 3 }>
          <Main />
        </SnackbarProvider>
      </div>
    );
  }
}

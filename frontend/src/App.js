import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import TicketPage from './pages/TicketPage';
import TicketDetailsPage from './pages/TicketDetailsPage';
import ReduxService from './services/ReduxService';


class App extends Component {
  render() {
    return (
      <Provider store={ReduxService.store}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/ticketdetails/*" component={TicketDetailsPage} />
            <Route path="/tickets" component={TicketPage} />
            <Route path="/" component={MainPage} />
            <Redirect path="*" to="/" />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

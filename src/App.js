import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HeroCardList from './components/HeroCardList';
import HeroInfo from './components/HeroInfo';

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='container-fluid'>

          <Switch>
            <Route
              exact={true}
              path='/'
              component={HeroCardList}
            />

            <Route
              path='/detail/:id'
              render={({ match }) => (
                <HeroInfo id={match.params.id} />
              )}
            />

            <Route
              render={() => (
                <h1>Invalid address.</h1>
              )}
            />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}
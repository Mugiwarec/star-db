import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random_planet';
import SwapiService from '../../services/SwapiService';
import DummySwapiService from '../../services/dummy-swapi-service';
import ErrorBoundry from '../error_boundry';
import {PeoplePage, PlanetsPage, StarshipsPage} from '../pages';
import {SwapiServiceProvider} from '../swapi_service_context';

import './App.css';
import {StarshipDetails} from '../sw_components';

export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
  };

  componentDidCatch() {
    console.log('componentDidCatch()');
    this.setState({hasError: true});
  };

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService
        ? DummySwapiService
        : SwapiService;
      console.log('switched to', Service.name);

      return {
        swapiService: new Service(),
      };
    });
  };

  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange}/>
              <RandomPlanet/>

              <Route path="/"
                     render={() => <h2>Welcome to STARDB</h2>}
                     exact/>
              <Route path="/people/:id?" component={PeoplePage}/>
              <Route path="/planets" component={PlanetsPage}/>
              <Route path="/starships" exact component={StarshipsPage}/>
              <Route path="/starships/:id"
                     render={({match}) => {
                       const {id} = match.params;
                       return <StarshipDetails itemId={id}/>;
                     }}/>

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  };
};

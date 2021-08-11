import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random_planet';
import SwapiService from "../../services/SwapiService";
import DummySwapiService from "../../services/dummy-swapi-service";
import ErrorBoundry from "../error_boundry";
import {SwapiServiceProvider} from "../swapi_service_context";
import {
    PersonDetails,
    PlanetDetails,
    StarshipDetails,
    PersonList,
    PlanetList,
    StarshipList
} from '../sw_components';

import './App.css';

export default class App extends Component {

    state = {
        showRandomPlanet: true,
        swapiService: new DummySwapiService()
    };

    componentDidCatch() {
        console.log('componentDidCatch()');
        this.setState({hasError: true});
    };

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
            console.log('switched to', Service.name);

            return {
                swapiService: new Service()
            };
        });
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            };
        });
    };

    render() {

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> : null;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <div className="stardb-app">
                        <Header onServiceChange={this.onServiceChange}/>
                        {planet}

                        <PersonDetails itemId={11}/>
                        <PlanetDetails itemId={11}/>
                        <StarshipDetails itemId={11}/>

                        <PersonList/>
                        <StarshipList/>
                        <PlanetList/>
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    };
};

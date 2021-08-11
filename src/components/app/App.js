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

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true
    };

    componentDidCatch() {
        console.log('componentDidCatch()');
        this.setState({hasError: true});
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
            <RandomPlanet/> :
            null;

        const {getAllPeople, getAllPlanets} = this.swapiService;

        // const personDetails = (
        //     <ItemDetails
        //         itemId={11}
        //         getData={getPerson}
        //         getImageUrl={getPersonImage}>
        //
        //         <Record field="gender" label="Gender"/>
        //         <Record field="eyeColor" label="Eye Color"/>
        //
        //     </ItemDetails>
        // );
        //
        // const starshipDetails = (
        //     <ItemDetails
        //         itemId={5}
        //         getData={getStarship}
        //         getImageUrl={getStarshipImage}>
        //
        //         <Record field="model" label="Model"/>
        //         <Record field="length" label="Length"/>
        //         <Record field="costInCredits" label="Cost"/>
        //
        //     </ItemDetails>
        // );

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService}>
                    <div className="stardb-app">
                        <Header/>
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

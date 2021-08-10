import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random_planet';
import SwapiService from "../../services/SwapiService";
import ErrorBoundry from "../error_boundry";
import {
    PersonDetails,
    PlanetDetails,
    StarshipDetails,
    PersonList,
    PlanetList,
    StarshipList
} from '../sw-components';

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
                <div className="stardb-app">
                    <Header/>
                    {planet}

                    {/*<div className="row mb2 button-row">*/}
                    {/*    <button*/}
                    {/*        className="toggle-planet btn btn-warning btn-lg"*/}
                    {/*        onClick={this.toggleRandomPlanet}>*/}
                    {/*        Toggle Random Planet*/}
                    {/*    </button>*/}
                    {/*    <ErrorButton/>*/}
                    {/*</div>*/}

                    {/*<PeoplePage/>*/}
                    {/*<Row*/}
                    {/*    left={personDetails}*/}
                    {/*    right={starshipDetails}/>*/}

                    <PersonDetails itemId={11}/>
                    <PlanetDetails itemId={11}/>
                    <StarshipDetails itemId={11}/>

                    <PersonList>
                        {({name}) => <span>{name}</span>}
                    </PersonList>
                    <StarshipList>
                        {({name}) => <span>{name}</span>}
                    </StarshipList>
                    <PlanetList>
                        {({name}) => <span>{name}</span>}
                    </PlanetList>
                </div>
            </ErrorBoundry>
        );
    };
};

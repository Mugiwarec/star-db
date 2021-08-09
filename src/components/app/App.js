import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random_planet';
import ErrorButton from "../error_button";
import ErrorIndicator from "../error_indicator";
import PeoplePage from "../people_page";

import './App.css';

export default class App extends Component {

    state = {
        showRandomPlanet: true,
        hasError: false
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

        if (this.state.hasError) {
            return <ErrorIndicator/>;
        }

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> :
            null;

        return (
            <div className="stardb-app">
                <Header/>
                {planet}

                <div className="row mb2 button-row">
                    <button
                        className="toggle-planet btn btn-warning btn-lg"
                        onClick={this.toggleRandomPlanet}>
                        Toggle Random Planet
                    </button>
                    <ErrorButton/>
                </div>

                <PeoplePage/>
                <PeoplePage/>
                <PeoplePage/>
            </div>
        );
    };
};

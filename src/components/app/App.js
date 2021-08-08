import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random_planet';
import ItemList from '../item_list';
import PersonDetails from '../person_details';

import './App.css';

export default class App extends Component {

    render() {
        return (
            <div>
                <Header />
                <RandomPlanet />

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails />
                    </div>
                </div>
            </div>
        );
    };
};

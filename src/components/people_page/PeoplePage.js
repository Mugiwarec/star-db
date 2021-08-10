import React, {Component} from 'react';

import ItemList from "../item_list";
import ItemDetails, {Record} from "../item_details";
import Row from "../row"
import SwapiService from "../../services/SwapiService";
import ErrorBoundry from "../error_boundry";

import './PeoplePage.css';

export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: 3
    };

    onPersonSelected = (selectedPerson) => {
        this.setState({selectedPerson});
    };

    render() {

        const {getPerson, getPersonImage} = this.swapiService;

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}>

                {(i) => (
                    `${i.name} (${i.gender}, ${i.birthYear})`
                )}

            </ItemList>
        );

        const personDetails = (
            <ItemDetails
                itemId={this.state.selectedPerson}
                getData={getPerson}
                getImageUrl={getPersonImage}>

                <Record field="gender" label="Gender"/>
                <Record field="eyeColor" label="Eye Color"/>

            </ItemDetails>
        );

        return (
            <Row left={itemList} right={personDetails}/>
        );
    };
};

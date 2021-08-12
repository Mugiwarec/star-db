import React from "react";

import ItemList from "../item_list/ItemList";
import {withData} from "../hoc_helpers";
import {withSwapiService} from "../hoc_helpers";

const withChildFunction = (fn) => (Wrapped) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        );
    };
};

const renderName = ({name}) => <span>{name}</span>;
const renderModelAndName = ({model, name}) => <span>{name} ({model})</span>;

const mapPersonMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople
    };
};
const mapPlanetMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    };
};
const mapStarshipMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    };
};


const PersonList = withSwapiService(mapPersonMethodsToProps)
(withData(
    withChildFunction(renderName)(
        ItemList)));
const PlanetList = withSwapiService(mapPlanetMethodsToProps)
(withData(
    withChildFunction(renderName)(
        ItemList)));
const StarshipList = withSwapiService(mapStarshipMethodsToProps)
(withData(
    withChildFunction(renderModelAndName)(
        ItemList)));

export {
    PersonList,
    PlanetList,
    StarshipList
};

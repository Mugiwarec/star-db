import React from "react";
import ItemList from "../item_list/ItemList";
import {withData} from "../hoc_helpers";
import SwapiService from "../../services/SwapiService";

const swapiService = new SwapiService();

const {
    getAllPeople,
    getAllStarships,
    getAllPlanets
} = swapiService;

const PersonList = withData(ItemList, getAllPeople);
const PlanetList = withData(ItemList, getAllPlanets);
const StarshipList = withData(ItemList, getAllStarships);

export {
    PersonList,
    PlanetList,
    StarshipList
};
import React, {Component} from 'react';

import SwapiService from "../../services/SwapiService";
import ErrorIndicator from "../error_indicator"
import Spinner from "../spinner";

import './RandomPlanet.css';

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true
    };

    static defaultProps = {
        updateInterval: 10000
    };

    componentDidMount() {
        const {updateInterval} = this.props;
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, updateInterval);
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    };

    onPlanetloaded = (planet) => {
        this.setState({
            planet,
            loading: false,
            error: false
        });
    };

    onError = (error) => {
        this.setState({
            error: true,
            loading: false
        });
    };

    updatePlanet = () => {
        console.log('update');
        const id = Math.floor(Math.random() * 25) + 3;

        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetloaded)
            .catch(this.onError);
    };

    render() {

        const {planet, loading, error} = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = hasData ? <PlanetView planet={planet}/> : null;

        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    };
};

const PlanetView = ({planet}) => {

    const {id, name, population, rotationPeriod, diameter} = planet;

    return (
        <React.Fragment>
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
};

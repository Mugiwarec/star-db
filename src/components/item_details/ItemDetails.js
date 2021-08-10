import React, {Component} from 'react';

import SwapiService from "../../services/SwapiService";
import Spinner from "../spinner";
import ErrorButton from "../error_button";

import './ItemDetails.css';

export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        loading: true,
        image: null
    };

    componentDidMount() {
        this.updateItem();
    };

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.setState({loading: true});
            this.updateItem();
        }
    };

    updateItem() {
        const {itemId, getData, getImageUrl} = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({item, loading: false, image: getImageUrl(item)});
            });
    };

    render() {

        const {item, loading, image} = this.state;

        if (!item) {
            return <span>Select a item from a list</span>;
        }

        const spinner = loading ? <Spinner/> : null;
        const content = !loading ? <ItemView item={item} image={image} children={this.props.children}/> : null;

        return (
            <div className="person-details card">
                {spinner}
                {content}
            </div>
        );
    };
};

const Record = ({item, field, label}) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

const ItemView = ({item, image, children}) => {

    const {
        id, name, gender,
        birthYear, eyeColor
    } = item;

    return (
        <React.Fragment>
            <img className="person-image"
                 src={image}
                 alt="item"/>

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(children, (child) => {
                            return React.cloneElement(child, {item});
                        })
                    }
                </ul>
                <ErrorButton/>
            </div>
        </React.Fragment>
    );
};

export {
    Record
};

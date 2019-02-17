import React, { Component } from 'react';

import Header from '../header';
import ErrorIndicator from '../error-indicator';
import SwapiService from "../../service/swapi-service";
import Row from "../row";


import './app.css';
import ItemDetails, { Record } from "../item-details";



export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        hasError: false,
    }

    componentDidCatch() {
        this.state({ hasError: true, });
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const { getPerson, getPersonImage,
                getStarship, getStarshipImage } = this.swapiService;

        const personDetails = (
            <ItemDetails
                getData={getPerson}
                getImageUrl={getPersonImage}
                itemId={3} >

                <Record field="gender" label="Gender" />
                <Record field="eyeColor" label="Eye Color" />

            </ItemDetails>
        );

        const starShipDetails = (
            <ItemDetails
                getData={getStarship}
                getImageUrl={getStarshipImage}
                itemId={5} >

                <Record field="crew" label="Crew" />
                <Record field="length" label="Length" />

            </ItemDetails>
        );
        return (
            <div className="container">
                <Header />

                <Row
                    left={personDetails}
                    right={starShipDetails} />
            </div>
        );
    };
};

import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ErrorIndicator from '../error-indicator';

import './app.css';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import SwapiService from "../../service/swapi-service";

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

        return (
            <div className="container">
                <Header />
                <RandomPlanet />
                <PeoplePage />

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList
                            onItemSelected={this.onPersonSelected}
                            getItemData={this.swapiService.getAllStarShips}
                        />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.personSelected} />
                    </div>
                </div>
            </div>
        );
    };
};

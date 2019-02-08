import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import SwapiService from "../../service/swapi-service";
import Row from "../row";

import './app.css';


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

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getItemData={this.swapiService.getAllStarShips}
                renderItem={ (item) => (<span>{item.name} <button>!</button></span>) }
            />
        );

        const personDetails = (
            <PersonDetails personId={this.state.personSelected} />
        );

        return (
            <div className="container">
                <Header />
                <RandomPlanet />
                <PeoplePage />

                <Row left={itemList} right={personDetails}/>
            </div>
        );
    };
};

import React, { Component } from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import SwapiService from "../../service/swapi-service";
import Row from "../row";

import './people-page.css';




export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        personSelected: 5,
        hasError: false,
    }

    componentDidCatch() {
        this.state({ hasError: true, });
    }

    onPersonSelected = (id) => {
      this.setState({
        personSelected: id,
      })
    };


    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getItemData={this.swapiService.getAllPeople}
                renderItem={ ({name, gender, birthYear }) => `${name} (${gender}, ${birthYear})` }
            />
        );

        const personDetails = (
            <PersonDetails personId={this.state.personSelected} />
        );

        return (
            <Row left={itemList} right={personDetails}/>
        );
    }
}

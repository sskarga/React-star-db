import React, { Component } from 'react';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import SwapiService from "../../service/swapi-service";
import Row from "../row";
import ErrorBoundry from "../error-boundry";

import './people-page.css';


export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        personSelected: 5,
    };

    onPersonSelected = (id) => {
      this.setState({
        personSelected: id,
      })
    };

    render() {

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getItemData={this.swapiService.getAllPeople} >

                { (i) => (
                    `${i.name} (${i.birthYear})`
                )}

            </ItemList>
        );

        const personDetails = (
            <ItemDetails personId={this.state.personSelected} />
        );

        return (
            <ErrorBoundry>
                <Row left={itemList} right={personDetails}/>
            </ErrorBoundry>
        );
    }
}

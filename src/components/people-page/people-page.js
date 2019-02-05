import React, { Component } from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';

import './people-page.css';
import SwapiService from "../../service/swapi-service";

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

        return (
            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList onItemSelected={this.onPersonSelected}
                              getItemData={this.swapiService.getAllPeople}
                    />
                </div>
                <div className="col-md-6">
                    <PersonDetails personId={this.state.personSelected} />
                </div>
            </div>
        );
    }
}

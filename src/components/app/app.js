import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';

import './app.css';

export default class App extends Component {

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
      <div className="container">
        <Header />
        <RandomPlanet />

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected}/>
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.personSelected} />
          </div>
        </div>
      </div>
    );
    };
};

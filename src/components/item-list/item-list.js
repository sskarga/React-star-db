import React, { Component } from 'react';
import SwapiService from '../../service/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './item-list.css';

export default class ItemList extends Component {

  swapiService = new SwapiService();

  state = {
    peopleList: null,
    loading: true,
    error: false,
  };

  onPeopleLoaded = (itemList) => {
    this.setState({
      peopleList: itemList,
      loading: false,
      error: false,
    });
  };

  onError = (err) => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  componentDidMount() {
    this.swapiService
        .getAllPeople()
        .then(this.onPeopleLoaded)
        .catch(this.onError);
  }

  renderItems(arr) {
    return arr.map(({id, name}) => {
      return (
      <li className="list-group-item"
          key={id} 
          onClick={ () => {this.props.onItemSelected(id)} }>
          {name}
      </li>
      );
    });
  }

  render() {
    const { peopleList, loading, error } = this.state;

    const errorMsg = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;

    const hasData = !(loading || error);
    const items = hasData ? this.renderItems(peopleList) : null;
    
    return ( 
      <React.Fragment> 
        {spinner} 
        {errorMsg}    
        <ul className="item-list list-group">
          {items}
        </ul>
      </React.Fragment>
    );
  }
}

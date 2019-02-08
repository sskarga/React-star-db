import React, { Component } from 'react';
import SwapiService from '../../service/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './item-list.css';

export default class ItemList extends Component {

  swapiService = new SwapiService();

  state = {
    itemList: null,
    loading: true,
    error: false,
  };

  onPeopleLoaded = (itemList) => {
    this.setState({
      itemList,
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
    const { getItemData } = this.props;
    getItemData()
        .then(this.onPeopleLoaded)
        .catch(this.onError);
  }

  renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;
      const label = this.props.renderItem(item);

      return (
      <li className="list-group-item"
          key={id} 
          onClick={ () => {this.props.onItemSelected(id)} }>
          {label}
      </li>
      );
    });
  }

  render() {
    const { itemList, loading, error } = this.state;

    const errorMsg = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;

    const hasData = !(loading || error);
    const items = hasData ? this.renderItems(itemList) : null;
    
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

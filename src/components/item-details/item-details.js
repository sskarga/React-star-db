import React, { Component } from 'react';
import Spinner from '../spinner';

import './item-details.css';

const Record = ({ item, field, label }) => {
  return (
      <li className="list-group-item">
        <span className="term">{label}</span>
        <span>{item[field]}</span>
      </li>
  );
};

export {
  Record
};

export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if(this.props.itemId !== prevProps.itemId) {
      this.setState({loading: true,})
      this.updateItem();
    }
  } 

  updateItem() {

    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) {
      return;
    }

    getData(itemId)
        .then( (item) => {
          this.setState({
            item,
            image: getImageUrl(item)
          });
        });
  };

  render() {

    const { item, image } = this.state;

    if (!item) {
      return <Spinner />;
    }

    return (
      <div className="item-details card mt-0">
        <img className="item-image"
             src={image} />

        <div className="card-body">
          <h4>{item.name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, {item});
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}


import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    return (
      <div className="card col-md-3 m-2 px-0">
        <img src={this.props.item.image} className="card-img cardImage mx-auto"></img>
      </div>
    );
  }
}

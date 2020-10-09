import React from 'react';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setView('details', { productid: this.props.item.productid });
  }

  render() {
    return (
      <div className="card col-md-3 m-2 px-0" onClick={this.handleClick}>
        <img src={this.props.item.image} className="card-img cardImage mx-auto"></img>
      </div>
    );
  }
}

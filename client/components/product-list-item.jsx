import React from 'react';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  // handleClick() {
  //   console.log(this.props.item);
  // }

  render() {
    return (
      <div className="card col-md-3 m-2 px-0" onClick={this.handleClick}>
        <img src={this.props.item.image} className="card-img cardImage mx-auto"></img>
      </div>
    );
  }
}

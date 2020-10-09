import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.productid.productid}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          product: data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleClick() {
    this.props.setView('catalog', {});
  }

  render() {
    return !this.state.product
      ? <h1>Retrieving data...</h1>
      : <>
        <div className="container">
          <p className="backToCatalog mb-5" onClick={this.handleClick}>
          Back to Catalog
          </p>
          <div className="row">
            <div className="d-flex justify-content-between">
              <img className="card-img imageDetail col-md-5" src={this.state.product.image} alt="Card image cap"></img>
              <div className="card-body col-md-5">
                <h4 className="card-title text-center">{this.state.product.title}</h4>
                <br></br>
                <h5 className="card-text">{this.state.product.description}</h5>
                <h5 className="card-text">${Math.round(this.state.product.price) / 100}</h5>
              </div>
            </div>
          </div>
        </div>
      </>;
  }
}

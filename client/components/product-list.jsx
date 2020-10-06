import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(data =>
        this.setState({
          products: data
        }))
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const productArray = this.state.products.map(items => <ProductListItem setView={this.props.setView} item={items} key={items.productid} />);
    return (
      <div className="container">
        <div className="row justify-content-center">
          {productArray}
        </div>
      </div>
    );
  }
}

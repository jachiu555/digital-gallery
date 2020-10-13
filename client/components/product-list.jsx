import React from 'react';
import ProductListItem from './product-list-item';
import ProductForm from './product-form';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      show: false
    };

    this.showModal = this.showModal.bind(this);
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

  showModal(e) {
    this.setState({
      show: true
    });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const productArray = this.state.products.map(items => <ProductListItem setView={this.props.setView} item={items} key={items.productid} />);

    const modal = this.state.show ? <ProductForm /> : null;

    return (
      <div className="container">
        <i className="fas fa-plus" onClick={this.showModal}></i>
        <div className="row justify-content-center">
          {productArray}
          {modal}
        </div>
      </div>
    );
  }
}

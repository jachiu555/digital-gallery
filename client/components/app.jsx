import React from 'react';
import ProductList from './product-list';
import ProductDetails from './product-details';
import ProductForm from './product-form';
import Header from './header';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      }
    };

    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  renderView() {
    if (this.state.view.name === 'details') {
      return <ProductDetails setView={this.setView} productid={this.state.view.params}/>;
    } else if (this.state.view.name === 'catalog') {
      return <ProductList setView={this.setView}/>;
    } else if (this.state.view.name === 'modal') {
      return <ProductForm setView={this.setView}/>;
    }
  }

  render() {
    return this.state.isLoading
      ? <h1>Testing connections...</h1>
      : <>
        <Header setView={this.setView} />
        {this.renderView()}
      </>;
  }
}

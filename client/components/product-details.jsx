import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      editing: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  handleUpdate() {
    this.setState({
      editing: true
    });
  }

  handleSave() {
    const productData = { ...this.state.product };

    this.setState({
      editing: false
    });

    fetch(`/api/products/${this.state.product.productid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }

  handleDelete() {
    fetch(`/api/products/${this.state.product.productid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(this.props.setView('catalog', {}))
      .catch(error => {
        console.error(error);
      });
  }

  handleEdit(e) {
    const productData = { ...this.state.product };
    productData[e.target.name] = e.target.value;

    this.setState({
      product: productData
    });
  }

  renderDefault() {
    return (
      <>
        <h4 className="card-title text-center">{this.state.product.title}</h4>
        <br></br>
        <h5 className="card-text">{this.state.product.description}</h5>
        <h5 className="card-text">${Math.round(this.state.product.price) / 100}</h5>
      </>
    );
  }

  renderUpdate() {
    return (
      <>
        <input name="title" type="text" value={this.state.product.title} onChange={this.handleEdit}/>
        <input name="description" type="text" value={this.state.product.description} onChange={this.handleEdit}/>
        <input name="price" type="text" value={this.state.product.price} onChange={this.handleEdit}/>
      </>
    );
  }

  render() {
    return !this.state.product
      ? <h1>Retrieving data...</h1>
      : <>
        <div className="container">
          <div className="menuContainer row justify-content-between">
            <p className="backToCatalog mb-5" onClick={this.handleClick}>
              Back to Catalog
            </p>
            <p className="deleteArt" onClick={this.handleDelete}>Delete</p>
          </div>
          <div className="row">
            <div className="d-flex justify-content-between">
              <img className="card-img imageDetail col-md-5" src={this.state.product.image} alt="Card image cap"></img>
              <div className="card-body col-md-5">
                {!this.state.editing ? (<button className="btn-primary" onClick={this.handleUpdate}>Update</button>) : <button className="btn-secondary" onClick={this.handleSave}>Save</button>}

                {!this.state.editing ? <>{this.renderDefault()}</> : <>{this.renderUpdate()}</>}
              </div>
            </div>
          </div>
        </div>
      </>;
  }
}

import React from 'react';

export default class ProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      price: '',
      description: '',
      image: ''
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onUploadImage = this.onUploadImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  onPriceChange(event) {
    const re = /^[0-9\b]+$/;

    if (event.target.value === '' || re.test(event.target.value)) {
      this.setState({
        price: event.target.value
      });
    }
  }

  onDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  onUploadImage(event) {
    const [file] = event.target.files;
    const fr = new FileReader();

    fr.readAsDataURL(file);
    fr.addEventListener('loadend', () => {
      this.setState({
        image: fr.result
      });
    });
  }

  handleSubmit(event) {
    const myForm = document.getElementById('myForm');
    const formData = new FormData(myForm);

    fetch('/api/products', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className='container modalContainer'>
        <i className="fas fa-times" onClick={() => this.props.hideModal()}></i>
        <h1 className="text-center">Add an image</h1>
        <br></br>
        <form id="myForm" name="myForm" encType="multipart/form-data" onSubmit={this.handleSubmit}>
          <div className="form-inline justify-content-center mb-5">
            <label className="mr-5 formTextSize" htmlFor="title">Title</label>
            <input value={this.state.title} onChange={this.onTitleChange} type="text" name="title" className="form-control" placeholder="Text"></input>
          </div>
          <div className="form-inline justify-content-center mb-5">
            <label className="mr-5 formTextSize" htmlFor="formGroupExampleInput2">Price</label>
            <input value={this.state.price} onChange={this.onPriceChange} type="text" name="price" className="form-control" id="formGroupExampleInput2" placeholder="Amount"></input>
          </div>
          <div className="form-inline justify-content-center mb-5">
            <label className="mr-5 formTextSize" htmlFor="formGroupExampleInput2">Description</label>
            <input value={this.state.description} onChange={this.onDescriptionChange} type="text" name="description" className="form-control" id="formGroupExampleInput2" placeholder="Information"></input>
          </div>
          <div className="custom-file mb-5">
            <input result={this.state.image} onChange={this.onUploadImage} type="file" name="myImage" className="custom-file-input" id="customFile"></input>
            <label className="custom-file-label" htmlFor="customFile">Choose file</label>
          </div>

          <div className="d-flex justify-content-center buttonContainer">
            <input className="btn btn-primary mb-5" type="submit" value="Submit"></input>
          </div>
        </form>
      </div>
    );
  }
}

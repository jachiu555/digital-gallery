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
    // console.log(this.state);
    event.preventDefault();

    // const formData = new FormData(event.target);

    // formData.append('title', 'testformdata');
    // formData.append('price', `${this.state.price}`);
    // formData.append('description', `${this.state.description}`);
    // formData.append('image', `${this.state.image}`);

    // console.log(formData, 'thisisevent.target', event.target);

    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(result => {
        console.error(result);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className='container modalContainer'>
        <h1 className="text-center">Add an image</h1>
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <div className="form-inline justify-content-center mb-5">
            <label className="mr-5 formTextSize" htmlFor="formGroupExampleInput">Title</label>
            <input value={this.state.title} onChange={this.onTitleChange} type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input"></input>
          </div>
          <div className="form-inline justify-content-center mb-5">
            <label className="mr-5 formTextSize" htmlFor="formGroupExampleInput2">Price</label>
            <input value={this.state.price} onChange={this.onPriceChange} type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input"></input>
          </div>
          <div className="form-inline justify-content-center mb-5">
            <label className="mr-5 formTextSize" htmlFor="formGroupExampleInput2">Description</label>
            <input value={this.state.description} onChange={this.onDescriptionChange} type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input"></input>
          </div>
          <div className="custom-file mb-5">
            <input result={this.state.image} onChange={this.onUploadImage} type="file" className="custom-file-input" id="customFile"></input>
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

import React from 'react';

export default class ProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      price: '',
      description: '',
      upload: ''
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
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

  render() {
    return (
      <div className='container modalContainer'>
        <form>
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
          <div className="pl-4 form-inline justify-content-center">
            <label className="mr-5 formTextSize" htmlFor="exampleFormControlFile1">Example file input</label>
            <input type="file" className="form-control-file formTextSize" id="exampleFormControlFile1"></input>
          </div>
        </form>
      </div>
    );
  }
}

import React from 'react';

export default class ProductForm extends React.Component {
  // constructor(props) {
  //   super(props);

  // }

  render() {
    return (
      <div className='container modalContainer'>
        <form>
          <div className="form-inline justify-content-center mb-5">
            <label className="mr-5 formTextSize" htmlFor="formGroupExampleInput">Title</label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input"></input>
          </div>
          <div className="form-inline justify-content-center mb-5">
            <label className="mr-5 formTextSize" htmlFor="formGroupExampleInput2">Price</label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input"></input>
          </div>
          <div className="form-inline justify-content-center mb-5">
            <label className="mr-5 formTextSize" htmlFor="formGroupExampleInput2">Description</label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input"></input>
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

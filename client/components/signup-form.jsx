import React from 'react';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      email: ''
    };

    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
  }

  onFirstNameChange(event) {
    this.setState({
      firstName: event.target.value
    });
  }

  onLastNameChange(event) {
    this.setState({
      lastName: event.target.value
    });
  }

  onUserNameChange(event) {
    this.setState({
      userName: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  onEmailChange(event) {
    this.setState({
      email: event.target.value
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
      <form className="container d-flex justify-content-center">
        <div className="form-group align-items-center">
          <div className="col-md-12 my-3">
            <h1 className="title">Sign Up</h1>
            <label className="sr-only" htmlFor="inlineFormInputName">First Name</label>
            <input type="text" className="form-control" id="inlineFormInputName" placeholder="First Name"></input>
          </div>
          <div className="col-md-12 my-3">
            <label className="sr-only" htmlFor="inlineFormInputName">Last Name</label>
            <input type="text" className="form-control" id="inlineFormInputName" placeholder="Last Name"></input>
          </div>
          <div className="col-md-12 my-3">
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email address"></input>
            <small id="emailHelp" className="form-text text-muted">We&apos;ll never share your email with anyone else.</small>
          </div>
          <div className="col-md-12 my-3">
            <label className="sr-only" htmlFor="inlineFormInputGroupUsername">Username</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">@</div>
              </div>
              <input type="text" className="form-control" id="inlineFormInputGroupUsername" placeholder="Username"></input>
            </div>
          </div>
          <div className="col-md-12 my-3">
            <label className="sr-only" htmlFor="inlineFormInputName">Password</label>
            <input type="text" className="form-control" id="inlineFormInputName" placeholder="Password"></input>
          </div>
          <div className="col-auto my-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="autoSizingCheck2"></input>
              <label className="form-check-label" htmlFor="autoSizingCheck2">Remember me</label>
            </div>
          </div>
          <div className="col-auto my-3">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

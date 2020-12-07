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
      <form className="container">
        <div className="form-row">
          <div className="col-md-3 mb-3">
            <label htmlFor="validationDefault01">First name</label>
            <input type="text" className="form-control" id="validationDefault01" placeholder="First name" required></input>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="validationDefault02">Last name</label>
            <input type="text" className="form-control" id="validationDefault02" placeholder="Last name" required></input>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="validationDefaultUsername">Username</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend2">@</span>
              </div>
              <input type="text" className="form-control" id="validationDefaultUsername" placeholder="Username" aria-describedby="inputGroupPrepend2" required></input>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="validationDefault03">City</label>
            <input type="text" className="form-control" id="validationDefault03" placeholder="City" required></input>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="validationDefault04">State</label>
            <input type="text" className="form-control" id="validationDefault04" placeholder="State" required></input>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="validationDefault05">Zip</label>
            <input type="text" className="form-control" id="validationDefault05" placeholder="Zip" required></input>
          </div>
        </div>
        <div className="form-group">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required></input>
            <label className="form-check-label" htmlFor="invalidCheck2">
                            Agree to terms and conditions
            </label>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    );
  }

}

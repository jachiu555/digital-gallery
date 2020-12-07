import React from 'react';

export default class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: ''
    };

    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
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
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    );
  }

}

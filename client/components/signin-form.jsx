import React from 'react';

export default class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // userName: '',
      // password: ''
      users: []
    };

    // this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  // onUserNameChange(event) {
  //   this.setState({
  //     userName: event.target.value
  //   });
  // }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  getUsers() {
    fetch('/api/users')
      .then(response => response.json())
      .then(data =>
        this.setState({
          users: data
        }))
      .catch(error => console.error(error));
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
    const userArray = this.state.users.map(users => <option key={users}>{users}</option>);

    return (
      <form className="container d-flex justify-content-center">
        <div className="form-group align-items-center">
          <div className="col-md-12 my-3">
            <h1 className="title">Sign In</h1>
            {/* <label className="sr-only" htmlFor="inlineFormInputGroupUsername">Username</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">@</div>
              </div>
              <input type="text" className="form-control" id="inlineFormInputGroupUsername" placeholder="Username"></input>
            </div> */}
            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
              {userArray}
            </select>
          </div>
          {/* <div className="col-md-12 my-3">
            <label className="sr-only" htmlFor="inlineFormInputName">Password</label>
            <input type="text" className="form-control" id="inlineFormInputName" placeholder="Password"></input>
          </div> */}
          <div className="col-auto my-1">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="autoSizingCheck2"></input>
              <label className="form-check-label" htmlFor="autoSizingCheck2">
                        Remember me
              </label>
            </div>
          </div>
          <div className="col-auto my-1">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

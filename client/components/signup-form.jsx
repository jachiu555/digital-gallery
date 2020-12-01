import React from 'react';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: ''
    };
  }

  render() {
    return (
      <form className="container">
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <label htmlFor="validationDefault01">First name</label>
            <input type="text" className="form-control" id="validationDefault01" placeholder="First name" required></input>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="validationDefault02">Last name</label>
            <input type="text" className="form-control" id="validationDefault02" placeholder="Last name" required></input>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="validationDefaultUsername">Username</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend2">@</span>
              </div>
              <input type="text" className="form-control" id="validationDefaultUsername" placeholder="Username" aria-describedby="inputGroupPrepend2" required></input>
            </div>
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
        <button className="btn btn-primary" type="submit">Submit form</button>
      </form>
    );
  }

}

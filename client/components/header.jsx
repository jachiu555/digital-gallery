import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <div>
        <header>
          <div className="d-flex">
            <h3 className="mr-auto p-2">Digital Gallery</h3>
            <i className="fas fa-user-plus p-2 signUp"> Sign Up</i>
            <i className="fas fa-sign-in-alt p-2 signIn"> Sign In</i>
            <i className="fas fa-sign-out-alt p-2 signOut"> Sign Out</i>
          </div>
        </header>
      </div>
    );
  }
}

import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickGallery = this.handleClickGallery.bind(this);
    this.handleClickSignUp = this.handleClickSignUp.bind(this);
  }

  handleClickGallery() {
    this.props.setView('catalog', {});
  }

  handleClickSignUp() {
    this.props.setView('signup', {});
  }

  render() {
    return (
      <div>
        <header>
          <div className="d-flex">
            <h3 className="mr-auto p-2" onClick={this.handleClickGallery}>Digital Gallery</h3>
            <i className="fas fa-user-plus p-2 signUp" onClick={this.handleClickSignUp}> Sign Up</i>
            <i className="fas fa-sign-in-alt p-2 signIn"> Sign In</i>
            <i className="fas fa-sign-out-alt p-2 signOut"> Sign Out</i>
          </div>
        </header>
      </div>
    );
  }
}

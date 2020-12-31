import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickGallery = this.handleClickGallery.bind(this);
  }

  handleClickGallery() {
    this.props.setView('catalog', {});
  }

  render() {
    return (
      <div>
        <header>
          <div className="d-flex">
            <h3 className="mr-auto" onClick={this.handleClickGallery}>Digital Gallery</h3>
          </div>
        </header>
      </div>
    );
  }
}

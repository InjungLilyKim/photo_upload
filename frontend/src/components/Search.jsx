import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
    };

    this.handleSearchImage = this.handleSearchImage.bind(this);
  }

  handleSearchImage(ev) { 
      ev.prefentDefault();
      const data = new FormData();
      data.append('search', this.search.value);

      fetch('http;//localhost:8000/search', {
          method: 'POST',
          body: data,
      }).then((response) => {
          response.json().then((body) => {
              this.setState({ imageURL: `http://localhost:8000/${body.file}` });
          });
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSearchImage}>
        <div>
          <input ref={(ref) => { this.search = ref; }} type="text" placeholder="Enter the desired search keyworkd" />
        </div>
        <div>
          <button>Search</button>
        </div>
      </form>
        
    );
  }
}

export default Search;

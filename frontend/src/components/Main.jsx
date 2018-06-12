import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);
    data.append('tag1', this.tag1.value);
    data.append('tag2', this.tag2.value);
    data.append('tag3', this.tag3.value);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:8000/${body.file}` });
      });
    });
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
      <form onSubmit={this.handleUploadImage}>
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div>
        <div>
          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
        </div>
        <div>
          <input ref={(ref) => { this.tag1 = ref; }} type="text" placeholder="Enter the desired tag" />
        </div>
        <div>
          <input ref={(ref) => { this.tag2 = ref; }} type="text" placeholder="Enter the desired tag" />
        </div>
        <div>
          <input ref={(ref) => { this.tag3 = ref; }} type="text" placeholder="Enter the desired tag" />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
        <img src={this.state.imageURL} alt="img" />
      </form>
    );
  }
}

export default Main;

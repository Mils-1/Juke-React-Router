import React, { Component } from 'react';
import Songs from '../components/Songs';
import axios from 'axios';
// import { Email, Item, Span, A, renderEmail } from 'react-html-email'
import Mailto from 'react-mailto';

const fakeAlbum = {
  name: 'Yellow Submarine',
  id: 2,
  imageUrl: 'http://fillmurray.com/300/300',
  songs: [
    {
      id: 4,
      name: 'London Calling',
      artists: [
        { name: 'Bill' }
      ],
      genre: 'Punk',
      audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
    }
  ]
};

export default class SingleAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAlbum: {}
    };
  }

  componentDidMount () {
    const albumId = this.props.match.params.albumId;
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: album
      }));
  }


  render () {

    const album = this.state.selectedAlbum;

    return (
      <div className="album">
        <div className="albumTitleContainer">
          <h3>{ album.name }</h3>

          <Mailto
            email='recipient@address.com'
            obfuscate={true}
            headers={{
              subject: 'Awesome album',
              body: `Check this out:
              localhost:1337/#${this.props.match.url}`
            }}
          >
          {/*
            Can also wrap btn in a link tag:
            <a href="mailto:example@email.com?subject=Email%20Subject">
          */}

          <button
            className="btn btn-default btn-xs"
            id="share-btn"
          >
            <span className="glyphicon glyphicon-share"></span>
          </button>
          </Mailto>


        </div>
        <div>
          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs songs={album.songs} />
      </div>
    );
  }
}


// deselectAlbum () {
//   this.setState({ selectedAlbum: {}});
// }

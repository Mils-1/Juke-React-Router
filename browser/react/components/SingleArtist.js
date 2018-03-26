import React from 'react';
import axios from 'axios';


export default class SingleArtist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedArtist: {},
      artistAlbums: [],
      artistSongs: []
    };
  }

  componentDidMount () {
    const artistId = this.props.match.params.artistId;
    const getArtistPersonalInfo = () => axios.get(`/api/artists/${artistId}`);
    const getArtistAlbumInfo = () => axios.get( `/api/artists/${artistId}/albums`);
    const getArtistSongInfo = () => axios.get(`/api/artists/${artistId}/songs`);

    axios.all([
      getArtistPersonalInfo(),
      getArtistAlbumInfo(),
      getArtistSongInfo()
    ])
    .then(([artistInfo, artistAlbumInfo, artistSongInfo]) => {
      //console.log([artistInfo, artistAlbumInfo, artistSongInfo]);
      this.setState({
        selectedArtist: artistInfo.data,
        artistAlbums: artistAlbumInfo.data,
        artistSongs: artistSongInfo.data
      });
    });
  }

  render() {
    return(
      <div>
        <h3>{this.state.selectedArtist.name}</h3>
        <h4>ALBUMS</h4>
        <ul>
        {
          this.state.artistAlbums.map(album => {
            return <li key={album.id}>{album.name}</li>;
          })
        }
        </ul>
        <h4>SONGS</h4>
        <ul>
        {
          this.state.artistSongs.map(song => {
            return <li key={song.id}>{song.name}</li>;
          })
        }
        </ul>
      </div>
    );
  }



}


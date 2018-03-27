import React from "react";
import axios from "axios";
import Songs from "./Songs.js";
import AllAlbums from "./AllAlbums.js";
import { Route, NavLink } from "react-router-dom";

export default class SingleArtist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedArtist: {},
      artistAlbums: [],
      artistSongs: []
    };
  }

  componentDidMount() {
    const artistId = this.props.match.params.artistId;
    const getArtistPersonalInfo = () => axios.get(`/api/artists/${artistId}`);
    const getArtistAlbumInfo = () =>
      axios.get(`/api/artists/${artistId}/albums`);
    const getArtistSongInfo = () => axios.get(`/api/artists/${artistId}/songs`);

    axios
      .all([getArtistPersonalInfo(), getArtistAlbumInfo(), getArtistSongInfo()])
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
    return (
      <div>
        <h3>{this.state.selectedArtist.name}</h3>
        <ul className="nav nav-tabs">
          {console.log(`this.props.match`, this.props.match)}
          <li>
            <NavLink
              to={`${this.props.match.url}/albums`}
              activeClassName="active"
            >
              ALBUMS
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${this.props.match.url}/songs`}
              activeClassName="active"
            >
              SONGS
            </NavLink>
          </li>
        </ul>
        <Route
          path={`${this.props.match.path}/albums`}
          render={routeProps => <AllAlbums albums={this.state.artistAlbums} />}
        />

        <Route
          path={`${this.props.match.path}/songs`}
          render={routeProps => <Songs songs={this.state.artistSongs} />}
        />
      </div>
    );
  }
}
// <AllAlbums albums={this.state.artistAlbums} />
//         <h4>SONGS</h4>
//         <Songs songs={this.state.artistSongs} />

import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default class AllArtists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: []
    }
  }

  componentDidMount () {
    axios.get('/api/artists/')
      .then(res => res.data)
      .then(artists => {
        this.setState({ artists })
      });
  }

  render() {
    return (
      <div>
        <h3>Artists</h3>
          <div className="list-group">
          {
            this.state.artists.map(artist => {
              return (
                <div className="list-group-item" key={artist.id}>
                  {/* determine where to actually NavLink to later! */}
                  <NavLink
                    to={`/artists/${artist.id}`}
                    activeClassName="active"
                  >
                    { artist.name }
                  </NavLink>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }

}

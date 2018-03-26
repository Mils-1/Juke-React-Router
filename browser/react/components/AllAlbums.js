import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class AllAlbums extends React.Component {
  constructor (props) {
    super(props);
    this.state = { albums: [] };
  }

  componentDidMount () {
    axios.get('/api/albums/')
      .then(res => res.data)
      .then(albums => {
        this.setState({ albums })
      });
  }

  render () {
    //console.log(`this.props`, this.props)
    return (
      <div>
        <h3>Albums</h3>
        <div className="row">
        {
          this.state.albums.map(album => (
            <div className="col-xs-4" key={ album.id }>
              <Link
                className="thumbnail"
                to={`albums/${album.id}`}
                // href="#"
                // onClick={() => this.props.selectAlbum(album.id)}
              >
                <img src={ album.imageUrl } />
                <div className="caption">
                  <h5>
                    <span>{ album.name }</span>
                  </h5>
                  <small>{ album.songs.length } songs</small>
                </div>
              </Link>
            </div>
          ))
        }
        </div>
        {/* <Grandchild {...props} === albums={props.albums} selectAlbum={props.selectAlbum} /> */}
      </div>
    );
  }
}

// const allMessages = [message1, message2, ...restOfMessages]

import React from 'react';

export default function AllAlbums ({ albums, selectAlbum }) {
  // const albums = props.albums;
  // const selectAlbum = props.selectAlbum;

  return (
    <div>
      <h3>Albums</h3>
      <div className="row">
      {
        albums.map(album => (
          <div className="col-xs-4" key={ album.id }>
            <a className="thumbnail" href="#" onClick={() => selectAlbum(album.id)}>
              <img src={ album.imageUrl } />
              <div className="caption">
                <h5>
                  <span>{ album.name }</span>
                </h5>
                <small>{ album.songs.length } songs</small>
              </div>
            </a>
          </div>
        ))
      }
      </div>
      {/* <Grandchild {...props} === albums={props.albums} selectAlbum={props.selectAlbum} /> */}
    </div>
  );
}

// const allMessages = [message1, message2, ...restOfMessages]
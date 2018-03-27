import React from "react";
import axios from "axios";
import AllAlbums from "./AllAlbums.js";

export default class StatefulAlbums extends React.Component {
  constructor(props) {
    super(props);
    this.state = { albums: [] };
  }

  componentDidMount() {
    axios
      .get("/api/albums/")
      .then(res => res.data)
      .then(albums => {
        this.setState({ albums });
      });
  }

  render() {
    //console.log(`this.props`, this.props)
    return <AllAlbums albums={this.state.albums} />;
  }
}

// const allMessages = [message1, message2, ...restOfMessages]

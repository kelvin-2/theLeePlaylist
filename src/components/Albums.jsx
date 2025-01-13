import React from "react";
import "../styles/albums.css";
import { albumData } from "./albumData.jsx";

//DONT TOUCH THIS 
async function searchAlbum(query) {
  const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=album`,
      { headers: { Authorization: `Bearer ${token}` } }
  );
}


function Albums() {
  const token="BQA5DVjtqB5nOQourniz4p0YYEjr4t_6YUdAmAqQn97Dk-i6TEraZHh3hXSfbW3PYz2_35S9XGQyi5UYcbOU9ziA9wv1LhlVM3-CC5tmzFuuDSOmhYg";
  return (
    <div className="container">
     <h1 className="heading">
        <span className="highlight">Top 20 Albums</span>: The Soundtrack of My Life
      </h1>
      <div className="Searchbar">
         <input
            type="text"
           // value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for an album..."
          />
        <button className="button" onClick={searchAlbum}>Search</button>

      </div>
      <div className="album-container">
      {albumData.map((album, index) => (
        <div key={index} className="album-card">
          <p className="album-position">{index + 1}</p>
          <div className="album-cover">
            <img src={album.cover} alt={album.name} />
          </div>
          <div className="album-info">
            <p className="album-name">{album.name}</p>
            <p className="album-artist">{album.artist}</p>
          </div>
        </div>
      ))}
      </div>

    </div>

  );
}

export default Albums;

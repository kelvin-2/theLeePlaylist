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
  const token="";
  return (
    <div className="container">
     <h1 className="heading">
        <span className="highlight">Top 10 Albums</span>: The Soundtrack of My Life
      </h1>
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

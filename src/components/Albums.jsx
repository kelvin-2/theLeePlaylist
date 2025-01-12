import React from "react";
import "../styles/albums.css";
import { albumData } from "./albumData.jsx";

function Albums() {
  return (
    <div className="album-container">
      {albumData.map((album, index) => (
        <div key={index} className="album-card">
          <p className="album-position">Position: {index + 1}</p>
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
  );
}

export default Albums;

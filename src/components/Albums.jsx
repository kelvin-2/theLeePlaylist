import React from "react";

function makeAblum({ albumsList }) {
   
      <div className="album-container">
        {albumsList.map((album, index) => (
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
    
  }
  // Example usage
  const albumData = [
    { cover: "https://via.placeholder.com/150", name: "Album 1", artist: "Artist A" },
    { cover: "https://via.placeholder.com/150", name: "Album 2", artist: "Artist B" },
  ]

  function Albums(){
    return makeAblum({ albumsList: albumData })
  }

  export default Albums;
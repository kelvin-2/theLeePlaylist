import React, { useState } from "react";
import axios from "axios";
import '../styles/searchAlbums.css'

const SPOTIFY_TOKEN = ""; // Replace with a valid token

function SearchAlbums({ addToRanking }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  const searchAlbum = async () => {
    if (!searchQuery.trim()) return;
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchQuery}&type=album`,
        {
          headers: { Authorization: `Bearer ${SPOTIFY_TOKEN}` },
        }
      );
      setSearchResults(response.data.albums.items);
      setError("");
    } catch (err) {
      setError("Error fetching albums. Check your API token.");
      console.error(err);
    }
  };

  return (
    <div>
      <div claasName="searchBox">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for an album..."
        />
        <button onClick={searchAlbum}>Search</button>
      </div>

      {error && <p>{error}</p>}

      <div className="album-container">
        {searchResults.map((album, index) => (
          <div key={album.id} className="album-card">
            <p className="album-position">{index + 1}</p>
            <div className="album-cover">
              <img src={album.images[0]?.url} alt={album.name} />
            </div>
            <div className="album-info">
              <p className="album-name">{album.name}</p>
              <p className="album-artist">{album.artists[0].name}</p> {/* Fixed artist name */}
            </div>
            <select onChange={(e) => addToRanking(album, e.target.value)}>
              <option value="">Select Position</option>
              {[...Array(20).keys()].map((i) => (
                <option key={i} value={i + 1}>
                  Rank {i + 1}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchAlbums;

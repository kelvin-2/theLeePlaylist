import React, { useState } from "react";
import axios from "axios";
import '../styles/searchAlbums.css'

const SPOTIFY_TOKEN = "BQABzJOEpxY3SlyUAf-w1pWDO1g0WGsoAlgcW-0Wzcw-A21G45i54KHyIZZCC0DYiGq2P0gk8nmbcBI_5mQLK5qVvo_5GDXzDSPKC5d-S764NDfrjS78as2I19BVHWRGE745kuDCLweulwsadry2V9tC19C7lRjEQMlTVgVbYFWZWN5D3ZDxwp_j6FyQCGRJTgvS8v9Zfe7GDJ_Y_VBEHCAwBkAodG8JcHGkvTc5NoRXJv2wyADmssQHysN8KcHQk6Kc1KN6ZnMd8jENvDG9x9yvGt3hKItW"; // Replace with a valid token

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

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TopArtists.css";

const SPOTIFY_TOKEN = "YOUR_TOKEN_HERE"; // Make sure token has user-top-read scope

function TopArtists() {
  const [topArtists, setTopArtists] = useState([]);
  const [error, setError] = useState("");
  const [timeRange, setTimeRange] = useState("medium_term"); // medium_term = last 6 months

  useEffect(() => {
    fetchTopArtists();
  }, [timeRange]);

  const fetchTopArtists = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/me/top/artists`, {
          params: {
            limit: 10,
            time_range: timeRange
          },
          headers: { 
            Authorization: `Bearer ${SPOTIFY_TOKEN}` 
          },
        }
      );
      setTopArtists(response.data.items);
      setError("");
    } catch (err) {
      setError("Error fetching top artists. Please check your API token and permissions.");
      console.error(err);
    }
  };

  return (
    <div className="top-artists-container">
      <div className="time-range-select">
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="short_term">Last 4 Weeks</option>
          <option value="medium_term">Last 6 Months</option>
          <option value="long_term">All Time</option>
        </select>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="artists-grid">
        {topArtists.map((artist, index) => (
          <div key={artist.id} className="artist-card">
            <div className="artist-rank">{index + 1}</div>
            <div className="artist-image">
              <img 
                src={artist.images[0]?.url} 
                alt={artist.name}
              />
            </div>
            <div className="artist-info">
              <h3 className="artist-name">{artist.name}</h3>
              <p className="artist-details">
                Popularity: {artist.popularity}%
              </p>
              <p className="artist-details">
                Genres: {artist.genres.slice(0, 2).join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopArtists;
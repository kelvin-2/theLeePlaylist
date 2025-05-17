import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/TopArtists.css";


const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;


console.log("Client ID:", import.meta.env.VITE_SPOTIFY_CLIENT_ID);


// Function to get the access token from the authorization code
const getAccessToken = async (code) => {
  const authString = `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`;
  const authBase64 = btoa(authString);

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Authorization": `Basic ${authBase64}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);

    setIsAuthenticated(true); // <-- Move here, after token is stored
  } catch (error) {
    console.error("Error exchanging authorization code:", error);
  }
};


function TopArtists() {
  const [topArtists, setTopArtists] = useState([]);
  const [error, setError] = useState("");
  const [timeRange, setTimeRange] = useState("medium_term"); // medium_term = last 6 months
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Extract the authorization code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // If code is available, exchange it for an access token
      getAccessToken(code);
      setIsAuthenticated(true); // Update the auth state to true
    } else {
      // Check if the access token already exists in localStorage
      const token = localStorage.getItem("access_token");
      if (token) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTopArtists();
    }
  }, [isAuthenticated, timeRange]);

  const fetchTopArtists = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Access token is missing. Please authenticate again.");
      return;
    }

    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/top/artists", {
          params: {
            limit:20 ,//the number of artists being returned
            time_range: timeRange,
          },
          headers: {
            Authorization: `Bearer ${token}`,
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
      <h1 className="heading">
        <span className="highlight">Top 10 Artists</span> Who Shaped My Musical Journey
      </h1>
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
      
      <div className="Artist-container">
        {topArtists.map((artist, index) => (
          <div key={artist.id} className="artist-card">
            <p className="artist-position">{index + 1}</p>
            <div className="artist-image">
              <img 
                src={artist.images[0]?.url} 
                alt={artist.name}
              />
            </div>
            <div className="artist-info">
              <p className="artist-name">{artist.name}</p>
              <p className="artist-genres">{artist.genres.slice(0, 2).join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopArtists;

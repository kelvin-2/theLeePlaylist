import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/TopArtists.css";

const SPOTIFY_CLIENT_ID = "85c0258ab9a34e9fb597c3fdf2d71af9"; // Replace with your actual Client ID
const SPOTIFY_CLIENT_SECRET = "d07d430c6c1a452196ce8c028bb7c3dc"; // Replace with your actual Client Secret
const REDIRECT_URI = "http://127.0.0.1:5173/"; // Your redirect URI

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
    console.log("Access Token:", access_token);
    console.log("Refresh Token:", refresh_token);
    console.log("Expires In:", expires_in);

    // Store the tokens in localStorage or state
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
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
            limit: 10,
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

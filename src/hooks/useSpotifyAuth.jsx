import { useState, useEffect } from "react";
import axios from "axios";
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  REDIRECT_URI,
} from "./spotify";

export const useSpotifyAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    const token = localStorage.getItem("access_token");

    if (token) {
      setAccessToken(token);
      setIsAuthenticated(true);
    } else if (code) {
      getAccessToken(code);
    }
  }, []);

  const login = () => {
    const scopes = encodeURIComponent("user-top-read");
    window.location.href =
      `https://accounts.spotify.com/authorize` +
      `?client_id=${SPOTIFY_CLIENT_ID}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&scope=${scopes}`;
  };

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
            Authorization: `Basic ${authBase64}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);
      setAccessToken(access_token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to get access token:", error);
    }
  };

  return { isAuthenticated, accessToken, login };
};

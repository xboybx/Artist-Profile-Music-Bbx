import React, { createContext, useContext, useState, useEffect } from "react";
import { apiService } from "../api";
import { toast } from "react-hot-toast";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [settings, setSettings] = useState({
    siteName: "X BOY",
    description: "Lo-fi Producer & Beatboxer",
    theme: "dark",
  });

  useEffect(() => {
    fetchTracks();
    fetchVideos();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await apiService.getTracks();
      setTracks(response.data);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      toast.error("Failed to fetch tracks");
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await apiService.getVideos();
      setYoutubeVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast.error("Failed to fetch videos");
    }
  };

  const addTrack = async (track) => {
    try {
      const response = await apiService.createTrack(track);
      setTracks((prevTracks) => [...prevTracks, response.data]);
      toast.success("Track added successfully");
    } catch (error) {
      console.error("Error adding track:", error);
      toast.error("Failed to add track");
      throw error;
    }
  };

  const updateTrack = async (id, updatedTrack) => {
    try {
      const response = await apiService.updateTrack(id, updatedTrack);
      setTracks((prevTracks) =>
        prevTracks.map((track) =>
          track._id === id ? response.data : track
        )
      );
      toast.success("Track updated successfully");
    } catch (error) {
      console.error("Error updating track:", error);
      toast.error("Failed to update track");
      throw error;
    }
  };

  const deleteTrack = async (id) => {
    try {
      await apiService.deleteTrack(id);
      setTracks((prevTracks) => prevTracks.filter((track) => track._id !== id));
      toast.success("Track deleted successfully");
    } catch (error) {
      console.error("Error deleting track:", error);
      toast.error("Failed to delete track");
      throw error;
    }
  };

  const extractVideoId = (url) => {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const addYoutubeVideo = async (videoUrl) => {
    try {
      const videoId = extractVideoId(videoUrl);
      if (!videoId) throw new Error("Invalid YouTube URL");

      const videoData = {
        url: videoUrl,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        videoId
      };

      const response = await apiService.createVideo(videoData);
      setYoutubeVideos((prevVideos) => [...prevVideos, response.data]);
      toast.success("Video added successfully");
    } catch (error) {
      console.error("Error adding YouTube video:", error);
      toast.error("Failed to add video");
      throw error;
    }
  };

  const deleteYoutubeVideo = async (id) => {
    try {
      await apiService.deleteVideo(id);
      setYoutubeVideos((prevVideos) =>
        prevVideos.filter((video) => video._id !== id)
      );
      toast.success("Video deleted successfully");
    } catch (error) {
      console.error("Error deleting YouTube video:", error);
      toast.error("Failed to delete video");
      throw error;
    }
  };

  const updateSettings = (newSettings) => {
    try {
      setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
    } catch (error) {
      console.error("Error updating settings:", error);
      throw error;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        tracks,
        settings,
        youtubeVideos,
        addTrack,
        updateTrack,
        deleteTrack,
        updateSettings,
        addYoutubeVideo,
        deleteYoutubeVideo,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 5000 // Add timeout
});

// Error handling interceptor
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error: Please check if the backend server is running');
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Tracks
  getTracks: () => api.get('/tracks'),
  createTrack: (track) => api.post('/tracks', track),
  updateTrack: (id, track) => api.put(`/tracks/${id}`, track),
  deleteTrack: (id) => api.delete(`/tracks/${id}`),

  // YouTube Videos
  getVideos: () => api.get('/videos'),
  createVideo: (video) => api.post('/videos', video),
  deleteVideo: (id) => api.delete(`/videos/${id}`)
};

export { api };
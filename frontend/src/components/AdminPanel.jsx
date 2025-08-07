import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { toast } from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Trash2, Edit3, LogOut, Plus, Music } from "lucide-react";

function AdminPanel() {
  const {
    tracks,
    addTrack,
    updateTrack,
    deleteTrack,
    settings,
    updateSettings,
    youtubeVideos,
    addYoutubeVideo,
    deleteYoutubeVideo,
  } = useAdmin();
  const [newTrack, setNewTrack] = useState({
    name: "",
    spotifyEmbed: "",
    spotifyUrl: "",
    appleMusicUrl: "",
    youtubeMusicUrl: "",
    songUrl: "",
    imageUrl: "",
  });
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [editingTrack, setEditingTrack] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTrack.name) {
      toast.error("Track name is required!");
      return;
    }

    if (!(newTrack.spotifyEmbed || newTrack.songUrl)) {
      toast.error("At least one music source is required!");
      return;
    }

    if (editingTrack) {
      updateTrack(editingTrack._id, newTrack);
      toast.success("Track updated successfully!");
    } else {
      addTrack(newTrack);
      toast.success("Track added successfully!");
    }
    setNewTrack({
      name: "",
      spotifyEmbed: "",
      spotifyUrl: "",
      appleMusicUrl: "",
      youtubeMusicUrl: "",
      songUrl: "",
      imageUrl: "",
    });
    setEditingTrack(null);
  };

  const handleYoutubeSubmit = (e) => {
    e.preventDefault();
    try {
      addYoutubeVideo(youtubeUrl);
      setYoutubeUrl("");
      toast.success("YouTube video added successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (track) => {
    setEditingTrack(track);
    setNewTrack(track);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    deleteTrack(id);
    toast.success("Track deleted successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
    toast.success("Logged out successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black p-8 dark">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Music className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-white">Admin Panel</h2>
          </div>
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Card className="mb-8 bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Plus className="h-5 w-5" />
              {editingTrack ? "Edit Track" : "Add New Track"}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {editingTrack ? "Update track information" : "Add a new track to your portfolio"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="trackName" className="text-gray-300">Track Name*</Label>
                <Input
                  id="trackName"
                  type="text"
                  value={newTrack.name}
                  onChange={(e) =>
                    setNewTrack({ ...newTrack, name: e.target.value })
                  }
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="spotifyEmbed" className="text-gray-300">
                  Spotify Embed Code (Optional)
                </Label>
                <Textarea
                  id="spotifyEmbed"
                  value={newTrack.spotifyEmbed}
                  onChange={(e) =>
                    setNewTrack({ ...newTrack, spotifyEmbed: e.target.value })
                  }
                  className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                  rows="4"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spotifyUrl" className="text-gray-300">
                    Spotify URL (Optional)
                  </Label>
                  <Input
                    id="spotifyUrl"
                    type="url"
                    value={newTrack.spotifyUrl}
                    onChange={(e) =>
                      setNewTrack({ ...newTrack, spotifyUrl: e.target.value })
                    }
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="https://open.spotify.com/track/..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="appleMusicUrl" className="text-gray-300">
                    Apple Music URL (Optional)
                  </Label>
                  <Input
                    id="appleMusicUrl"
                    type="url"
                    value={newTrack.appleMusicUrl}
                    onChange={(e) =>
                      setNewTrack({ ...newTrack, appleMusicUrl: e.target.value })
                    }
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="https://music.apple.com/..."
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="youtubeMusicUrl" className="text-gray-300">
                    YouTube Music URL (Optional)
                  </Label>
                  <Input
                    id="youtubeMusicUrl"
                    type="url"
                    value={newTrack.youtubeMusicUrl}
                    onChange={(e) =>
                      setNewTrack({ ...newTrack, youtubeMusicUrl: e.target.value })
                    }
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="https://music.youtube.com/..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="songUrl" className="text-gray-300">
                    Song URL (Optional)
                  </Label>
                  <Input
                    id="songUrl"
                    type="url"
                    value={newTrack.songUrl}
                    onChange={(e) =>
                      setNewTrack({ ...newTrack, songUrl: e.target.value })
                    }
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-gray-300">
                  Image URL (Optional)
                </Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={newTrack.imageUrl}
                  onChange={(e) =>
                    setNewTrack({ ...newTrack, imageUrl: e.target.value })
                  }
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-[#FA2D48] hover:bg-[#FF5C77] text-white"
              >
                {editingTrack ? "Update Track" : "Add Track"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add YouTube Video
            </CardTitle>
            <CardDescription className="text-gray-400">
              Add YouTube videos to showcase your beatbox skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleYoutubeSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="youtubeUrl" className="text-gray-300">YouTube URL</Label>
                <Input
                  id="youtubeUrl"
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#FA2D48] hover:bg-[#FF5C77] text-white"
              >
                Add Video
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">YouTube Videos</CardTitle>
            <CardDescription className="text-gray-400">
              Manage your YouTube video showcase
            </CardDescription>
          </CardHeader>
          <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {youtubeVideos.map((video) => (
              <div
                key={video._id}
                className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-600"
              >
                <img
                  src={video.thumbnailUrl}
                  alt="Video thumbnail"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteYoutubeVideo(video._id)}
                    className="w-full gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Tracks</CardTitle>
            <CardDescription className="text-gray-400">
              Manage your music tracks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
          {tracks.map((track) => (
            <Card key={track._id} className="bg-gray-800/50 border-gray-600">
              <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-white">
                  {track.name}
                </h4>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(track)}
                    className="gap-2 border-gray-600 text-white hover:bg-gray-700"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(track._id)}
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {track.spotifyEmbed && (
                  <div
                    dangerouslySetInnerHTML={{ __html: track.spotifyEmbed }}
                  />
                )}
                {track.songUrl && (
                  <div className="bg-gray-800 p-4 rounded-lg">
                    {track.imageUrl && (
                      <img
                        src={track.imageUrl}
                        alt={track.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <a
                      href={track.songUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Listen to {track.name}
                    </a>
                  </div>
                )}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h5 className="text-white font-semibold mb-2">Platform Links:</h5>
                  <div className="space-y-1 text-sm">
                    {track.spotifyUrl && (
                      <p className="text-green-400">Spotify: {track.spotifyUrl}</p>
                    )}
                    {track.appleMusicUrl && (
                      <p className="text-gray-300">Apple Music: {track.appleMusicUrl}</p>
                    )}
                    {track.youtubeMusicUrl && (
                      <p className="text-red-400">YouTube Music: {track.youtubeMusicUrl}</p>
                    )}
                  </div>
                </div>
              </div>
              </CardContent>
            </Card>
          ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminPanel;

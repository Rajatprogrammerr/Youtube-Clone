import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PlaylistPage = () => {
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        const id = "PLMC9KNkIncKseYxDN2niH6glGRWKsLtde";
        const res = await axios.get(`/api/youtube/playlist/${id}`);
        setPlaylist(res.data.content || []);
      } catch (error) {
        console.log("Could not fetch playlist", error);
        setPlaylist([]);
      } finally {
        setLoading(false);
      }
    };
    getPlaylist();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-8 bg-gray-800 rounded w-3/4 sm:w-1/2 lg:w-1/3 mx-auto mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-3 animate-pulse">
              <div className="w-full aspect-video bg-gray-800 rounded-xl"></div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 bg-gray-800 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-800 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!loading && playlist.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-400 text-lg">No videos available in this playlist</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:py-6 py-20 ">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 text-white bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Today's Hits 2025 - Playlist Top Hits 2025
        </h1>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
          {playlist
            .filter((item) => item.thumbnail && item.thumbnail.length > 0)
            .map((item) => (
              <div 
                key={item.videoId} 
                className="group flex flex-col bg-gray-900 rounded-xl overflow-hidden hover:bg-gray-800 transition-all duration-300"
              >
                <Link 
                  to={`/watch/${item.videoId}`}
                  className="relative aspect-video overflow-hidden"
                >
                  <img
                    src={item.thumbnail[3]?.url || item.thumbnail[0]?.url}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <div className="p-3 flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-gray-700 overflow-hidden">
                      {/* Channel avatar could go here */}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-white font-medium line-clamp-2 text-sm sm:text-base mb-1">
                      {item.title}
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-sm truncate">
                      {item.channelTitle}
                    </p>
                    <div className="flex items-center gap-1 text-gray-400 text-xs sm:text-sm mt-1">
                      <span>
                        {item.viewCount >= 1000000
                          ? `${(item.viewCount / 1000000).toFixed(1)}M views`
                          : item.viewCount >= 1000
                          ? `${(item.viewCount / 1000).toFixed(1)}K views`
                          : `${item.viewCount} views`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
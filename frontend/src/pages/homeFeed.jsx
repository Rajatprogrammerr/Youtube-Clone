import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomeFeed = () => {
  const [homeFeed, setHomeFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHomeFeed = async () => {
      try {
        const res = await axios.get(`/api/youtube`);
        setHomeFeed(Array.isArray(res.data.content) ? res.data.content : []);
      } catch (error) {
        console.error("Error fetching home feed", error);
        setHomeFeed([]);
      } finally {
        setLoading(false);
      }
    };

    getHomeFeed();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

  if (!loading && homeFeed.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-400 text-lg">No videos available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:pt-4 sm:pb-6 pt-20 pb-20">
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
        {homeFeed.map((item) => {
          if (item.type === "video") {
            return (
              <div
                key={item.id}
                className="group flex flex-col bg-gray-900 rounded-xl overflow-hidden hover:bg-gray-800 transition-all duration-300"
              >
                <Link
                  to={`/watch/${item.videoId}`}
                  className="relative aspect-video overflow-hidden"
                >
                  <img
                    src={item.thumbnail[0]?.url}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </Link>
                <div className="p-3 flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-gray-700 overflow-hidden">
                      {}
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
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default HomeFeed;
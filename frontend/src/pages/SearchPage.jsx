import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Subscriptions = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const res = await axios.get(`/api/youtube/search/${query}`);
        setSearchResults(res.data.content);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getSearchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-4 animate-pulse">
              <div className="w-full sm:w-64 lg:w-80 aspect-video bg-gray-800 rounded-lg"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                <div className="h-4 bg-gray-800 rounded w-1/4"></div>
                <div className="h-4 bg-gray-800 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:py-8 md:py-6 py-20">
      <div className="flex flex-col gap-6">
        {searchResults
          .filter((item) => item.thumbnail && item.thumbnail.length > 0)
          .map((item) => (
            <Link 
              to={`/watch/${item.videoId}`} 
              key={item.id}
              className="group"
            >
              <div className="flex flex-col sm:flex-row gap-4 bg-gray-900/50 hover:bg-gray-800/50 transition-colors rounded-xl overflow-hidden">
                {/* Thumbnail */}
                <div className="relative w-full sm:w-64 lg:w-80 aspect-video">
                  <img 
                    src={item.thumbnail[0].url} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-4 sm:p-4">
                  {/* Title */}
                  <h2 className="text-lg sm:text-xl font-semibold line-clamp-2 group-hover:text-gray-300 transition-colors">
                    {item.title}
                  </h2>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-gray-400 text-sm">
                    <span>
                      {item.viewCount > 1000000 
                        ? `${(item.viewCount / 1000000).toFixed(1)}M views`
                        : `${(item.viewCount / 1000).toFixed(1)}K views`
                      }
                    </span>
                    <span>•</span>
                    <span>{item.publishedTimeText}</span>
                  </div>

                  {/* Channel Info */}
                  <div className="mt-3">
                    <p className="text-sm sm:text-base text-gray-300">
                      {item.channelTitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mt-2 text-sm text-gray-400 line-clamp-2 sm:line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Subscriptions;
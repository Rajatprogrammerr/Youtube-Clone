import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";

const WatchPage = () => {
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState({});
  const [similarVideos, setSimilarVideos] = useState([]);
  const [channel, setChannel] = useState({});
  const [formattedDate, setFormattedDate] = useState("");
  const [more, setMore] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    if (videoDetails.publishedAt) {
      const newDate = new Date(videoDetails.publishedAt);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const day = newDate.getDate();
      const month = monthNames[newDate.getMonth()];
      const year = newDate.getFullYear();
      setFormattedDate(`${day} ${month} ${year}`);
    }
  }, [videoDetails.publishedAt]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [videoRes, channelRes, commentsRes, similarRes] = await Promise.all([
          axios.get(`/api/youtube/watch/${id}`),
          videoDetails.channelId ? axios.get(`/api/youtube/channel/${videoDetails.channelId}`) : null,
          axios.get(`/api/youtube/comments/${id}`),
          axios.get(`/api/youtube/similar/${id}`)
        ]);

        setVideoDetails(videoRes.data.content);
        if (channelRes) setChannel(channelRes.data.content);
        setComments(commentsRes.data.content);
        setSimilarVideos(similarRes.data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, videoDetails.channelId]);

  if (loading) {
    return (
      <div className="animate-pulse p-4 md:p-6 lg:p-8">
        <div className="aspect-video w-full bg-gray-800 rounded-lg mb-4"></div>
        <div className="h-8 bg-gray-800 rounded w-3/4 mb-4"></div>
        <div className="flex gap-4 mb-4">
          <div className="w-12 h-12 bg-gray-800 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-800 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-800 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  const displayedComments = showAllComments ? comments : comments.slice(0, 1);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 lg:p-8 sm:py-10 py-20">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Video Player */}
        <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-gray-900">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            controls
            playing
            width="100%"
            height="100%"
            className="absolute top-0 left-0"
          />
        </div>

        {/* Video Info */}
        <div className="mt-4">
          <h1 className="text-xl md:text-2xl font-bold line-clamp-2">{videoDetails.title}</h1>

          {/* Channel Info & Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
            <div className="flex items-center gap-4">
              <img
                src={channel?.avatar?.[0]?.url || "/default-avatar.png"}
                alt={videoDetails.channelTitle}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{videoDetails.channelTitle}</h3>
                <p className="text-sm text-gray-400">{channel?.subscriberCountText}</p>
              </div>
            </div>
            <button className="bg-white text-black font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
              Subscribe
            </button>
          </div>

          {/* Video Stats & Description */}
          <div className="mt-4 bg-gray-800/50 rounded-xl p-4">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-300 mb-2">
              <span>{videoDetails.viewCount?.toLocaleString()} views</span>
              <span>{formattedDate}</span>
            </div>
            <div className="relative">
              <p className={`text-sm whitespace-pre-wrap ${!more && 'line-clamp-2'}`}>
                {videoDetails.description}
              </p>
              <button
                onClick={() => setMore(!more)}
                className="flex items-center gap-1 text-sm font-semibold mt-2 hover:text-gray-300"
              >
                {more ? (
                  <>Show less <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>Show more <ChevronDown className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                {comments.length} Comments
              </h3>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {displayedComments.map((comment) => (
                <div key={comment.commentId} className="flex gap-4">
                  <img
                    src={comment.authorThumbnail?.[0]?.url}
                    alt={comment.authorText}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm md:text-base">{comment.authorText}</span>
                      <span className="text-xs md:text-sm text-gray-400">{comment.publishedTimeText}</span>
                    </div>
                    <p className="mt-1 text-sm md:text-base whitespace-pre-wrap">{comment.textDisplay}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button className="flex items-center gap-1 text-xs md:text-sm hover:text-gray-300">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{comment.likesCount}</span>
                      </button>
                      <button className="flex items-center gap-1 text-xs md:text-sm hover:text-gray-300">
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Comments Button */}
            {comments.length > 3 && (
              <button
                onClick={() => setShowAllComments(!showAllComments)}
                className="w-full mt-4 py-3 px-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors flex items-center justify-center gap-2 text-sm md:text-base font-medium"
              >
                {showAllComments ? (
                  <>
                    Show Less <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Show More Comments <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:w-[400px] flex-shrink-0">
        <h2 className="text-lg font-semibold mb-4">Related videos</h2>
        <div className="grid gap-4">
          {similarVideos.map((video) => {
            if (video.type === "video") {
              return (
                <Link
                  key={video.videoId}
                  to={`/watch/${video.videoId}`}
                  className="flex gap-2 group"
                >
                  <div className="relative flex-shrink-0 w-40 sm:w-48">
                    <img
                      src={video.thumbnail[0]?.url}
                      alt={video.title}
                      className="w-full aspect-video object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-gray-300">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{video.channelTitle}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                      <span>
                        {video.viewCount >= 1000000
                          ? `${(video.viewCount / 1000000).toFixed(1)}M views`
                          : video.viewCount >= 1000
                            ? `${(video.viewCount / 1000).toFixed(1)}K views`
                            : `${video.viewCount} views`}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
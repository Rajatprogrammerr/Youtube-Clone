import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomeFeed = () => {
    const [homeFeed, setHomeFeed] = useState([]);

    useEffect(() => {
        const getHomeFeed = async () => {
            try {
                const res = await axios.get(`/api/youtube`);

                // Ensure that homeFeed is an array, or set an empty array if not
                setHomeFeed(Array.isArray(res.data.content) ? res.data.content : []);
            } catch (error) {
                console.error("Error fetching home feed", error);

                setHomeFeed([]); // Set empty array on error to avoid issues with .map()
            }
        };
        getHomeFeed();
    }, []); // Empty dependency array to run once on mount

    if (homeFeed.length === 0) {
        return <p>No data</p>;
    }

    return (
        <div className="h-full w-full p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {homeFeed.map((item) => {
                    if (item.type === "shorts_listings") {
                        return (
                            <div key={item.id} className="shorts-listing">
                                <h3 className="text-lg font-semibold mb-4">{item.title}</h3>
                                <div className="grid grid-cols-2 gap-4">

                                    {item.data.map((shorts) => (
                                        <div key={shorts.videoId} className="short-item">
                                            <Link to={`/shorts/${shorts.videoId}`}>
                                                <img
                                                    src={shorts.thumbnail[0]?.url}
                                                    alt="Shorts Thumbnail"
                                                    className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer"
                                                />
                                            </Link>
                                            <div className="mt-2">
                                                <h4 className="text-sm font-semibold line-clamp-2">
                                                    {shorts.title}
                                                </h4>
                                                <p className="text-gray-500 text-xs">{shorts.viewCountText}</p>
                                            </div>
                                        </div>
                                    ))
                                    }  </div>
                            </div>

                        )
                    }
                })}


                


            </div >
        </div >
    );
}

export default HomeFeed;

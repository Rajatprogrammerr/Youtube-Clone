import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomeFeed = () => {
    const [shortsFeed, setShortsFeed] = useState([]);

    useEffect(() => {
        const getShortsFeed = async () => {
            try {
                const res = await axios.get(`/api/youtube/shorts`);

                // Ensure that homeFeed is an array, or set an empty array if not
                setShortsFeed(res.data.content)
            } catch (error) {
                console.error("Error fetching home feed", error);

                setShortsFeed([]); // Set empty array on error to avoid issues with .map()
            }
        };
        getShortsFeed();
    }, []); // Empty dependency array to run once on mount

    useEffect(() => {
        console.log(shortsFeed)
    })
    // if (shortsFeed.length === 0) {
    //     return <p>No data</p>;
    // }

    return (
        // <div className="flex justify-end items-end">
        //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        //         {shortsFeed.map((item) => {
        //             if (item.type === "shorts_listing") {
        //                 return (
        //                     <div className="w-full" key={item.id}>
        //                         {item.data
        //                             .filter((shorts) => shorts.thumbnail && shorts.thumbnail.length > 0)
        //                             .map((shorts) => (
        //                                 <div className="grid grid-cols-2" key={shorts.id}>
        //                                     <div className="flex flex-col ">
        //                                         {/* Shorts Thumbnail */}
        //                                         <Link to={`/watch/${shorts.videoId}`}>

        //                                             <div className="">
        //                                                 <img
        //                                                     src={shorts.thumbnail[0]?.url}
        //                                                     alt={shorts.title || "Shorts Thumbnail"}
        //                                                     className="ratio-16x9 object-cover rounded-lg shadow-lg"
        //                                                 />
        //                                             </div>
        //                                         </Link>

        //                                         {/* Shorts Title */}
        //                                         <p className="text-lg font-bold truncate mt-2">{shorts.title}</p>

        //                                         {/* Channel Info */}
        //                                         <div className="flex items-center gap-4 mb-6">
        //                                             <div className="flex flex-col">
        //                                                 <p className="text-md text-gray-400">{shorts.viewCountText}</p>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             ))}
        //                     </div>
        //                 );
        //             } else {
        //                 return null; // Explicitly return null for non-shorts_listing types
        //             }
        //         })}
        //     </div>
        // </div>
        <>
            <div className="w-[80vw] h-screen flex flex-wrap gap-20 justify-start ml-5">
                {shortsFeed.map((item) => {
                    if (item.type === "shorts_listing") {
                        return (
                            <div key={item.id}>
                                {item.data
                                    .filter((shorts) => shorts.thumbnail && shorts.thumbnail.length > 0)
                                    .map((shorts) => (
                                        <div key={shorts.videoId}>
                                            <div className="w-[20vw] h-[80vh]" >
                                                <div className="flex flex-col gap-4">
                                                    <img src={shorts.thumbnail[0]?.url} alt="shorts" className="ratio-16x9 object-cover rounded-lg border border-blue-800" />
                                                    <div>
                                                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident eos laboriosam placeat.</p>
                                                        <p>122 M</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>


                        )
                    }
                })}



            </div>
        </>

    );
}

export default HomeFeed;

import { fetchFromRapidApi } from "../services/rapidAPI.js";

export const getChannelDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromRapidApi(`https://yt-api.p.rapidapi.com/channel/about?id=${id}`);
    // console.log("Fetched data from RapidAPI:", data); // Log the entire response
    res.status(200).json({ success: true, content: data});
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};




import { fetchFromRapidApi } from "../services/rapidAPI.js";

export async function fetchHome(req, res) {
    try {
        const data = await fetchFromRapidApi('https://yt-api.p.rapidapi.com/home')
        res.status(200).json({ success: true, content: data.data })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

export async function fetchVideo(req, res) {
    const { id } = req.params;


    try {
        // Construct URL properly with id as a query parameter
        const data = await fetchFromRapidApi(`https://yt-api.p.rapidapi.com/video/info?id=${id}`);

        res.status(200).json({ success: true, content: data });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}
export async function fetchSimilar(req, res) {
    const { id } = req.params;


    try {
        // Construct URL properly with id as a query parameter
        const data = await fetchFromRapidApi(`https://yt-api.p.rapidapi.com/related?id=${id}`);

        res.status(200).json({ success: true, content: data.data });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export async function fetchShorts(req, res) {
    const { id } = req.params;


    try {

        const data = await fetchFromRapidApi(`https://yt-api.p.rapidapi.com/home`);

        res.status(200).json({ success: true, content: data.data });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}


export const searchResults = async (req, res) => {
    const { query } = req.params;
    try {
        const data = await fetchFromRapidApi(`https://yt-api.p.rapidapi.com/search?query=${query}`);
        res.status(200).json({ success: true, content: data.data });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const fetchTrending = async (req, res) => {
    try {
        const data = await fetchFromRapidApi(`https://yt-api.p.rapidapi.com/trending?geo=IN`);

        return res.status(200).json({ success: true, content: data.data });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export async function getComments(req, res) {
    const { id } = req.params;


    try {
        // Construct URL properly with id as a query parameter
        const data = await fetchFromRapidApi(`https://yt-api.p.rapidapi.com/comments?id=${id}`);

        res.status(200).json({ success: true, content: data.data });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const fetchPlaylist = async (req, res) => {
    try {
        const id = "PLMC9KNkIncKseYxDN2niH6glGRWKsLtde"; // Assign the playlist ID directly
        const data = await fetchFromRapidApi(`https://yt-api.p.rapidapi.com/playlist?id=${id}`);
        res.status(200).json({ success: true, content: data.data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

import axios from 'axios';

export const fetchFromRapidApi = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '3890bd6617msheaa4764aa606f35p1fac56jsn265a4944021e',
            'x-rapidapi-host': 'yt-api.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.get(url, options);
        // console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error);
    }

}

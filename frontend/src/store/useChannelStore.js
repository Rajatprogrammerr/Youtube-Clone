import { create } from "zustand";
import axios from "axios";

export const useChannelStore = create((set) => ({
    channel: [],
    setChannel: (channel) => set({ channel }),

    channelDetails: async (id) => {
       
        try {
            const res = await axios.get(`/api/youtube/channel/${id}`);
            set({ channel: res.data.content });
            
        } catch (error) {
            console.log("cannot fetch channel details", error);
            set({ channel: [] });
        }
    }
}))
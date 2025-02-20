import express from "express";
import { fetchHome, fetchVideo, fetchSimilar, fetchShorts ,searchResults,fetchTrending,getComments, fetchPlaylist } from "../controller/contentController.js";

const Router = express.Router()

Router.get("/", fetchHome)
Router.get("/watch/:id", fetchVideo)
Router.get("/similar/:id", fetchSimilar)
Router.get("/shorts", fetchShorts)
Router.get("/search/:query", searchResults)
Router.get("/trending", fetchTrending)
Router.get("/comments/:id", getComments)
Router.get("/playlist/:id", fetchPlaylist)

export default Router
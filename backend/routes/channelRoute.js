import express from 'express'
import { getChannelDetails } from '../controller/channelController.js'

const router = express.Router()

router.get("/:id", getChannelDetails)


export default router
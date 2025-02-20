import express from 'express'
import contentRoute from '../backend/routes/contentRoute.js'
import channelRoute from '../backend/routes/channelRoute.js'
import path from 'path'



const app = express()
const port = process.env.PORT || 5000
const __dirname = path.resolve()
app.use(express.json())



app.use('/api/youtube', contentRoute)
app.use('/api/youtube/channel', channelRoute)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '/frontend/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
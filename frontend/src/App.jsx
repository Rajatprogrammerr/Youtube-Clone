
import { Routes, Route } from 'react-router-dom'
import HomeFeed from './pages/homeFeed'
import WatchPage from './pages/WatchPage'
import Navbar from './components/Navbar'
import ShortsPage from './pages/ShortsPage'
import SearchPage from './pages/SearchPage'
import TrendingPage from './pages/TrendingPage'
import PlaylistPage from './pages/PlaylistPage'

function App() {


  return (
    <>
      <div className='navbar '>
        <Navbar />
      </div>
      <div className='container '>
        <Routes>
          <Route path='/' element={<HomeFeed />} />
          <Route path='/watch/:id' element={<WatchPage />} />
          {/* <Route path='/shorts' element={<ShortsPage />} /> */}
          <Route path='/search/:query' element={<SearchPage />} />
          <Route path='/trending' element={<TrendingPage />} />
          <Route path='/playlist/:id' element={<PlaylistPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App

import { Menu, Search, Bell, Video, Mouse as House, Flame, ListEnd ,X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const activeTab = (tab) => {
    setActive(tab);
    setIsSidebarOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search/${search}`);
      setSearch("");
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-black z-50 border-b border-gray-800">
        <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl">
          {/* Left Section */}
          <div className="flex items-center gap-4">
          <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-800 rounded-full"
            >
              <Menu className="size-6" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <Video className="size-6 text-red-600" />
              <span className="font-bold text-xl hidden sm:block">YouTube</span>
            </Link>
          </div>

          {/* Search Section */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 max-w-xl mx-4 hidden sm:block"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-full focus:outline-none focus:border-blue-500 pr-12"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-800 rounded-full"
              >
                <Search className="size-5" />
              </button>
            </div>
          </form>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 hover:bg-gray-800 rounded-full sm:hidden">
              <Search className="size-6" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <Video className="size-6" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <Bell className="size-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="fixed top-16 left-0 right-0 p-3 bg-black border-b border-gray-800 sm:hidden z-40">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-full focus:outline-none focus:border-blue-500 pr-12"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-800 rounded-full"
          >
            <Search className="size-5" />
          </button>
        </form>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-black transform transition-transform duration-300 ease-in-out z-50 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full pt-20">
          {/* Close button */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-full"
          >
            <X className="size-6" />
          </button>

          {/* Home Section */}
          <div className="px-3">
            <Link
              to="/"
              onClick={() => activeTab("home")}
              className={`flex items-center gap-4 px-3 py-2 rounded-lg transition-colors
                ${active === "home" ? "bg-gray-800" : "hover:bg-gray-800/50"}`}
            >
              <House className="size-5" />
              <span>Home</span>
            </Link>
          </div>

          <div className="my-4 border-t border-gray-800" />

          {/* Explore Section */}
          <div className="px-3">
            <h3 className="px-3 mb-2 text-lg font-semibold text-gray-400">Explore</h3>
            <Link
              to="/trending"
              onClick={() => activeTab("trending")}
              className={`flex items-center gap-4 px-3 py-2 rounded-lg transition-colors
                ${active === "trending" ? "bg-gray-800" : "hover:bg-gray-800/50"}`}
            >
              <Flame className="size-5" />
              <span>Trending</span>
            </Link>
            <Link
              to="/playlist/PLMC9KNkIncKseYxDN2niH6glGRWKsLtde"
              onClick={() => activeTab("playlist")}
              className={`flex items-center gap-4 px-3 py-2 rounded-lg transition-colors
                ${active === "playlist" ? "bg-gray-800" : "hover:bg-gray-800/50"}`}
            >
              <ListEnd className="size-5" />
              <span>Playlist</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay - Only visible when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Content Padding for Fixed Navbar */}
      <div className="h-16"></div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 md:hidden z-50">
        <div className="flex items-center justify-around py-3">
          <Link
            to="/"
            onClick={() => activeTab("home")}
            className={`p-2 rounded-lg ${active === "home" ? "bg-gray-800" : ""}`}
          >
            <House className="size-6" />
          </Link>
          <Link
            to="/trending"
            onClick={() => activeTab("trending")}
            className={`p-2 rounded-lg ${active === "trending" ? "bg-gray-800" : ""}`}
          >
            <Flame className="size-6" />
          </Link>
          <Link
            to="/playlist/PLMC9KNkIncKseYxDN2niH6glGRWKsLtde"
            onClick={() => activeTab("playlist")}
            className={`p-2 rounded-lg ${active === "playlist" ? "bg-gray-800" : ""}`}
          >
            <ListEnd className="size-6" />
          </Link>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {/* {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )} */}
    </>
  );
};

export default Navbar;
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';


import './App.css';

import Videos from "./videos";
import Video from "./videos/Detail";
import CreateVideo from "./videos/Create"

import Categories from "./categories";
import Category from "./categories/Detail";
import CreateCategory from "./categories/Create"

import Genres from "./genres";
import Genre from "./genres/Detail";
import CreateGenre from "./genres/Create"


import CastMembers from "./castmembers";
import CastMember from "./castmembers/Detail";
import CreateCastMember from "./castmembers/Create"


const Navbar = () => (
  <div>
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="videos">Videos</Link> |{" "}
      <Link to="categories">Categories</Link> |{" "}
      <Link to="genres">Genres</Link> |{" "}
      <Link to="castmembers">CastMembers</Link>
    </nav>
  </div>
)

const Layout = () => (
  <div>
    <h1>Welcome to the app!</h1>
    <Navbar />
    <div className="content">
      <Outlet />
    </div>
  </div>
);



const App = () => (
  <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="videos" element={<Videos />} />
          <Route path="videos/create" element={<CreateVideo />} />
          <Route path="videos/:videoId" element={<Video />} />

          <Route path="categories" element={<Categories />} />
          <Route path="categories/:categoryId" element={<Category />} />
          <Route path="categories/create" element={<CreateCategory />} />

          <Route path="genres" element={<Genres />} />
          <Route path="genres/create" element={<CreateGenre />} />
          <Route path="genres/:genreId" element={<Genre />} />

          <Route path="castmembers" element={<CastMembers />} />
          <Route path="castmembers/create" element={<CreateCastMember />} />
          <Route path="castmembers/:genreId" element={<CastMember />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
  </Router>
);

export default App;


import './App.css';
import './assets/css/style.css';
import './assets/css/modal.css';
import './assets/css/custom.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import ProtectedRoute from './components/admincomponents/ProtectedRoutes';
import Dashboard from './pages/admin/Dashboard';
import Settings from './pages/admin/Settings';
import AdminLogin from './components/admincomponents/AdminLogin';

import Home from './pages/Home';

// projects
import AddProjects from './pages/admin/AddProject';
import UpdateProjects from './pages/admin/UpdateProject';
import AdminProjects from './pages/admin/AdminProjects';
import ViewProjects from './pages/admin/ViewProject';

// menu
import ViewMenu from './pages/admin/ViewMenu';

// testimonials
import AddTestimonial from './pages/admin/AddTestimonial';
import UpdateTestimonial from './pages/admin/UpdateTestimonial';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import ViewTestimonial from './pages/admin/ViewTestimonial';


// blogs
import Addblog from './pages/admin/Addblog';
import UpdateBlog from './pages/admin/UpdateBlog';
import AdminBlogs from './pages/admin/AdminBlogs';
import ViewBlog from './pages/admin/ViewBlog';

import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Project from './pages/Project';
import SingleProject from './pages/SingleProject';
import About from './pages/About';
import Contact from './pages/Contact';
import Vendors from './pages/Vendors';
import Inspiration from './pages/Inspiration';
import Blog from './pages/Blog';
import SingleBlog from './pages/SingleBlog';
import SocialMedia from './pages/SocialMedia';
import InteriorDesigners from './pages/InteriorDesigners';
import RealEstate from './pages/RealEstate';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  useEffect(() => {
    const body = document.querySelector("body");
    if(isAdminRoute){
      body.classList.add("adminPanel");
    }else{
      body.classList.remove("adminPanel");
    }

    const token = localStorage.getItem('token');
    if (token) {
        setIsAuthenticated(true);
    }
    setIsLoading(false); // Stop loading after checking token
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  if (isLoading) {
    // Render nothing or a loading spinner until authentication is confirmed
    return <div>Loading...</div>;
  }

  return (
    <>
    <PrimeReactProvider>
      <Routes>
        {/* frontend routes */}
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/social-media' element={<SocialMedia/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/vendors' element={<Vendors/>}></Route>
        <Route path='/inspiration' element={<Inspiration />}></Route>
        <Route path='/projects' element={<Project />}></Route>
        <Route path='/single-project/:slug' element={<SingleProject />}></Route>
        <Route path='/blog' element={<Blog />}></Route>
        <Route path='/single-blog/:slug' element={<SingleBlog />}></Route>
        <Route path='/interior-designers' element={ <InteriorDesigners /> }></Route>
        <Route path='/real-estate' element={ <RealEstate /> }></Route>

          <Route
              path="/admin/dashboard"
              element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Dashboard onLogout={handleLogout} />
                  </ProtectedRoute>
              }
          />

          <Route 
              path="/admin/login" 
              element={
                  isAuthenticated ? (
                      <Navigate to="/admin/dashboard" />
                  ) : (
                      <AdminLogin onLogin={handleLogin} />
                  )
              } 
          />

        {/* Projects */}
          <Route
              path="/admin/projects"
              element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <AdminProjects onLogout={handleLogout} />
                  </ProtectedRoute>
              }
          />

          <Route
              path="/admin/add-project"
              element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <AddProjects onLogout={handleLogout} />
                  </ProtectedRoute>
              }
          />
          
          <Route
                path="/admin/project/:id"
              element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <ViewProjects onLogout={handleLogout} />
                  </ProtectedRoute>
              }
          />
          
          <Route
                path="/admin/update-project/:id"
              element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <UpdateProjects onLogout={handleLogout} />
                  </ProtectedRoute>
              }
          />

        {/* menus */}
          <Route
                path="/admin/menus/"
              element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <ViewMenu onLogout={handleLogout} />
                  </ProtectedRoute>
              }
          />


          {/* testimonials */}
          <Route
              path="/admin/testimonials"
              element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <AdminTestimonials onLogout={handleLogout} />
                  </ProtectedRoute>
              }
          />

          <Route
              path="/admin/add-testimonial"
              element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <AddTestimonial onLogout={handleLogout} />
                  </ProtectedRoute>
              }
          />
          
          <Route
                path="/admin/testimonial/:id"
              element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <ViewTestimonial onLogout={handleLogout} />
                  </ProtectedRoute>
              }
          />
          
          <Route
                path="/admin/update-testimonial/:id"
              element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <UpdateTestimonial onLogout={handleLogout} />
                  </ProtectedRoute>
              }
          />


          {/* blogs */}
          <Route
              path="/admin/blogs"
              element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <AdminBlogs onLogout={handleLogout} />
                  </ProtectedRoute>
              }
          />

          <Route
              path="/admin/add-blog"
              element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Addblog onLogout={handleLogout} />
                  </ProtectedRoute>
              }
          />
          
          <Route
                path="/admin/blog/:id"
              element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <ViewBlog onLogout={handleLogout} />
                  </ProtectedRoute>
              }
          />
          
          <Route
                path="/admin/update-blog/:id"
              element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <UpdateBlog onLogout={handleLogout} />
                  </ProtectedRoute>
              }
          />

            <Route
                path="/admin/settings"
              element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Settings onLogout={handleLogout} />
                  </ProtectedRoute>
              }
            />

        </Routes>
      </PrimeReactProvider>
    </>
  );
}

export default App;

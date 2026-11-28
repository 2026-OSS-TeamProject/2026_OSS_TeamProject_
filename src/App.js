import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CampusRanking from "./pages/CampusRanking";
import MenuPage from "./pages/MenuPage";
import About from "./pages/About";
import Rateus from "./pages/Rateus";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import Loader from "./components/Loader/Loader";
import { ThemeProvider } from "./themeContext";
import ContactUs from "./pages/ContactUs";
// import Contributors from "./pages/Contributors";

import { Contributors } from "./pages/Contributors";
import Navbar from "./components/Navbar";


import Newss from "./components/Blog/newss";


const Layout = ({ children }) => {
  return (
    <div className="bg-cover bg-center min-h-screen bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 bg-no-repeat dark:bg-none ">
      {children}
    </div>
  );
};

function App() {

  const [preloader , setPreloader] = useState(false)

  useEffect(() =>{

    const t = setTimeout(() => {
    setPreloader(true)
  }, 0);

  return () => clearTimeout(t)

  },[])


  return (
    <ThemeProvider>
    {!preloader  ? <Loader />  :  <div className="">

        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/campus/ranking" element={<CampusRanking />} />
          <Route path="/contributors" element={<Contributors/>}/>

          <Route
            path="/home"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          <Route
            path="/menu/:_id"
            element={
              <Layout>
                <MenuPage />
              </Layout>
            }
          />

          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />

          <Route
            path="/rateus"
            element={
              <Layout>
                <Rateus />
              </Layout>
            }
          />

          <Route
            path="/news"
            element={
              <Layout>
                <Newss />
              </Layout>
            }
          />

          <Route
            path="/loader"
            element={
              <Layout>
                <Loader />
              </Layout>
            }
          />
          <Route
            path="/contributors"
            element={
              <Layout>
                <Contributors />
              </Layout>
            }
          />


          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </div>}
    </ThemeProvider>
  );
}

export default App;

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Contact from "./components/Contact/Contact";
import Shop from "./components/Shop/Shop";
import Gallery from "./components/Gallery/Gallery";
import Admin from "./components/Admin/Admin";
import { ParallaxProvider } from 'react-scroll-parallax';
import { useState, useLayoutEffect, useEffect } from "react";
import Loader from "./components/Loader/Loader";
import './styles/index.css'
import Footer from "./components/Footer/Footer";

export default function App(){

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const [isEngContent, setEngContent] = useState<boolean>(false);

  setTimeout(() => {
    setIsFirstLoad(false)
  }, 2800);

  return (
      <ParallaxProvider>
        <BrowserRouter>
        <Wrapper>
          <Header isEngContent={isEngContent} setEngContent={setEngContent}/>
          {isFirstLoad ? <Loader visible={true}/> : <Loader visible={false}/>}
            <Routes>
              <Route path="/" element={Home(isFirstLoad, isEngContent)} />
              <Route path="/gallery" element={Gallery(isEngContent)} />
              <Route path="/shop" element={<Shop/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/admin" element={<Admin/>}/>
            </Routes>
          </Wrapper>
        </BrowserRouter>
        <Footer/>
      </ParallaxProvider>
  );
};


const Wrapper = ({children}:any) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
} 

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Contact from "./components/Contact/Contact";
import Shop from "./components/Shop/Shop";
import Gallery from "./components/Gallery/Gallery";
import Admin from "./components/Admin/Admin";
import { ParallaxProvider } from 'react-scroll-parallax';
import { useState } from "react";
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
        <Header isEngContent={isEngContent} setEngContent={setEngContent}/>
        {isFirstLoad ? <Loader visible={true}/> : <Loader visible={false}/>}
          <Switch>
            <Route path="/" exact component={() => Home(isFirstLoad, isEngContent)} />
            <Route path="/gallery" exact component={() => Gallery(isEngContent)} />
            <Route path="/shop" exact component={Shop} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/admin" component={Admin}/>
          </Switch>
        </BrowserRouter>
        <Footer/>
      </ParallaxProvider>
  );
};
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Contact from "./components/Contact/Contact";
import Shop from "./components/Shop/Shop";
import Gallery from "./components/Gallery/Gallery";
import { ParallaxProvider } from 'react-scroll-parallax';
import { useState } from "react";
import Loader from "./components/Loader/Loader";
export default function App(){

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  setTimeout(() => {
    setIsFirstLoad(false)
  }, 2800);

  return (
    <ParallaxProvider>
      <BrowserRouter>
      <Header/>
      {isFirstLoad ? <Loader visible={true}/> : <Loader visible={false}/>}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/gallery" exact component={Gallery} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/contact" exact component={Contact} />
        </Switch>
      </BrowserRouter>
    </ParallaxProvider>
  );
};
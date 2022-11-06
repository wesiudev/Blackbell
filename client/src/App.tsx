import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Contact from "./components/Contact/Contact";
import Shop from "./components/Shop/Shop";
import Gallery from "./components/Gallery/Gallery";
import { ParallaxProvider } from 'react-scroll-parallax';
export default function App(){

  return (
    <ParallaxProvider>
      <BrowserRouter>
      <Header/>
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
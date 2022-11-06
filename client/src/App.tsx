import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import { ParallaxProvider } from 'react-scroll-parallax';
export default function App(){

  return (
    <ParallaxProvider>
      <BrowserRouter>
      <Header/>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </ParallaxProvider>
  );
};
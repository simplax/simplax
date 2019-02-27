import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home';
// import AboutUs from "./pages/AboutUs";
import Showcase from './pages/Showcase';
// import Customize from "./pages/Customize";
// import Blog from "./pages/Blog";
import Secret from './pages/Secret';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  return (
    <div className="App vh-100">
      <div className="container">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/about-us" component={AboutUs} /> */}
          <Route path="/showcase" component={Showcase} />
          {/* <Route path="/customize" component={Customize} /> */}
          {/* <Route path="/blog" component={Blog} /> */}
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    </div>
  );
}

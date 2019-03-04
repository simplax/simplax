import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
// import AboutUs from "./pages/AboutUs";
import Showcase from "./pages/Showcase";
import Customize from "./pages/Customize";
// import Blog from "./pages/Blog";
import Secret from "./pages/Secret";
import Login from "./pages/Login";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";
import Blog from "./pages/Blog";
import SuccessLogin from "./pages/SuccessLogin";

export default function App() {
  return (
    <div className="App vh-100">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Route path="/about-us" component={AboutUs} /> */}
        <Route path="/explore" component={Showcase} />
        <Route path="/customize" component={Customize} />
        <Route path="/login" component={Login} />
        <Route path="/success-login" component={SuccessLogin} />
        <Route path="/secret" component={Secret} />
        <Route path="/new-blog" component={AddBlog} />
        <Route path="/blog" component={Blog} />
        <Route path="/edit-blog/:id" component={EditBlog} />
        <Route render={() => <h2>404</h2>} />
      </Switch>
    </div>
  );
}

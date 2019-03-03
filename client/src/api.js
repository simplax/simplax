import axios from "axios";

const service = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000/api",
  withCredentials: true
});

const errHandler = err => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,

  // This method is synchronous and returns true or false
  // To know if the user is connected, we just check if we have a value for localStorage.getItem('user')

  // This method signs up and logs in the user
  signup(userInfo) {
    return service
      .post("/signup", userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  login(username, password) {
    return service
      .post("/login", {
        username,
        password
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    localStorage.removeItem("user");
    return service.get("/logout");
  },

  getSecret() {
    return service
      .get("/secret")
      .then(res => res.data)
      .catch(errHandler);
  },

  /****************************************
   * GET all parallax effects for showcase
   *****************************************/
  getAllParallaxData() {
    return service
      .get("/showcase")
      .then(res => res.data)
      .catch(errHandler);
  },

  getManyParallaxData(ids) {
    return service
      .get(`/customize/${ids}`)
      .then(res => res.data)
      .catch(errHandler);
  },
  /****************************************
   * CRUD operation for blogpost
   *****************************************/
  postBlogPost(data) {
    return service
      .post("/blogposts", data)
      .then(res => res.data)
      .catch(errHandler);
  },

  getBlogPost() {
    return service
      .get("/blogposts")
      .then(res => res.data)
      .catch(errHandler);
  },

  updateBlogPost(id, data) {
    return service
      .put("/blogposts/" + id, data)
      .then(res => res.data)
      .catch(errHandler);
  },

  getBlogPostDetail(BlogId) {
    return service
      .get("/blogposts/" + BlogId)
      .then(res => res.data)
      .catch(errHandler);
  },

  deleteBlogPost(BlogId) {
    return service
      .delete("/blogposts/" + BlogId)
      .then(res => res.data)
      .catch(errHandler);
  },

  /****************************************
   * Getting information of logged in user
   *****************************************/

  userDetail() {
    return service.get("loggedin").then(res => {
      let user = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      console.log(localStorage.getItem("user"));
      return user;
    });
  },
  isLoggedIn() {
    return localStorage.getItem("user") != null;
  },

  // This method returns the user from the localStorage
  // Be careful, the value is the one when the user logged in for the last time
  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem("user"));
  },

  /****************************************
   * Storing informations on session storage for non logged in users
   *****************************************/

  setSessionStorage(name, val) {
    return sessionStorage.setItem(name, JSON.stringify(val));
  },

  // getSessionStorage() {
  //   return JSON.parse(sessionStorage.getItem("likedEffect"));
  // },

  /****************************************
   * CRUD operation for user saved customize profile
   *****************************************/
  getSavedProfile() {
    return service
      .get('/savedProfiles')
      .then(res => res.data)
      .catch(errHandler)
  },

  postSavedProfile(data) {
    return service
      .post('/savedProfiles', data)
      .then(res => res.data)
      .catch(errHandler)
  },

  updateSavedProfile(id, data) {
    return service
      .put("/savedProfiles/" + id, data)
      .then(res => res.data)
      .catch(errHandler);
  },

  getSavedProfileDetail(BlogId) {
    return service
      .get("/savedProfiles/" + BlogId)
      .then(res => res.data)
      .catch(errHandler);
  },

  deleteSavedProfile(BlogId) {
    return service
      .delete("/savedProfiles/" + BlogId)
      .then(res => res.data)
      .catch(errHandler);
  },



  // setSessionStorage(likedEffect) {
  //   return sessionStorage.setItem("likedEffect", JSON.stringify(likedEffect));
  // },

  getSessionStorage(name) {
    return JSON.parse(sessionStorage.getItem(name));
  }

  // getSessionStorage() {
  //   return JSON.parse(sessionStorage.getItem("likedEffect"));
  // }
};

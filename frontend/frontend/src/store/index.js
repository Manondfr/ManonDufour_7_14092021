import { createStore } from 'vuex'
import axios from 'axios'

axios.defaults.withCredentials = true


export default createStore({
  state: {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    posts: [],
    comments: [],
    connectedUser: [],
    selectedFile:null,
    content: null,
    gender:null,
    birthday:null,
    occupation:null,
    about:null,
    profilePicture:null,
    userId: localStorage.getItem('userId'),
    admin: null,
  },
  mutations: {
    CHANGE_PERSONAL_INFORMATIONS(state) {
      state.firstName = document.querySelector("#firstName").value;
      state.lastName = document.querySelector("#lastName").value;
      state.email = document.querySelector("#email").value;
      state.password = document.querySelector("#password").value;
      console.log(state)
    },
    LOGIN_PERSONAL_INFORMATIONS(state) {
      state.email = document.querySelector("#email").value;
      state.password = document.querySelector("#password").value;
      console.log(state)
    },
    SET_POSTS(state, posts) {
      state.posts = posts
    },
    SET_POSTS_BY_USER(state, posts) {
      state.posts = posts
    },
    SET_USER_INFOS(state, infos) {
      state.lastName = infos.last_name;
      state.firstName = infos.first_name;
      state.gender = infos.gender;
      state.occupation = infos.occupation;
      state.birthday = infos.birthday;
      state.about = infos.about;
      state.profilePicture = infos.profilePicture;
      state.userId = infos.id
    },
    SET_CONNECTED_USER_INFOS(state, infos) {
      state.connectedUser.lastName = infos.last_name;
      state.connectedUser.firstName = infos.first_name;
      state.connectedUser.gender = infos.gender;
      state.connectedUser.occupation = infos.occupation;
      state.connectedUser.birthday = infos.birthday;
      state.connectedUser.about = infos.about;
      state.connectedUser.profilePicture = infos.profilePicture;
      state.connectedUser.id = infos.id;
      state.connectedUser.admin = infos.admin
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments
    },
    SET_LIKE(state, numberOfLikes) {
      state.posts.likes = numberOfLikes
      console.log(state.posts.likes)
    },
    CHANGE_SELECTED_FILE(state, file) {
      state.selectedFile = file;
      console.log(state.selectedFile);
    },
    CHANGE_PROFILE_PICTURE(state, file) {
      state.connectedUser.profilePicture = file;
    },

    CHANGE_CONTENT(state, value) {
      state.content = value;
    },
  },
  actions: {
    changePersonalInformations(context) {
      context.commit('CHANGE_PERSONAL_INFORMATIONS')
    },
    loginPersonalInformations(context) {
      context.commit('LOGIN_PERSONAL_INFORMATIONS');
    },
    getPosts({ commit }) {
     const url = "http://localhost:3000/api/publications/";
     let xsrfToken = localStorage.getItem('xsrfToken');
     xsrfToken = JSON.parse(xsrfToken);
      axios({
        method: 'get',
        withCredentials:true,
        headers: {
        'x-xsrf-token' : xsrfToken,
        },
        url: url,
      })
      .then(response => {
        if(response.data == 'http://localhost:8080/#/login') {
          window.location.href = response.data
        } else {
          commit('SET_POSTS', response.data)
        }
      })
    },
    getPostsByUser({ commit }, userId) {
      console.log(userId);
      const url = "http://localhost:3000/api/auth/user/" + userId + "/publications/";
      let xsrfToken = localStorage.getItem('xsrfToken');
      xsrfToken = JSON.parse(xsrfToken);
      axios({
        method: 'get',
        withCredentials:true,
        headers: {
        'x-xsrf-token' : xsrfToken,
        },
        url: url,
      })
      .then(response => {
        commit('SET_POSTS_BY_USER', response.data)
      })
    },
    getUserInfos({ commit }, userId) {
      const url = "http://localhost:3000/api/auth/user/" + userId;
      let xsrfToken = localStorage.getItem('xsrfToken');
      xsrfToken = JSON.parse(xsrfToken);
      axios({
        method: 'get',
        withCredentials:true,
        headers: {
        'x-xsrf-token' : xsrfToken,
        },
        url: url,
      })
      .then(response => {
        commit('SET_USER_INFOS', response.data)
      })
    },
    getConnectedUserInfos({ commit }, userId) {
      const url = "http://localhost:3000/api/auth/user/" + userId;
      let xsrfToken = localStorage.getItem('xsrfToken');
      xsrfToken = JSON.parse(xsrfToken);
      axios({
        method: 'get',
        withCredentials:true,
        headers: {
        'x-xsrf-token' : xsrfToken,
        },
        url: url,
      })
      .then(response => {
        commit('SET_CONNECTED_USER_INFOS', response.data)
      })
    },
    getComments({ commit }, publicationId) {
      const url = "http://localhost:3000/api/publications/" + publicationId + "/comments";
      let xsrfToken = localStorage.getItem('xsrfToken');
      xsrfToken = JSON.parse(xsrfToken);
      axios({
        method: 'get',
        withCredentials:true,
        headers: {
        'x-xsrf-token' : xsrfToken,
        },
        url: url,
      })
      .then(response => {
        commit('SET_COMMENTS', response.data)
      })
    },
    changeSelectedFile(context, file) {
      context.commit('CHANGE_SELECTED_FILE', file)
    },
    changeProfilePicture(context, file) {
      context.commit('CHANGE_PROFILE_PICTURE', file)
    },
    changeContent(context, value) {
      context.commit('CHANGE_CONTENT', value)
    },
    setLike(context, value) {
      context.commit('SET_LIKE', value)
    },
  },
})

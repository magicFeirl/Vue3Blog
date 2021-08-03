import {
  createStore
} from 'vuex'

import axios from '@/hooks/useAxios'

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
    isLogin: localStorage.getItem('token') || false
  },
  mutations: {
    login(state, token) {
      state.token = token;
      state.isLogin = true
      localStorage.setItem('token', token);
    },
    logout(state) {
      state.token = ''
      state.isLogin = false;
      localStorage.removeItem('token');
    }
  },
  actions: {
    async deleteArticle(context, id) {
      return await axios.delete('/article', {
        params: {
          id
        }
      })
    },
    async getArticle(context, id) {
      return await axios.get('/article', {
        params: {
          id
        }
      })
    },
    async updateArticle(context, payload) {
      return await axios.put(`/article?id=${payload.id}`, payload.formData)
    },
    async getAllArticles() {
      return await axios.get('/articles')
    },
    async postArticle(context, formData) {
      return await axios.post('/article', formData)
    },
    async login(context, formData) {
      const {
        data
      } = await axios.post("/auth/login", formData);

      const {
        access_token
      } = data

      context.commit('login', access_token);
      return access_token;
    }
  }
})
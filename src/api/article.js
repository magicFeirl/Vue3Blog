import axios from '../hooks/useAxios.js'

export default {
  async getArticleTags(id) {
    return await axios.get(`/tag/article?article_id=${id}`)
  },
  async deleteArticle(id) {
    return await axios.delete('/article', {
      params: {
        id
      }
    })
  },
  async getArticle(id) {
    return await axios.get('/article', {
      params: {
        id
      }
    })
  },
  async updateArticle(payload) {
    return await axios.put(`/article?id=${payload.id}`, payload.formData)
  },
  async getAllArticles() {
    return await axios.get('/articles')
  },
  async postArticle(formData) {
    return await axios.post('/article', formData)
  },
}
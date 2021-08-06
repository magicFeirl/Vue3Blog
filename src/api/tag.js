import axios from '../hooks/useAxios.js'

export default {
  async addTagsToArticle(article_id, tags) {
    return await axios.post(`/tag/article`, {
      params: {
        article_id,
        tags
      }
    })
  },
  async getTagCount() {
    return await axios.get(`/tag/count`)
  },
}
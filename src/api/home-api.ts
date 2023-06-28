import axios from 'axios'

const fakeUrl = 'https://test-api.redro.ru/api'
export const HomeApi = {
  getCategory() {
    return axios
      .get(`${fakeUrl}/products-categories/get-categories`)
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
}

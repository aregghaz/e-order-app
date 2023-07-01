import axios from 'axios'

export const fakeUrl = 'https://test-api.redro.ru/api'
export const getImagePath = (path: string | null) =>
  path
    ? `${fakeUrl}/local-files/get-image/${path}`
    : 'https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg'
export const HomeApi = {
  getCategory() {
    return axios
      .get(`${fakeUrl}/products-categories/get-categories`)
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
}

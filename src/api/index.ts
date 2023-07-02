import axios from 'axios'

export const fakeUrl = 'https://test-api.redro.ru/api'
export const getImagePath = (path: string | null, product = '') =>
  path
    ? `${fakeUrl}/local-files/get${product}-image/${path}`
    : 'https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg'
export const SHOP_API = {
  getCategory() {
    return axios
      .get(`${fakeUrl}/products-categories/get-categories`)
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
  getFeaturedProducts: () => {
    return axios
      .get(
        `${fakeUrl}/analytics/get-products?period=30&category=&type=new-arrivals&shopId=07c1a17d-41ed-49a6-96a0-01db91821db2`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
}

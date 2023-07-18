import axios from 'axios'

export const fakeUrl = 'https://test-api.redro.ru'
const shopIdTest = `07c1a17d-41ed-49a6-96a0-01db91821db2`
export const getImagePath = (path: string | null, product = '') =>
  `${fakeUrl}/api/local-files/get${product}-image/${path}`
export const SHOP_API = {
  getCategory() {
    return axios
      .get(`${fakeUrl}/api/products-categories/get-categories`)
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
  getLatestProducts: (limit = 20, page = 1, shopId: string = shopIdTest) => {
    return axios
      .get(
        `${fakeUrl}/api/analytics/get-products?period=30&category=&type=new-arrivals&shopId=${shopId}&limit=${limit}&page=${page}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
  getFeaturedProducts: (shopId: string = shopIdTest, limit = 20, page = 1) => {
    return axios
      .get(
        `${fakeUrl}/api/analytics/get-products?period=30&category=&type=featured&shopId=${shopId}&limit=${limit}&page=${page}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
  getFeaturedProductsByCategories: (
    categoryId: number | string,
    shopId: string = shopIdTest,
    limit = 20,
    page = 1
  ) => {
    return axios
      .get(
        `${fakeUrl}/api/analytics/get-products?period=30&category=${categoryId}&type=featured&shopId=${shopId}&limit=${limit}&page=${page}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
  getNewArrivals: (shopId: string = shopIdTest, limit = 20, page = 1) => {
    return axios
      .get(
        `${fakeUrl}/api/analytics/get-products?period=30&category=&type=new-arrivals&shopId=${shopId}&limit=${limit}&page=${page}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
  getBestSeller: (shopId: string = shopIdTest, limit = 20, page = 1) => {
    return axios
      .get(
        `${fakeUrl}/api/analytics/get-products?period=30&category=&type=best-seller&shopId=${shopId}&limit=${limit}&page=${page}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
  getTopRated: (shopId: string = shopIdTest, limit = 20, page = 1) => {
    return axios
      .get(
        `${fakeUrl}/api/analytics/get-products?period=30&category=&type=top-rated&shopId=${shopId}&limit=${limit}&page=${page}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
  getTopDiscounts: (shopId: string = shopIdTest, limit = 20, page = 1) => {
    return axios
      .get(
        `${fakeUrl}/api/analytics/get-products?period=30&category=&type=top-discounts&shopId=${shopId}&limit=${limit}&page=${page}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
  getCategoryProducts: (categoryId: any, limit = 20, page = 1) => {
    return axios
      .post(
        `${fakeUrl}/api/products/products-search?categories=${categoryId}&limit=${limit}&page=${page}`
      )
      .then((res) => {
        console.log(res.data, 'data in result')
        return res.data
      })
      .catch((err) => console.log(err))
  },
  /*** Authentication ***/

  setPhoneNumberRequest: (phoneNumber: string) => {
    return axios
      .post(`${fakeUrl}/api/auth/customer-registration`, {
        mobile: phoneNumber,
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },

  setVerificationCode: (phoneNumber: string, token: number) => {
    return axios
      .post(`${fakeUrl}/api/auth/confirm-mobile-token`, { mobile: phoneNumber, token })
      .then((res) => {
        console.log(res, 'data in result')
        return res
      })
      .catch((err) => console.log(err))
  },
  signInRequest: (phone: string, password: string) => {
    return axios
      .post(`${fakeUrl}/api/auth/customer-login`, { login: phone, password })
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },
}

import axios from 'axios'

export const fakeUrl = 'https://test-api.redro.ru'
const shopIdTest = `07c1a17d-41ed-49a6-96a0-01db91821db2`
export const getImagePath = (path: string | null, product = '') =>
  `${fakeUrl}/api/local-files/get${product}-image/${path}`
export const SHOP_API = {
  getCategory: async () => {
    return axios
      .get(`${fakeUrl}/api/products-categories/get-categories`)
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
  getFeaturedProducts: async (shopId: string = shopIdTest, limit = 20, page = 1) => {
    console.log(`shopId=${shopId}___SHOP_ID`)
    return axios
      .get(
        `${fakeUrl}/api/analytics/get-products?period=30&category=&type=featured&shopId=${shopId}&limit=${limit}&page=${page}`
      )
      .then((res) => {
        // console.log(res, 'TYTYTYTY')
        return res.data
      })
      .catch((err) => console.log(err))
  },
  getFeaturedProductsByCategories: async (
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
  getNewArrivals: async (shopId: string = shopIdTest, limit = 20, page = 1) => {
    return axios
      .get(
        `${fakeUrl}/api/analytics/get-products?period=30&category=&type=new-arrivals&shopId=${shopId}&limit=${limit}&page=${page}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
  getBestSeller: async (shopId: string = shopIdTest, limit = 20, page = 1) => {
    return axios
      .get(
        `${fakeUrl}/api/analytics/get-products?period=30&category=&type=best-seller&shopId=${shopId}&limit=${limit}&page=${page}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
  getTopRated: async (shopId: string = shopIdTest, limit = 20, page = 1) => {
    return axios
      .get(
        `${fakeUrl}/api/analytics/get-products?period=30&category=&type=top-rated&shopId=${shopId}&limit=${limit}&page=${page}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
  getTopDiscounts: async (shopId: string = shopIdTest, limit = 20, page = 1) => {
    return axios
      .get(
        `${fakeUrl}/api/analytics/get-products?period=30&category=&type=top-discounts&shopId=${shopId}&limit=${limit}&page=${page}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
  getCategoryProducts: async (categoryId: any, limit = 20, page = 1) => {
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
  getSearchedValues: async (text: string) => {
    return axios
      .post(`${fakeUrl}/api/products/products-search?text=${text}`)
      .then((res) => {
        console.log(res.data, 'data in result')
        return res.data
      })
      .catch((err) => console.log(err))
  },
  /*** Authentication ***/
  /* step 1 */
  setPhoneNumberRequest: async (phoneNumber: string) => {
    return axios
      .post(`${fakeUrl}/api/auth/customer-registration`, {
        mobile: phoneNumber,
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },
  /* step 2 */
  setVerificationCode: async (phoneNumber: string, token: number) => {
    return axios
      .post(`${fakeUrl}/api/auth/confirm-mobile-token`, { mobile: phoneNumber, token })
      .then((res) => {
        console.log(res, 'data in result')
        return res
      })
      .catch((err) => console.log(err))
  },
  /* step 3 */
  createCustomerUser: async (token: number, phone: string, password: string) => {
    return axios
      .post(`${fakeUrl}/api/users/create-customer-user`, { mobile: phone, password, token })
      .then((res) => {
        console.log(res, '___ RES_DATA ___')
        return res.data
      })
      .catch((err) => console.log(err))
  },
  /* step 4 */
  signInRequest: async (phone: string, password: string) => {
    return axios
      .post(`${fakeUrl}/api/auth/customer-login`, { login: phone, password })
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },
  /* step 5 */
  createCustomerAccount: async (data = {}) => {
    return axios
      .post(`${fakeUrl}/api/customers/create-customer-account`, data)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },
  /*** Forgot password ***/
  forgotPassword: async (data: any) => {
    return axios
      .post(`${fakeUrl}/api/auth/customer-forgot-password`, data)
      .then((res) => {
        console.log(res.data, 'RES_________SER')
        return res.data
      })
      .catch((err) => console.log(err))
  },
  resetPassword: async (token: number, phone: string, password: string) => {
    return axios
      .post(`${fakeUrl}/api/auth/customer-reset-password`, { mobile: phone, password, token })
      .then((res) => {
        console.log(res, '___ RES_DATA ___')
        return res
      })
      .catch((err) => console.log(err))
  },
  resendConfirmation: async (phone: string) => {
    return axios
      .post(`${fakeUrl}/api/auth/resend-mobile-confirmation`, { mobile: phone })
      .then((res) => {
        console.log(res.data, 'resendConfirmation')
        return res.data
      })
      .catch((err) => console.log(err))
  },
  signOut: () => {
    return axios.post(`${fakeUrl}/api/auth/signOut`)
  },
  /*** ADD to Cart ***/
  addToCart: async (data: any) => {
    return axios
      .post(`${fakeUrl}/api/shopping-cart/add-to-cart`, data)
      .then((res) => {
        console.log(res.data, 'addToCart')
        return res.data
      })
      .catch((err) => console.log(err))
  },
}

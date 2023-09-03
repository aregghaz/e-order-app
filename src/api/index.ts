import axios from 'axios'

import { getToken } from '~services'
import { notification } from '~services/ShopService'
import { IProfile } from '~types/authForms'
import { IShopDetails } from '~types/shop'

interface IOptions {
  shopId: string | null
  page: number | null
  limit: number | null
  categoryId?: number | string | null
}

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
  getFeaturedProducts: async (options: IOptions) => {
    const { shopId = shopIdTest, limit = 20, page = 1 } = options
    const trueShopId = shopId ? shopId : shopIdTest
    const trueLimit = limit ? limit : 20
    const truePage = page ? page : 1
    // console.log(`shopId=${shopId}___SHOP_ID`)
    return axios
      .get(
        `${fakeUrl}/api/analytics/get-products?period=30&category=&type=featured&shopId=${trueShopId}&limit=${trueLimit}&page=${truePage}`
      )
      .then((res) => {
        // console.log(res, 'TYTYTYTY')
        return res.data
      })
      .catch((err) => console.log(err))
  },
  getFeaturedProductsByCategories: async (options: IOptions) => {
    const { shopId = shopIdTest, limit = 20, page = 1, categoryId } = options
    const trueShopId = shopId ? shopId : shopIdTest
    const trueLimit = limit ? limit : 20
    const truePage = page ? page : 1
    const trueCategoryId = categoryId ? categoryId : ''
    return axios
      .get(
        `${fakeUrl}/api/analytics/get-products?period=30&category=${trueCategoryId}&type=featured&shopId=${trueShopId}&limit=${trueLimit}&page=${truePage}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
  getNewArrivals: async (options: IOptions) => {
    const { shopId = shopIdTest, limit = 20, page = 1 } = options
    const trueShopId = shopId ? shopId : shopIdTest
    const trueLimit = limit ? limit : 20
    const truePage = page ? page : 1
    return axios
      .get(
        `${fakeUrl}/api/analytics/get-products?period=30&category=&type=new-arrivals&shopId=${trueShopId}&limit=${trueLimit}&page=${truePage}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
  getBestSeller: async (options: IOptions) => {
    const { shopId = shopIdTest, limit = 20, page = 1 } = options
    const trueShopId = shopId ? shopId : shopIdTest
    const trueLimit = limit ? limit : 20
    const truePage = page ? page : 1
    return axios
      .get(
        `${fakeUrl}/api/analytics/get-products?period=30&category=&type=best-seller&shopId=${trueShopId}&limit=${trueLimit}&page=${truePage}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
  getTopRated: async (options: IOptions) => {
    const { shopId = shopIdTest, limit = 20, page = 1 } = options
    const trueShopId = shopId ? shopId : shopIdTest
    const trueLimit = limit ? limit : 20
    const truePage = page ? page : 1
    return axios
      .get(
        `${fakeUrl}/api/analytics/get-products?period=30&category=&type=top-rated&shopId=${trueShopId}&limit=${trueLimit}&page=${truePage}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  },
  getTopDiscounts: async (options: IOptions) => {
    const { shopId = shopIdTest, limit = 20, page = 1 } = options
    const trueShopId = shopId ? shopId : shopIdTest
    const trueLimit = limit ? limit : 20
    const truePage = page ? page : 1
    return axios
      .get(
        `${fakeUrl}/api/analytics/get-products?period=30&category=&type=top-discounts&shopId=${trueShopId}&limit=${trueLimit}&page=${truePage}`
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
  createCustomerUser: async (token: string, phone: string, password: string) => {
    return axios
      .post(`${fakeUrl}/api/users/create-customer-user`, { mobile: phone, password, token })
      .then((res) => {
        console.log(res, '22222')
        return res.data
      })
      .catch((err) => console.log(err))
  },
  fillingCustomerUser: async (body: IProfile) => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .post(`${fakeUrl}/api/customers/create-customer-account`, body)
      .then((res) => {
        console.log(res, '111111')
        return res.data
      })
      .catch((err) => console.log(err))
  },
  updateCustomerUser: async (body: IProfile, id: string) => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .patch(`${fakeUrl}/api/customers/update-customer/${id}`, body)
      .then((res) => {
        console.log(res.data, '77777777')
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
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .post(`${fakeUrl}/api/auth/customer-reset-password`, { mobile: phone, password, token })
      .then((res) => {
        console.log(res, '___ RES_DATA ___')
        return res
      })
      .catch((err) => console.log(err))
  },
  changePassword: async (currentPassword: string, newPassword: string) => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .post(`${fakeUrl}/api/users/change-password`, { currentPassword, newPassword })
      .then((res) => {
        return res.config
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
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .post(`${fakeUrl}/api/shopping-cart/add-to-cart`, data)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },

  getShopCarts: async (shopId: string) => {
    return axios
      .get(`${fakeUrl}/api/shopping-cart/get-shopping-carts?shopId=${shopId}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },
  getShopCart: async (shopId: string) => {
    return axios
      .get(`${fakeUrl}/api/shopping-cart/shopping-cart/${shopId}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },
  /**** Order Api ****/
  getOrders: async () => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .get(`${fakeUrl}/api/orders/get-orders`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },
  getOrdersDetails: async (id: string) => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .get(`${fakeUrl}/api/orders/get-order/${id}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },
  createOrder: async (body: { shoppingCart: string; comment: string }) => {
    console.log(body, 'body')
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .post(`${fakeUrl}/api/orders/create-order`, body)
      .then((res) => {
        console.log(res, 'resresres')
        return res.data
      })
      .catch((err) => console.log(err))
  },
  /**** end orders ****/
  deleteShopCartID: async (id: string) => {
    return axios
      .delete(`${fakeUrl}/api/shopping-cart/delete-shopping-cart/${id}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log('Error while deleting', err))
  },
  deleteFromCart: async (shoppingCartId: string, itemId: string) => {
    return axios
      .delete(`${fakeUrl}/api/shopping-cart/delete-from-cart/${shoppingCartId}/${itemId}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log('Error while deleting', err))
  },
  /*SHOPS*/
  getShopsData: async () => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .get(`${fakeUrl}/api/shops/get-shops`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },

  createShops: async (body: IShopDetails) => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .post(`${fakeUrl}/api/shops/update-shops`, body)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },
  updateShops: async (id: string, body: IShopDetails) => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .patch(`${fakeUrl}/api/shops/update-shops/${id}`, body)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },
  deleteShop: async (id: string) => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    console.log(`${fakeUrl}/api/shops/delete-shops/${id}`)
    return axios
      .delete(`${fakeUrl}/api/shops/delete-shops/${id}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },
  getShop: async (id: string) => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .get(`${fakeUrl}/api/shops/get-shops/${id}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },
  /*  Partnerships  */
  get: async (id: string) => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .get(`${fakeUrl}/api/partnerships/get-partnerships?shopId=${id}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },
  getSingleData: async (id: string) => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .get(`${fakeUrl}/api/partnerships/get-partnership/${id}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },
  delete: async (id: string) => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .delete(`${fakeUrl}/api/partnerships/delete-partnership/${id}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },
  searchParthner: async (id: string, page: number) => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .get(`${fakeUrl}/api/suppliers/get-suppliers?shopId=${id}&page=${page}`)
      .then((res) => {
        console.log(res.data, ' SEARCH PARTNER')
        return res.data
      })
      .catch((err) => console.log(err))
  },
  addParthner: async (supId: string, shopId: string) => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .post(`${fakeUrl}/api/partnerships/send-request/${supId}/${shopId}`)
      .then((res) => {
        console.log(res.data, 'res data')
        return res.data
      })
      .catch((err) => console.log(err))
  },
  getShopReq: async (id: string) => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .get(`${fakeUrl}/api/partnerships/send-requests?shopId=${id}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },

  /* wish list  */

  createWishList: async (name: string) => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .post(`${fakeUrl}/api/favorite-products-lists/create-favorite-list`, { name })
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },

  addToWishList: async (productId: string, id: string) => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .put(
        `${fakeUrl}/api/favorite-products-lists/add-favorite-product?id=${id}&productId=${productId}`
      )
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },

  removeFromWishList: async (productId: string, id: string) => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .put(
        `${fakeUrl}/api/favorite-products-lists/remove-favorite-product?id=${id}&productId=${productId}`
      )
      .then((res) => {
        notification('Успешно удален из списка')
        return res.data
      })
      .catch((err) => console.log(err))
  },
  deleteWishListItem: async (id: string) => {
    console.log(id, 'id')
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .delete(`${fakeUrl}/api/favorite-products-lists/delete-favorite-list/${id}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },
  updateWishListItem: async (id: string, value: string) => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .put(`${fakeUrl}/api/favorite-products-lists/update-favorite-list/${id}`, { name: value })
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },

  getWishList: async () => {
    const tokenUSer = await getToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenUSer
    return axios
      .get(`${fakeUrl}/api/favorite-products-lists/get-favorite-lists?limit=100`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  },
}

import { SCREEN } from '~constants'
import { notification } from "~services/ShopService";
import { ALERT_TYPE } from "react-native-alert-notification";

export interface IWishlist {
  customer: {
    id: string
    status: any
  }
  id: string
  name: string
  products: IWishlistProduct[]
}

export interface IWishlistProduct {
  barcode: string
  createdAt: string
  description: string
  discount: null
  discountEnd: null
  discountStart: null
  id: string
  isVisible: boolean
  name: string
  properties: {
    unit: IUnit[]
  }
  rating: number
  refId: string
  sales: number
  sku: string
  status: string
  updatedAt: string
  views: number
  price: string
  reward: string
}

interface IUnit {
  contents: string
  name: string
  productId: string
  refId: string
  unitId: string
}

export const findTheExactElement = (array: IWishlist[], itemId: string, productId: string) => {
  const foundItem = array.find((item: IWishlist) => item.id === itemId)
  if (!foundItem) return false
  return foundItem.products.some((item: IWishlistProduct) => item.id === productId)
}

export const ScreenNameChanger = (name: string) => {
  switch (name) {
    case 'Home':
      return SCREEN.TAB_HOME
    case 'Shop List':
      return SCREEN.STACK_SHOP_LIST
    case 'Personal Info':
      return SCREEN.TAB_PROFILE
    case 'Change Password':
      return SCREEN.CHANGE_PASSWORD
    case 'Edit Profile':
      return SCREEN.PROFILE_EDIT
    case 'Order List':
      return SCREEN.STACK_ORDER_LIST
    case 'Partners':
      return SCREEN.PARTNER_SHIP
    case 'Contact Us':
      return SCREEN.TAB_CONTACT
    default:
      return SCREEN.DRAWER_MENU
  }
}

export const ErrorStatusCodeHandling = (statusCode: number) => {
  switch (statusCode) {
    case 401:
      return notification('Сперва нужно войти!!!', ALERT_TYPE.WARNING)
    case 404:
      return notification('Такого пользователя не существует ', ALERT_TYPE.WARNING)
    default:
      return notification('Что то пошло не так.', ALERT_TYPE.WARNING)
  }
}

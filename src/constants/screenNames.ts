export const SCREEN = {
  STACK_HOME: 'MainTab',
  STACK_CATEGORY: 'CategoryStack',
  STACK_CATEGORY_INNER: 'CategoryInner',
  STACK_CATEGORY_INNER_PAGE: 'CategoryInnerPage',
  STACK_CATEGORY_DETAIL: 'CategoryDetail',
  STACK_CATEGORY_SEARCH: 'SearchStack',
  STACK_PRODUCT_INNER: 'ProductInner',
  STACK_PROFILE: 'ProfileStack',
  STACK_CONTACT: 'ContactStack',
  STACK_SIGN_IN: 'SignIn',
  STACK_SIGN_UP: 'SignUp',
  STACK_MAIN_TAB: 'MainTab',
  STACK_MAIN_REGISTER: 'MainRegister',
  STACK_PASSWORD: 'PasswordStack',
  STACK_ACCOUNT: 'AccountStack',
  STACK_CREATE_STORE: 'CreateStore',
  STACK_UPDATE_STORE: 'UpdateStore',
  STACK_SETTINGS: 'Settings',
  STACK_APPLICATION_INFO: 'ApplicationInfo',
  STACK_NOT_FOUND: 'NotFound',
  STACK_VERIFICATION: 'VerifyCode',
  STACK_FORGOT_PASSWORD: 'ForgotPassword',
  STACK_WISHLIST: 'Wishlist',
  STACK_SHOP_CART: 'ShopCart',
  STACK_SHOP_LIST: 'ShopList',
  STACK_ORDER_LIST: 'OrderList',
  STACK_ORDER_INNER: 'OrderDetails',
  STACK_ORDER_SUCCESS: 'OrderSuccess',
  STACK_ORDER_FAIL: 'OrderFail',
  TAB_HOME: 'Home',
  TAB_CATEGORY: 'Category',
  TAB_PROFILE: 'Profile',
  TAB_CONTACT: 'Contact',
  DRAWER_MENU: 'Menu',
  DRAWER_ROOT: 'Root',
  PHONE_REGISTER: 'PhoneRegister',
  PARTNER_SHIP: 'Partnership',
  ADD_PARTNERSHIP: 'AddPartnership',
  CHECKOUT: 'Checkout',
  PROFILE_EDIT: 'ProfileEdit',
  CHANGE_PASSWORD: 'ChangePassword',
  SUPPLIER: 'Supplier',
  STACK_PAYMENT: 'Payment',
  TERMS: 'Terms',
  PRIVACY: 'Privacy',
}

export type TMenusType =
  | 'menu.home'
  | 'menu.shop_list'
  | 'menu.profile'
  | 'menu.personal_info'
  | 'menu.change_password'
  | 'menu.edit_profile'
  | 'menu.order_list'
  | 'menu.partners'
  | 'menu.contact_us'
  | 'menu.payment'
export const MENUS = {
  HOME: 'menu.home',
  SHOP_LIST: 'menu.shop_list',
  PROFILE: 'menu.profile',
  PERSONAL_INFO: 'menu.personal_info',
  CHANGE_PASSWORD: 'menu.change_password',
  EDIT_PROFILE: 'menu.edit_profile',
  ORDER_LIST: 'menu.order_list',
  PARTNERS: 'menu.partners',
  CONTACT_US: 'menu.contact_us',
  PAYMENT: 'menu.payment',
}

export type partnersType = {
  'not-send': string
  pending: string
  accepted: string
}

export type TPartners =
  | 'partners_status.not-send'
  | 'partners_status.pending'
  | 'partners_status.accepted'

export type TPartnersStatus = 'not-send' | 'pending' | 'accepted'
export const PARTNERS_STATUS: partnersType = {
  'not-send': 'partners_status.not-send',
  pending: 'partners_status.pending',
  accepted: 'partners_status.accepted',
}

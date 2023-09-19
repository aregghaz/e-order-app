import { ASYNC_STORAGE_KEYS } from '~constants'
import { secureStore } from '~utils'

const { CART_COUNT } = ASYNC_STORAGE_KEYS

export async function setCartCount(count: number) {
  return await secureStore.setItem(CART_COUNT, JSON.stringify(count))
}

export async function getCartCount(): Promise<string> {
  const count = await secureStore.getItem(CART_COUNT)
  if (!count) return ''
  return JSON.parse(count)
}

export async function deleteCartCount() {
  const count = await secureStore.getItem(CART_COUNT)
  if (!count) return
  return secureStore.removeItem(CART_COUNT)
}

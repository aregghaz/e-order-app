import { ASYNC_STORAGE_KEYS } from '~constants'
import { secureStore } from '~utils'

const { SHOP_ID } = ASYNC_STORAGE_KEYS

export function setShopId(id: string) {
  console.log(id, '__ID')
  return secureStore.setItem(SHOP_ID, JSON.stringify(id))
}

export async function getShopId(): Promise<string> {
  const id = await secureStore.getItem(SHOP_ID)
  console.log(id, 'ID in getShopId')
  if (!id) return ''
  return JSON.parse(id)
}

export async function deleteShopId() {
  const id = await secureStore.getItem(SHOP_ID)
  if (!id) return
  return secureStore.removeItem(SHOP_ID)
}

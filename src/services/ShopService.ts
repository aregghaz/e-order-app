import { ALERT_TYPE, Toast } from 'react-native-alert-notification'

import { ASYNC_STORAGE_KEYS } from '~constants'
import { secureStore } from '~utils'

const { SHOP_ID } = ASYNC_STORAGE_KEYS

export async function setShopId(id: string, callback?: (newShopId: string) => void) {
  /// console.log(JSON.stringify(id), '__ID')
  return secureStore.setItem(SHOP_ID, JSON.stringify(id)).then(() => {
    // If a callback function is provided, call it with the new shop ID
    if (callback) {
      callback(id)
    }
  })
}

export async function getShopId(): Promise<string> {
  const id = await secureStore.getItem(SHOP_ID)
  if (!id) return ''
  return JSON.parse(id)
}

export async function deleteShopId() {
  const id = await secureStore.getItem(SHOP_ID)
  console.log(id, 'ididid')
  if (!id) return
  return secureStore.removeItem(SHOP_ID)
}
export async function notification(text: string, type: any = ALERT_TYPE.SUCCESS) {
  return Toast.show({
    type,
    title: text,
    // textBody: 'Успешно удалено из Магазинов!',
  })
}

import { ASYNC_STORAGE_KEYS } from '~constants'
import { secureStore } from '~utils'

const { SCREEN_NAME } = ASYNC_STORAGE_KEYS

export function setScreenName(name: string) {
  return secureStore.setItem(SCREEN_NAME, JSON.stringify(name))
}

export async function getScreenName(): Promise<string> {
  const name = await secureStore.getItem(SCREEN_NAME)
  if (!name) return ''
  return JSON.parse(name)
}

export async function deleteScreenName() {
  const name = await secureStore.getItem(SCREEN_NAME)
  if (!name) return
  return secureStore.removeItem(SCREEN_NAME)
}

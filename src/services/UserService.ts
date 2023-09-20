import { ASYNC_STORAGE_KEYS } from '~constants'
import { secureStore } from '~utils'

const { USER_DATA } = ASYNC_STORAGE_KEYS

// TODO: Modify this type with token value that is accepted by your backend
export type IUser = {
  email: string
  id: string
  isEmailConfirmed: boolean
  isMobileConfirmed: boolean
  mobile: string
  permissions: any
  roles: any
  status: string
  username: string
}

export function setUserDataSecure(data: IUser) {
  return secureStore.setItem(USER_DATA, JSON.stringify(data))
}

export async function getUserData(): Promise<IUser | any> {
  const data = await secureStore.getItem(USER_DATA)
  if (!data) {
    return
  }

  return JSON.parse(data)
}

export async function deleteUserData() {
  const data = await secureStore.getItem(USER_DATA)
  if (!data) return

  return secureStore.removeItem(USER_DATA)
}

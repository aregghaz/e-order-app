/**
 * was created by tigran at 05.09.23
 */

import createGenericContext from '~utils/createGenericContext'

export type GlobalContextType = {
  indicatorCount: number
  setIndicatorCount: (value: number) => void
  name: string
  surname: string
  setName: (name: string) => void
  setSurname: (surname: string) => void
  setUserData: (object: any) => void
  userData: any
}

export const [useGlobalContext, GlobalContextProvider] =
  createGenericContext<GlobalContextType>('GlobalContext')

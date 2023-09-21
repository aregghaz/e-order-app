import { FC, PropsWithChildren } from 'react'

import { GlobalContextProvider } from '~contexts'
import { useMemo, useState } from '~hooks'
export const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [shop_id, setShop_id] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [userData, setUserData] = useState<any>({})
  const [indicatorCount, setIndicatorCount] = useState(0)

  const value = useMemo(() => {
    return {
      name,
      setName,
      surname,
      setSurname,
      userData,
      setUserData,
      indicatorCount,
      setIndicatorCount,
      shop_id,
      setShop_id,
    }
  }, [
    name,
    setName,
    surname,
    setSurname,
    setUserData,
    userData,
    indicatorCount,
    setIndicatorCount,
    shop_id,
    setShop_id,
  ])

  return <GlobalContextProvider value={value}>{children}</GlobalContextProvider>
}

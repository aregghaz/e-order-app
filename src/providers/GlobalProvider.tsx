import { FC, PropsWithChildren } from 'react'

import { GlobalContextProvider } from '~contexts'
import { useMemo, useState } from '~hooks'
export const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
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
    }
  }, [name, setName, surname, setSurname, setUserData, userData, indicatorCount, setIndicatorCount])

  return <GlobalContextProvider value={value}>{children}</GlobalContextProvider>
}

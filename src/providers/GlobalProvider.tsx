import { FC, PropsWithChildren } from 'react'

import { GlobalContextProvider } from '~contexts'
import { useMemo, useState } from '~hooks'
export const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [name, setName] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [userData, setUserData] = useState<any>({})

  const value = useMemo(() => {
    return {
      name,
      setName,
      surname,
      setSurname,
      userData,
      setUserData,
    }
  }, [name, setName, surname, setSurname, setUserData, userData])

  return <GlobalContextProvider value={value}>{children}</GlobalContextProvider>
}

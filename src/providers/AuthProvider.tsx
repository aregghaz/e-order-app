import { FC, PropsWithChildren } from 'react'

import { SHOP_API } from '~api'
import { AuthContextProvider, AuthContextType } from '~contexts'
import { useCallback, useEffect, useMemo, useState } from '~hooks'
import { deleteToken, getToken, setToken } from '~services'
import { setUserData } from '~services/UserService'
import { SignUpFormValues } from '~types/authForms'
import { wait } from '~utils'
// import { Navigation } from '~navigation'
// import {SCREEN} from "~constants";
// import { useNavigation } from '@react-navigation/native';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null)

  useEffect(() => {
    const bootstrap = async () => {
      // TODO: This should be moved to backend calls, in this bootstrap function we should fetch user info and not token
      const token = await getToken()
      // console.log(!!token, '____ TOKEN ____')
      setIsSignedIn(!!token)
    }

    bootstrap()
  }, [])

  const signIn: AuthContextType['signIn'] = useCallback(async (data) => {
    ///  const navigation = useNavigation();

    // Errors are handled on UI side
    // if you want to stop this function with error just throw new Error.
    // Remember to pass readable error message for user, because this error will be displayed for him
    await wait(500)
    const res = await SHOP_API.signInRequest(data.phone, data.password)
    await setUserData(res.payload.user.customer)
    await setToken(res.payload.token.accessToken)
    /// navigation.navigate({key:"MainTab"})

    console.log(res.payload.user.customer, 'aaaa')
    setIsSignedIn(true)
  }, [])

  const signOut = useCallback(async () => {
    /*FIXME this request gives 401 status code*/
    // await SHOP_API.signOut();
    console.log('EXIT!!!!!!!!!')
    await deleteToken()
    setIsSignedIn(false)
  }, [])

  const signUp = useCallback(async (data: SignUpFormValues) => {
    // temporary solution
    await wait(500)
    setIsSignedIn(true)
  }, [])

  const value = useMemo(() => {
    return {
      isSignedIn,
      signIn,
      signOut,
      signUp,
    }
  }, [isSignedIn, signIn, signOut, signUp])

  return <AuthContextProvider value={value}>{children}</AuthContextProvider>
}

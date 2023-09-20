import { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

import { SHOP_API } from '~api'
import { AuthContextProvider, AuthContextType } from '~contexts'
import { useCallback, useEffect, useGlobal, useMemo, useState } from '~hooks'
import { deleteToken, getToken, setToken } from '~services'
import { deleteShopId, notification } from '~services/ShopService'
import { getUserData, setUserDataSecure } from "~services/UserService";
import { SignUpFormValues } from '~types/authForms'
import { wait } from '~utils'

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null)
  const { setUserData } = useGlobal()
  const { t } = useTranslation()

  useEffect(() => {
    const bootstrap = async () => {
      // TODO: This should be moved to backend calls, in this bootstrap function we should fetch user info and not token
      const token = await getToken()
      console.log(token, '____ TOKEN ____')
      setIsSignedIn(!!token)
    }

    bootstrap()
  }, [])

  const signIn: AuthContextType['signIn'] = useCallback(async (data) => {
    /// const navigation = useNavigation<any>();
    // Errors are handled on UI side
    // if you want to stop this function with error just throw new Error.
    // Remember to pass readable error message for user, because this error will be displayed for him
    await wait(500)
    const res = await SHOP_API.signInRequest(data.phone, data.password)
    ///console.log(res.payload.user.customer,res.payload.token.accessToken,'2222')
    // if (!res.payload.user.customer) {
    await setUserDataSecure(res.payload.user)
    // setUserData(res.payload.user)
    setUserData(await getUserData())
    await setToken(res.payload.token.accessToken)
    ///navigation.navigate(SCREEN.PROFILE_EDIT)
    setIsSignedIn(true)
    // } else {
    //   setUserData(res.payload.user)
    //   await setToken(res.payload.token.accessToken)
    //   setIsSignedIn(true)
    //   ///navigation.navigate(SCREEN.HOME_STACK)
    // }
  }, [])

  const signOut = useCallback(async () => {
    /*FIXME this request gives 401 status code*/
    await deleteShopId()
    await deleteToken()
    await SHOP_API.signOut()
    await notification(t('notification.success_logout'))
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
      setIsSignedIn,
    }
  }, [isSignedIn, signIn, signOut, signUp])

  return <AuthContextProvider value={value}>{children}</AuthContextProvider>
}

// import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { isError } from 'react-query'

import { useAuth } from '~hooks'
import { SignInFormValues } from '~types/authForms'

const defaultValues: SignInFormValues = {
  // TODO: Reset this values when building production app
  phone: '',
  password: '',
  confirm: false,
}

export const useSignInForm = () => {
  const { signIn } = useAuth()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useTranslation()
  const [phoneNumber, setPhoneNumber] = useState('')

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormValues>({
    mode: 'onTouched',
    defaultValues,
  })

  const onSubmit = async (data: SignInFormValues) => {
    const signInData = {
      phone: phoneNumber,
      password: data.password,
      confirm: data.confirm,
    }
    console.log(data, 'data in submit!!!!')
    console.log(signInData, 'signInData in submit!!!!')
    try {
      setIsSubmitting(true)
      setError('')
      await signIn(signInData)
    } catch (e) {
      console.log(e, '________________E_________________')
      if (isError(e)) {
        console.log(e.message, '________________E_MESSAGE_________________')
        setError(e.message)
      } else {
        setError(t('errors.something_went_wrong'))
      }
      /*** This was for vibrating ***/
      // await impactAsync(ImpactFeedbackStyle.Medium)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    submit: handleSubmit(onSubmit),
    isSubmitting,
    setIsSubmitting,
    control,
    errors,
    error,
    setPhoneNumber,
  }
}

/**
 * was created by tigran at 09.07.23
 */
import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'

interface IProps {
  route: any
  navigation: any
}

export const Verification: FC<IProps> = ({
  route: {
    params: { phone, duration, reset },
  },
  navigation,
}) => {
  // console.log(duration, 'duration!!!')
  const pin1ref = useRef<TextInput | null>(null)
  const pin2ref = useRef<TextInput | null>(null)
  const pin3ref = useRef<TextInput | null>(null)
  const pin4ref = useRef<TextInput | null>(null)

  const [pin1, setPin1] = useState('')
  const [pin2, setPin2] = useState('')
  const [pin3, setPin3] = useState('')
  const [pin4, setPin4] = useState('')
  const [countdown, setCountdown] = useState(duration)
  const { t } = useTranslation()

  useFocusEffect(
    useCallback(() => {
      setPin1('')
      setPin2('')
      setPin3('')
      setPin4('')
      setCountdown(duration)
    }, [])
  )
  const handleResend = async () => {
    const resend = await SHOP_API.resendConfirmation(phone)
    setCountdown(resend.payload.duration)
  }
  const handleVerify = async () => {
    const combineCode = pin1 + pin2 + pin3 + pin4
    if (combineCode.trim().length === 4) {
      const toNumberCode = Number(combineCode)
      const data = await SHOP_API.setVerificationCode(phone, toNumberCode)

      if (data && data.status === 200) {
        navigation.navigate(SCREEN.STACK_PASSWORD, {
          mobile: phone,
          token: toNumberCode,
          reset,
          typeData: false,
        })
      }
    }
  }

  const resendCode = async () => {
    if (countdown === 0) {
      setPin1('')
      setPin2('')
      setPin3('')
      setPin4('')
      await handleResend()
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [countdown])

  const formatCountdown = (countdown: number) => {
    const minutes = Math.floor(countdown / 60)
    const seconds = countdown % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <View style={styles.PhoneRegisterStack_wrapper}>
      <View style={styles.title_text__wrapper}>
        <Text style={styles.title_text}>{t('please_fill')}</Text>
        <Text style={styles.phone_number}>{phone}</Text>
      </View>
      <View style={styles.input_block}>
        <TextInput
          ref={pin1ref}
          style={styles.input}
          maxLength={1}
          keyboardType={'number-pad'}
          onChangeText={(pin) => {
            setPin1(pin)
            if (pin != '') {
              pin2ref.current?.focus()
            }
          }}
        />
        <TextInput
          ref={pin2ref}
          style={styles.input}
          maxLength={1}
          keyboardType={'number-pad'}
          onChangeText={(pin) => {
            setPin2(pin)
            if (pin != '') {
              pin3ref.current?.focus()
            } else {
              pin1ref.current?.focus()
            }
          }}
        />
        <TextInput
          ref={pin3ref}
          style={styles.input}
          maxLength={1}
          keyboardType={'number-pad'}
          onChangeText={(pin) => {
            setPin3(pin)
            if (pin != '') {
              pin4ref.current?.focus()
            } else {
              pin2ref.current?.focus()
            }
          }}
        />
        <TextInput
          ref={pin4ref}
          style={styles.input}
          maxLength={1}
          keyboardType={'number-pad'}
          onChangeText={(pin) => {
            setPin4(pin)
            if (pin === '') {
              pin3ref.current?.focus()
            }
          }}
        />
      </View>
      <CustomButton title={t('verify_code')} onPress={handleVerify} />
      <TouchableOpacity onPress={resendCode} style={styles.resend}>
        <Text style={styles.counter}>
          {countdown > 0 ? formatCountdown(countdown) : t('resend')}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const colors = {
  border: '#ddd',
  red: 'red',
  blue: 'blue',
}

const styles = StyleSheet.create({
  PhoneRegisterStack_wrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  counter: {
    padding: 10,
  },
  input: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    fontSize: 20,
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
    textAlign: 'center',
    width: 50,
  },
  input_block: {
    flexDirection: 'row',
  },
  phone_number: {
    color: colors.blue,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  resend: {
    borderColor: colors.border,
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 10,
  },
  title_text: {
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  title_text__wrapper: {
    alignItems: 'center',
    gap: 10,
    // ...customStyles.border(1, 'solid', colors.border),
    marginVertical: 20,
    width: '100%',
  },
})

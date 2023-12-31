/**
 * was created by tigran at 11.08.23
 */
import { useNavigation } from '@react-navigation/native'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import { ALERT_TYPE } from 'react-native-alert-notification'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'
import useLoading from '~hooks/useLoading'
import { notification } from '~services/ShopService'

export const CreateStoreScreen: FC = () => {
  const navigation = useNavigation<any>()
  /*shop*/
  const [shopName, setShopName] = useState('')
  const [shopNameError, setShopNameError] = useState('')
  /*tax*/
  const [tax, setTax] = useState('')
  const [taxError, setTaxError] = useState('')
  /*Company name*/
  const [companyName, setCompanyName] = useState('')
  const [companyNameError, setCompanyNameError] = useState('')
  /*** Legal address ***/
  const [legalAddress, setLegalAddress] = useState('')
  // const [legalAddressError, setLegalAddressError] = useState('')
  /*Legal Apt unit*/
  const [legalApartment, setLegalApartment] = useState('')
  const [legalApartmentError] = useState('')
  /*Legal Post Code */
  const [legalPostCode, setLegalPostCode] = useState('')
  const [legalPostCodeError] = useState('')
  /*Legal phone  1*/
  const [legalPhone_1, setLegalPhone_1] = useState('')
  const [legalPhoneError_1] = useState('')
  /*Legal phone 2*/
  const [legalPhone_2, setLegalPhone_2] = useState('')
  const [legalPhoneError_2] = useState('')
  /*** Delivery address ***/
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [deliveryAddressError, setDeliveryAddressError] = useState('')
  /*Legal Apt unit*/
  const [deliveryApartment, setDeliveryApartment] = useState('')
  const [deliveryApartmentError] = useState('')
  /*Legal Post Code */
  const [deliveryPostCode, setDeliveryPostCode] = useState('')
  const [deliveryPostCodeError] = useState('')
  /*Legal phone  1*/
  const [deliveryPhone_1, setDeliveryPhone_1] = useState('')
  const [deliveryPhoneError_1] = useState('')
  /*Legal phone 2*/
  const [deliveryPhone_2, setDeliveryPhone_2] = useState('')
  const [deliveryPhoneError_2] = useState('')

  const { t } = useTranslation()
  const { loading, startLoading, stopLoading } = useLoading()

  const handleSave = async () => {
    startLoading()
    let isValid = true

    if (shopName.trim() === '') {
      setShopNameError('Обязательное поле.')
      isValid = false
    }

    if (tax.trim() === '') {
      setTaxError('Обязательное поле.')
      isValid = false
    }
    if (companyName.trim() === '') {
      setCompanyNameError('Обязательное поле.')
      isValid = false
    }

    // if (legalAddress.trim() === '') {
    //   setLegalAddressError('Обязательное поле.')
    //   isValid = false
    // }

    if (deliveryAddress.trim() === '') {
      setDeliveryAddressError('Обязательное поле.')
      isValid = false
    }

    const body = {
      shopName,
      companyName,
      taxId: tax,
      legalAddress: {
        country: '',
        state: '',
        city: '',
        address_1: legalAddress,
        address_2: legalApartment,
        postCode: legalPostCode,
        phoneNumber1: legalPhone_1,
        phoneNumber2: legalPhone_2,
        gpsCoordinates: {
          latitude: '',
          longitude: '',
        },
      },
      deliveryAddress: {
        country: '',
        state: '',
        city: '',
        address_1: deliveryAddress,
        address_2: deliveryApartment,
        postCode: deliveryPostCode,
        phoneNumber1: deliveryPhone_1,
        phoneNumber2: deliveryPhone_2,
        gpsCoordinates: {
          latitude: '',
          longitude: '',
        },
      },
    }

    if (isValid) {
      try {
        const data = await SHOP_API.createShops(body)
        if (data) {
          stopLoading()
          await notification('Сохранено')
          navigation.navigate(SCREEN.DRAWER_ROOT, {
            screen: SCREEN.STACK_MAIN_TAB,
          })
        } else {
          stopLoading()
          await notification('SOMETHING WRONG', ALERT_TYPE.DANGER)
        }
      } catch (err) {
        stopLoading()
        console.log(err)
      } finally {
        stopLoading()
      }
    }
    stopLoading()
    resetValues()
  }

  const resetValues = () => {
    setShopName('')
    setTax('')
    setCompanyName('')
    setLegalAddress('')
    setLegalApartment('')
    setLegalPostCode('')
    setLegalPhone_1('')
    setLegalPhone_2('')
    setDeliveryAddress('')
    setDeliveryApartment('')
    setDeliveryPostCode('')
    setDeliveryPhone_1('')
    setDeliveryPhone_2('')
  }

  return (
    <ScrollView contentContainerStyle={styles.CreateStoreScreen_wrapper}>
      <View style={styles.innerWrapper}>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setShopName(value)
              setShopNameError(value.trim() === '' ? 'Обязательное поле.' : '')
            }}
            value={shopName}
            placeholder={t('store_name') + '*'}
          />
          <Text style={styles.errorText}>{shopNameError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setTax(value)
              setTaxError(value.trim() === '' ? 'Обязательное поле.' : '')
            }}
            value={tax}
            placeholder={t('inn')}
          />
          <Text style={styles.errorText}>{taxError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setCompanyName(value)
              setCompanyNameError(value.trim() === '' ? 'Обязательное поле.' : '')
            }}
            value={companyName}
            placeholder={t('company_name__alt')}
          />
          <Text style={styles.errorText}>{companyNameError}</Text>
        </>
        <Text style={styles.title}>{t('legal_address')}</Text>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setLegalAddress(value)
              // setLegalAddressError(value.trim() === '' ? 'Обязательное поле.' : '')
            }}
            value={legalAddress}
            placeholder={t('address')}
          />
          <Text style={styles.errorText}></Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={setLegalApartment}
            value={legalApartment}
            placeholder={t('apartment')}
          />
          <Text style={styles.errorText}>{legalApartmentError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={setLegalPostCode}
            value={legalPostCode}
            placeholder={t('postcode')}
          />
          <Text style={styles.errorText}>{legalPostCodeError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={setLegalPhone_1}
            value={legalPhone_1}
            placeholder={t('phone')}
          />
          <Text style={styles.errorText}>{legalPhoneError_1}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={setLegalPhone_2}
            value={legalPhone_2}
            placeholder={t('alt_phone')}
          />
          <Text style={styles.errorText}>{legalPhoneError_2}</Text>
        </>
        <Text style={styles.title}>{t('delivery_address')}</Text>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setDeliveryAddress(value)
              setDeliveryAddressError(value.trim() === '' ? 'Обязательное поле.' : '')
            }}
            value={deliveryAddress}
            placeholder={t('address') + '*'}
          />
          <Text style={styles.errorText}>{deliveryAddressError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={setDeliveryApartment}
            value={deliveryApartment}
            placeholder={t('apartment')}
          />
          <Text style={styles.errorText}>{deliveryApartmentError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={setDeliveryPostCode}
            value={deliveryPostCode}
            placeholder={t('postcode')}
          />
          <Text style={styles.errorText}>{deliveryPostCodeError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={setDeliveryPhone_1}
            value={deliveryPhone_1}
            placeholder={t('phone')}
          />
          <Text style={styles.errorText}>{deliveryPhoneError_1}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={setDeliveryPhone_2}
            value={deliveryPhone_2}
            placeholder={t('alt_phone')}
          />
          <Text style={styles.errorText}>{deliveryPhoneError_2}</Text>
        </>
        <CustomButton loading={loading} title={t('buttons.create')} onPress={handleSave} />
      </View>
    </ScrollView>
  )
}

const colors = {
  border: '#ddd',
  red: 'red',
}

const styles = StyleSheet.create({
  CreateStoreScreen_wrapper: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: colors.red,
    marginBottom: 5,
  },
  innerWrapper: {
    paddingVertical: 20,
  },
  input: {
    borderColor: colors.border,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 10,

    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    // marginTop: 20
  },
})

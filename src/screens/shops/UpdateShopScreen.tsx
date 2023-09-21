/**
 * was created by tigran at 11.08.23
 */
import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, StyleSheet, ScrollView, TextInput, ActivityIndicator } from 'react-native'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
// import { SCREEN } from '~constants'
import useLoadingState from '~hooks/useLoading'
import { notification } from '~services/ShopService'

export const UpdateShopScreen: FC = ({ route }: any) => {
  const id = route.params
  // const navigation = useNavigation<any>()
  const { t } = useTranslation()
  const { loading, startLoading, stopLoading } = useLoadingState()
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
  const [laoding, setLoading] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        setLoading(false)
        const data = await SHOP_API.getShop(id)
        setTax(data.payload.taxId)
        setShopName(data.payload.shopName)
        setCompanyName(data.payload.companyName)
        setLegalAddress(data.payload.legalAddress.address_1)
        setLegalApartment(data.payload.legalAddress.address_2)
        setLegalPostCode(data.payload.legalAddress.postCode)
        setLegalPhone_1(data.payload.legalAddress.phoneNumber1)
        setLegalPhone_2(data.payload.legalAddress.phoneNumber2)
        setDeliveryAddress(data.payload.deliveryAddress.address_1)
        setDeliveryApartment(data.payload.deliveryAddress.address_2)
        setDeliveryPostCode(data.payload.deliveryAddress.postCode)
        setDeliveryPhone_1(data.payload.deliveryAddress.phoneNumber1)
        setDeliveryPhone_2(data.payload.deliveryAddress.phoneNumber2)
        setLoading(true)
      }
      getData()
    }, [id])
  )
  const errorFieldMessage = t('form.required')

  const handleSave = async () => {
    startLoading()
    let isValid = true

    if (shopName.trim() === '') {
      setShopNameError(errorFieldMessage)
      isValid = false
    }

    if (tax.trim() === '') {
      setTaxError(errorFieldMessage)
      isValid = false
    }
    if (companyName.trim() === '') {
      setCompanyNameError(errorFieldMessage)
      isValid = false
    }

    // if (legalAddress.trim() === '') {
    //   setLegalAddressError(errorFieldMessage)
    //   isValid = false
    // }

    if (deliveryAddress.trim() === '') {
      setDeliveryAddressError(errorFieldMessage)
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
        await SHOP_API.updateShops(id, body)
        await notification('Обновлено')
        // navigation.navigate(SCREEN.DRAWER_ROOT, {
        //   screen: SCREEN.STACK_MAIN_TAB,
        // })
      } catch (err) {
        console.log(err)
      } finally {
        stopLoading()
      }
    }
    stopLoading()
  }

  return laoding ? (
    <ScrollView contentContainerStyle={styles.CreateStoreScreen_wrapper}>
      <View style={styles.innerWrapper}>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setShopName(value)
              setShopNameError(value.trim() === '' ? errorFieldMessage : '')
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
              setTaxError(value.trim() === '' ? errorFieldMessage : '')
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
              setCompanyNameError(value.trim() === '' ? errorFieldMessage : '')
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
              // setLegalAddressError(value.trim() === '' ? errorFieldMessage : '')
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
              setDeliveryAddressError(value.trim() === '' ? errorFieldMessage : '')
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
        <CustomButton loading={loading} title={t('common.save')} onPress={handleSave} />
      </View>
    </ScrollView>
  ) : (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: colors.red,
    marginBottom: 5,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
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

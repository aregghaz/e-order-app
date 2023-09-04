import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'
import { notification } from '~services/ShopService'
import { getUserData } from '~services/UserService'
import { timestampToDate, checkAge } from '~utils/dateTimeFormat'

export const ProfileEditScreen: FC = ({ route }: any) => {
  const { type } = route.params
  const navigation = useNavigation<any>()

  // const [validAge, setValidAge] = useState(false);

  /*Name*/
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [lastname, setLastName] = useState('')
  const [lastnameError, setLastNameError] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [fatherNameError, setFatherNameError] = useState('')
  /* dob*/
  const [dob, setDob] = useState('')
  const [dobError, setDobError] = useState('')

  /*** Legal address ***/
  const [legalAddress, setLegalAddress] = useState('')
  const [legalAddressError, setLegalAddressError] = useState('')
  /*Legal Apt unit*/
  const [legalApartment, setLegalApartment] = useState('')
  // const [legalApartmentError, setlLegalApartmentError] = useState('')
  /*Legal Post Code */
  const [legalPostCode, setLegalPostCode] = useState('')
  ///  const [legalPostCodeError, setLegalPostCodeError] = useState('')
  /*Legal phone  1*/
  const [legalPhone_1, setLegalPhone_1] = useState('')
  ///  const [legalPhoneError_1, setLegalPhoneError_1] = useState('')
  /*Legal phone 2*/
  ///  const [legalPhone_2, setLegalPhone_2] = useState('')
  /// const [legalPhoneError_2] = useState('')

  /*passport data */
  const [cityzen, setCityzen] = useState('')
  const [cityzenError, setCityzenError] = useState('')
  const [passport, setPassport] = useState('')
  /// const [passportError, setpPassportError] = useState('')
  const [whoGive, setWhoGive] = useState('')
  const [whoGiveError, setWhoGiveError] = useState('')
  const [expireData, setExpireData] = useState('')
  /// const [expireDataError, setExpireDataError] = useState('')

  const [iih, setIih] = useState('')
  const [iihError, setIihError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  useFocusEffect(
    useCallback(() => {
      const getAsyncData = async (): Promise<void> => {
        const pesdonalData = await getUserData()
        console.log(pesdonalData, '324324')
        if (pesdonalData.customer) {
          setId(pesdonalData.customer.id)
          setName(pesdonalData.customer.person.firstName)
          setLastName(pesdonalData.customer.person.lastName)
          setFatherName(pesdonalData.customer.person.fatherName)
          setDob(pesdonalData.customer.person.birthDate)
          setLegalAddress(pesdonalData.customer.person.address.address_1)
          setLegalApartment(pesdonalData.customer.person.address.address_2)
          setLegalPostCode(pesdonalData.customer.person.address.postCode)
          setLegalPhone_1(pesdonalData.customer.person.address.phoneNumber1)
          setCityzen(pesdonalData.customer.person.citizenship.citizenship)
          setPassport(pesdonalData.customer.person.citizenship.passport)
          setWhoGive(pesdonalData.customer.person.citizenship.issuedBy)
          setExpireData(pesdonalData.customer.person.citizenship.issueDate)
          setIih(pesdonalData.customer.person.inn)
          setEmail(pesdonalData.customer.person.email)
        }
      }
      if (type) {
        getAsyncData()
      }
    }, [])
  )
  const handleSave = async () => {
    let isValid = true

    if (name.trim() === '') {
      setNameError('Обязательное поле.')
      isValid = false
    }
    if (lastname.trim() === '') {
      setLastNameError('Обязательное поле.')
      isValid = false
    }

    // if (dob.trim() === '') {
    //   setDobError('Обязательное поле.')
    //   isValid = false
    // }

    // const validAge = checkAge(dob)
    // console.log(validAge,'validAgevalidAge')
    // if (validAge < 18) {
    //   setDobError('Bам не 18.')
    //   isValid = false
    // }

    if (iih.trim() === '') {
      setIihError('Обязательное поле.')
      isValid = false
    }
    if (email.trim() === '') {
      setEmailError('Обязательное поле.')
      isValid = false
    }

    // if (whoGive.trim() === '') {
    //   setWhoGiveError('Обязательное поле.')
    //   isValid = false
    // }

    const body = {
      firstName: name,
      lastName: lastname,
      fatherName,
      address: {
        country: 'Armenia',
        state: 'Yerevan',
        city: 'Yerevan',
        address_1: legalAddress,
        address_2: legalApartment,
        postCode: legalPostCode,
        phoneNumber1: legalPhone_1,
        ///phoneNumber2: legalPhone_2,
        gpsCoordinates: { latitude: 53.46114099999999, longitude: -2.245531 },
      },
      inn: iih,
      birthDate: dob,
      citizenship: {
        citizenship: cityzen,
        passport,
        issuedBy: whoGive,
        issueDate: expireData,
        // "passportPhoto": [
        //     {
        //         "id": "string",
        //         "originalName": "string",
        //         "filename": "string",
        //         "path": "string",
        //         "mimetype": "string",
        //         "size": 0,
        //         "order": 0,
        //         "createdAt": "2023-08-25T09:12:24.462Z",
        //         "updatedAt": "2023-08-25T09:12:24.462Z"
        //     }
        // ]
      },
      email,
      // "photo": {
      //     "id": "string",
      //     "originalName": "string",
      //     "filename": "string",
      //     "path": "string",
      //     "mimetype": "string",
      //     "size": 0,
      //     "order": 0,
      //     "createdAt": "2023-08-25T09:12:24.462Z",
      //     "updatedAt": "2023-08-25T09:12:24.462Z"
      // }
    }
    ///console.log(isValid,type,id,'111111')
    console.log(type, isValid, '1111111111111')
    if (isValid) {
      if (type) {
        await SHOP_API.updateCustomerUser(body, id)
      } else {
        const asd = await SHOP_API.fillingCustomerUser(body)
        console.log(asd, '11111')
      }
      notification('Сохранено')
      navigation.navigate(SCREEN.DRAWER_ROOT, {
        screen: SCREEN.STACK_MAIN_TAB,
      })
    }
    // resetValues()
  }
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: any) => {
    setDob(date)
    hideDatePicker()
  }
  // const resetValues = () => {
  //   // setShopName('')
  //   // setTax('')
  //   // setCompanyName('')
  //   // setLegalAddress('')
  //   // setLegalApartment('')
  //   // setLegalPostCode('')
  //   // setLegalPhone_1('')
  //   // setLegalPhone_2('')
  //   // setDeliveryAddress('')
  //   // setDeliveryApartment('')
  //   // setDeliveryPostCode('')
  //   // setDeliveryPhone_1('')
  //   // setDeliveryPhone_2('')
  // }

  return (
    <ScrollView contentContainerStyle={styles.CreateStoreScreen_wrapper}>
      <View style={styles.innerWrapper}>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setName(value)
              setNameError(value.trim() === '' ? 'Обязательное поле.' : '')
            }}
            value={name}
            placeholder="Имя*"
          />
          <Text style={styles.errorText}>{nameError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setLastName(value)
              setLastNameError(value.trim() === '' ? 'Обязательное поле.' : '')
            }}
            value={lastname}
            placeholder="Фамилия*"
          />
          <Text style={styles.errorText}>{lastnameError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setFatherName(value)
              setFatherNameError(value.trim() === '' ? 'Обязательное поле.' : '')
            }}
            value={fatherName}
            placeholder="Отчество"
          />
          <Text style={styles.errorText}>{fatherNameError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setDobError(value.trim() === '' ? 'Обязательное поле.' : '')
            }}
            onPressIn={showDatePicker}
            value={timestampToDate(dob)}
            editable={false}
            placeholder="Дата рождения"
          />

          <Text style={styles.errorText}>{dobError}</Text>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(date) => handleConfirm(date)}
            onCancel={hideDatePicker}
          />
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setLegalAddress(value)
              setLegalAddressError(value.trim() === '' ? 'Обязательное поле.' : '')
            }}
            value={legalAddress}
            placeholder="Адрес*"
          />
          <Text style={styles.errorText}>{legalAddressError}</Text>
        </>
        <View style={styles.inputsContainer}>
          <>
            <TextInput
              style={styles.input}
              onChangeText={setLegalApartment}
              value={legalApartment}
              placeholder="Квартира, блок, здание, этаж и т. д."
            />
            {/*<Text style={styles.errorText}>{legalApartmentError}</Text>*/}
          </>
          <>
            <TextInput
              style={styles.input}
              onChangeText={setLegalPostCode}
              value={legalPostCode}
              placeholder="Почтовый индекс"
            />
            {/*<Text style={styles.errorText}>{legalPostCodeError}</Text>*/}
          </>
          <>
            <TextInput
              style={styles.input}
              onChangeText={setLegalPhone_1}
              value={legalPhone_1}
              placeholder="Номер телефона"
            />
            {/*<Text style={styles.errorText}>{legalPhoneError_1}</Text>*/}
          </>
        </View>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setCityzen(value)
              setCityzenError(value.trim() === '' ? 'Обязательное поле.' : '')
            }}
            value={cityzen}
            placeholder="Гражданство"
          />
          <Text style={styles.errorText}>{cityzenError}</Text>
        </>
        <View style={styles.inputsContainer}>
          <>
            <TextInput
              style={styles.input}
              onChangeText={setPassport}
              value={passport}
              placeholder="Номер паспорта"
            />
            {/*<Text style={styles.errorText}>{passportError}</Text>*/}
          </>
          <>
            <TextInput
              style={styles.input}
              onChangeText={setExpireData}
              value={expireData}
              placeholder="Дата выдачи паспорта"
            />
            {/*<Text style={styles.errorText}>{expireDataError}</Text>*/}
          </>
          <>
            <TextInput
              style={styles.input}
              onChangeText={setWhoGive}
              value={whoGive}
              placeholder="Орган, выдавший документ"
            />
            {/*<Text style={styles.errorText}>{whoGiveError}</Text>*/}
          </>
        </View>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setIih(value)
              setIihError(value.trim() === '' ? 'Обязательное поле.' : '')
            }}
            value={iih}
            placeholder="IIh*"
          />
          <Text style={styles.errorText}>{iihError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setEmail(value)
              setEmailError(value.trim() === '' ? 'Обязательное поле.' : '')
            }}
            value={email}
            placeholder="Адрес электронной почты"
          />
          <Text style={styles.errorText}>{emailError}</Text>
        </>
        <CustomButton title=" Сохранить " onPress={handleSave} />
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
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  date_wrapper: {
    width: '100%',
  },
  errorText: {
    color: colors.red,
    marginBottom: 5,
  },
  innerWrapper: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
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

  inputsContainer: {
    flexDirection: 'column',
    gap: 20,
    paddingBottom: 15,
    width: '100%',
  },
})

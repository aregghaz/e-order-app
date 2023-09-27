import { useFocusEffect } from '@react-navigation/native'
import moment from 'moment'
import React, { FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
// import { SCREEN } from '~constants'
import { useAuth, useGlobal } from '~hooks'
import { notification } from '~services/ShopService'
// import { getUserData } from '~services/UserService'
import { checkAge, timestampToDate } from '~utils/dateTimeFormat'
import { customStyles } from '~utils/style_helpers'
import { getUserData } from '~services/UserService'
// import { setUserDataSecure } from '~services/UserService'

const colors = {
  border: '#ddd',
  red: 'red',
  white: 'white',
}
export const ProfileEditScreen: FC = ({ route }: any) => {
  const { typeData } = route.params
  const { t } = useTranslation()
  const { isSignedIn } = useAuth()
  const { userData, setUserData } = useGlobal()

  /*Name*/
  const [id, setId] = useState('')
  const [type, setType] = useState(isSignedIn)
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [lastname, setLastName] = useState('')
  const [lastnameError, setLastNameError] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [fatherNameError, setFatherNameError] = useState('')
  /* dob*/
  const [dob, setDob] = useState<any>('')
  const [dobError, setDobError] = useState('')

  /*** Legal address ***/
  const [legalAddressError, setLegalAddressError] = useState('')
  /*Legal Apt unit*/
  const [legalApartment, setLegalApartment] = useState('')
  /*Legal Post Code */
  const [legalPostCode, setLegalPostCode] = useState('')
  /*Legal phone  1*/
  const [legalPhone_1, setLegalPhone_1] = useState('')
  /*Legal phone 2*/

  /*passport data */
  const [cityzen, setCityzen] = useState('')
  const [cityzenError, setCityzenError] = useState('')
  const [passport, setPassport] = useState('')
  const [whoGive, setWhoGive] = useState('')
  const [expireData, setExpireData] = useState('')
  const [iih, setIih] = useState('')
  const [email, setEmail] = useState('')
  const [latloang, setLatloang] = useState({ latitude: '', longitude: '' })
  const [locationa, setLocation] = useState({ contry: '', state: '', city: '', address: '' })

  useFocusEffect(
    useCallback(() => {
      const getAsyncData = async (): Promise<void> => {
        const userInfo = await getUserData()
        if (userInfo) {
          const customerData = await SHOP_API.getCustomer(userInfo.id)
          const dataUser = customerData.payload
          setLocation({
            contry: dataUser.person.address.country,
            state: dataUser.person.address.city,
            city: dataUser.person.address.city,
            address: dataUser.person.address.address_1,
          })
          setLatloang({
            latitude: dataUser.person.address.gpsCoordinates.latitude,
            longitude: dataUser.person.address.gpsCoordinates.longitude,
          })
          setId(dataUser.id)
          setName(dataUser.person.firstName)
          setLastName(dataUser.person.lastName)
          setFatherName(dataUser.person.fatherName)
          setDob(dataUser.person.birthDate)
          setLegalApartment(dataUser.person.address.address_2)
          setLegalPostCode(dataUser.person.address.postCode)
          setLegalPhone_1(dataUser.person.address.phoneNumber1)
          setCityzen(dataUser.person.citizenship.citizenship)
          setPassport(dataUser.person.citizenship.passport)
          setWhoGive(dataUser.person.citizenship.issuedBy)
          setExpireData(dataUser.person.citizenship.issueDate)
          setIih(dataUser.person.inn)
          setEmail(dataUser.person.email)
          setType(true)
        } else {
          setType(false)
        }
      }

      if (typeData === false) {
        resetValues()
      } else {
        getAsyncData()
      }
    }, [userData])
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
    if (locationa.address.trim() === '') {
      setLegalAddressError('Обязательное поле.')
      isValid = false
    }

    const body = {
      firstName: name,
      lastName: lastname,
      fatherName,
      address: {
        country: locationa.contry,
        state: locationa.state,
        city: locationa.city,
        address_1: locationa.address,
        address_2: legalApartment,
        postCode: legalPostCode,
        phoneNumber1: legalPhone_1,
        phoneNumber2: '',
        gpsCoordinates: latloang,
      },
      inn: iih,
      birthDate: dob,
      citizenship: {
        citizenship: cityzen,
        passport,
        issuedBy: whoGive,
        issueDate: expireData,
      },
      email,
    }
    if (isValid) {
      let dataCheck
      if (type) {
        dataCheck = await SHOP_API.updateCustomerUser(body, id)
      } else {
        dataCheck = await SHOP_API.fillingCustomerUser(body)
      }

      if (dataCheck) {
        console.log(dataCheck, 'DATACHECK!!!!!!!!!!!!')
        const parsedDataCheck = JSON.parse(JSON.stringify(dataCheck.payload.person))
        const parsedUserData = JSON.parse(JSON.stringify(userData))
        const combinedObj = {
          ...parsedUserData,
          customer: { ...parsedUserData.customer, person: parsedDataCheck },
        }
        // await setUserDataSecure(res.payload.user)
        setUserData(combinedObj)
        await notification('Сохранено')
        // navigate(SCREEN.DRAWER_ROOT)
      }
    }
  }
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: any) => {
    const validAge = checkAge(date)
    if (validAge < 18) {
      setDobError(t('form.under18'))
      hideDatePicker()
    } else {
      setDobError('')
      setDob(date)
      hideDatePicker()
    }
  }
  const resetValues = () => {
    const momentDate = new Date(moment().subtract(18, 'years').toDate())
    setId('')
    setName('')
    setLastName('')
    setFatherName('')
    setDob(momentDate)
    setLegalApartment('')
    setLegalPostCode('')
    setLegalPhone_1('')
    setCityzen('')
    setPassport('')
    setWhoGive('')
    setExpireData('')
    setIih('')
    setEmail('')
  }
  return (
    <SafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.CreateStoreScreen_wrapper}
      >
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
            <TouchableOpacity style={styles.input} onPressIn={showDatePicker}>
              <TextInput
                onChangeText={(value) => {
                  setDobError(value.trim() === '' ? 'Обязательное поле.' : '')
                }}
                onPressIn={showDatePicker}
                value={timestampToDate(dob)}
                editable={false}
                placeholder="Дата рождения"
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(date: any) => handleConfirm(date)}
              onCancel={hideDatePicker}
            />
            <Text style={styles.errorText}>{dobError}</Text>
          </>
          <>
            <GooglePlacesAutocomplete
              GooglePlacesDetailsQuery={{
                fields: 'geometry',
              }}
              placeholder="Адрес"
              textInputProps={{
                autoFocus: true,
                placeholder: locationa.address + ' ' + locationa.city + ' ' + locationa.contry,
              }}
              onPress={(data: any, details: any = null) => {
                setLocation({
                  contry: data.terms[2].value,
                  state: data.terms[1].value,
                  city: data.terms[1].value,
                  address: data.terms[0].value,
                })
                setLatloang({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                })
              }}
              fetchDetails={true}
              styles={{
                textInputContainer: {
                  width: '100%',
                  alignSelf: 'center',
                },
                textInput: {
                  ...customStyles.border(1, 'solid', colors.border),
                  borderRadius: 5,
                  height: 48,
                  paddingBottom: 8,
                  fontSize: 16,
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              query={{
                fields: 'geometry',
                key: 'AIzaSyBKkr76ZgeVEhZLj-ZT5u8XQBbT4SUQI5E',
                language: 'en',
              }}
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
              }}
              value={iih}
              placeholder="IIh"
            />
            <Text style={styles.errorText}></Text>
          </>
          <>
            <TextInput
              style={styles.input}
              onChangeText={(value) => {
                setEmail(value)
              }}
              value={email}
              placeholder="Адрес электронной почты"
            />
            <Text style={styles.errorText}></Text>
          </>
          <CustomButton title=" Сохранить " onPress={handleSave} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  CreateStoreScreen_wrapper: {
    justifyContent: 'center',
    paddingHorizontal: 20,
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
    ...customStyles.border(1, 'solid', colors.border),
    backgroundColor: colors.white,
    borderRadius: 5,
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

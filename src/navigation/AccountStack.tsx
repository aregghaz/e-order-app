/**
 * was created by tigran at 26.07.23
 */
import React, { FC, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { CustomButton } from '~components/molecules/CustomButton'

interface IProps {
  route?: any
  navigation?: any
}

export const AccountStack: FC<IProps> = ({ route, navigation }) => {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [lastName, setLastName] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [fatherNameError] = useState('')
  const [address, setAddress] = useState('')
  const [addressError, setAddressError] = useState('')
  const [apartment, setApartment] = useState('')
  const [apartmentError] = useState('')
  const [postCode, setPostCode] = useState('')
  const [postCodeError] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneError] = useState('')
  const [second_phone, setSecond_phone] = useState('')
  const [second_phoneError] = useState('')
  const [citizen, setCitizen] = useState('')
  const [citizenError, setCitizenError] = useState('')
  const [passport, setPassport] = useState('')
  const [passportError, setPassportError] = useState('')
  const [issuedBy, setIssuedBy] = useState('')
  const [issuedByError, setIssuedByError] = useState('')
  const [INN, setINN] = useState('')
  const [INNError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError] = useState('')

  const handleSave = async () => {
    let isValid = true

    if (name.trim() === '') {
      setNameError('this field is required')
      isValid = false
    }
    if (lastName.trim() === '') {
      setLastNameError('this field is required')
      isValid = false
    }
    if (address.trim() === '') {
      setAddressError('this field is required')
      isValid = false
    }
    if (citizen.trim() === '') {
      setCitizenError('this field is required')
      isValid = false
    }
    if (passport.trim() === '') {
      setPassportError('this field is required')
      isValid = false
    }
    if (issuedBy.trim() === '') {
      setIssuedByError('this field is required')
      isValid = false
    }
    const body = {
      firstName: name,
      lastName,
      fatherName,
      address: {
        country: '',
        state: '',
        city: '',
        address_1: '',
        address_2: '',
        postCode,
        phoneNumber1: phone,
        phoneNumber2: second_phone,
        gpsCoordinates: {
          latitude: '',
          longitude: '',
        },
      },
      inn: INN,
      birthDate: '',
      citizenship: {
        citizenship: citizen,
        passport,
        issuedBy,
        issueDate: '',
        passportPhoto: [],
        email,
        photo: {},
      },
    }

    if (isValid) {
      alert('saved')
      try {
        console.log(body, '___BODY')
        // const data = await SHOP_API.createCustomerAccount(body)
        // navigation.navigate(SCREEN.STACK_SIGN_IN);
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.AccountStack_wrapper}>
      <View style={styles.innerWrapper}>
        <Text style={styles.title}>Edit Profile</Text>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setName(value)
              setNameError(value.trim() === '' ? 'this field is required' : '')
            }}
            value={name}
            placeholder="First Name*"
          />
          <Text style={styles.errorText}>{nameError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setLastName(value)
              setLastNameError(value.trim() === '' ? 'this field is required' : '')
            }}
            value={lastName}
            placeholder="Last Name*"
          />
          <Text style={styles.errorText}>{lastNameError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={setFatherName}
            value={fatherName}
            placeholder="Father Name"
          />
          <Text style={styles.errorText}>{fatherNameError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setAddress(value)
              setAddressError(value.trim() === '' ? 'this field is required' : '')
            }}
            value={address}
            placeholder="Address*"
          />
          <Text style={styles.errorText}>{addressError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={setApartment}
            value={apartment}
            placeholder="Apt, unit, building, floor, etc."
          />
          <Text style={styles.errorText}>{apartmentError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={setPostCode}
            value={postCode}
            placeholder="Post Code"
          />
          <Text style={styles.errorText}>{postCodeError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={setPhone}
            value={phone}
            placeholder="Phone Number"
          />
          <Text style={styles.errorText}>{phoneError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={setSecond_phone}
            value={second_phone}
            placeholder="Secondary Phone Number"
          />
          <Text style={styles.errorText}>{second_phoneError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setCitizen(value)
              setCitizenError(value.trim() === '' ? 'this field is required' : '')
            }}
            value={citizen}
            placeholder="Citizenship*"
          />
          <Text style={styles.errorText}>{citizenError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setPassport(value)
              setPassportError(value.trim() === '' ? 'this field is required' : '')
            }}
            value={passport}
            placeholder="Passport Number*"
          />
          <Text style={styles.errorText}>{passportError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setIssuedBy(value)
              setIssuedByError(value.trim() === '' ? 'this field is required' : '')
            }}
            value={issuedBy}
            placeholder="Issued By*"
          />
          <Text style={styles.errorText}>{issuedByError}</Text>
        </>
        <>
          <TextInput style={styles.input} onChangeText={setINN} value={INN} placeholder="INN" />
          <Text style={styles.errorText}>{INNError}</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email Address"
          />
          <Text style={styles.errorText}>{emailError}</Text>
        </>
        <CustomButton title="Save" onPress={handleSave} />
      </View>
    </ScrollView>
  )
}

const colors = {
  border: '#ddd',
  red: 'red',
}

const styles = StyleSheet.create({
  AccountStack_wrapper: {
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
    // marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
})

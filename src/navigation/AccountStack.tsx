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
  const [lastName, setLastName] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [address, setAddress] = useState('')
  const [apartment, setApartment] = useState('')
  const [postCode, setPostCode] = useState('')
  const [phone, setPhone] = useState('')
  const [second_phone, setSecond_phone] = useState('')
  const [citizen, setCitizen] = useState('')
  const [passport, setPassport] = useState('')
  const [issuedBy, setIssuedBy] = useState('')
  const [INN, setINN] = useState('')
  const [email, setEmail] = useState('')
  return (
    <ScrollView contentContainerStyle={styles.AccountStack_wrapper}>
      <View style={styles.innerWrapper}>
        <Text style={styles.title}>Edit Profile</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="First Name*"
        />
        <TextInput
          style={styles.input}
          onChangeText={setLastName}
          value={lastName}
          placeholder="Last Name*"
        />
        <TextInput
          style={styles.input}
          onChangeText={setFatherName}
          value={fatherName}
          placeholder="Father Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={setAddress}
          value={address}
          placeholder="Address*"
        />
        <TextInput
          style={styles.input}
          onChangeText={setApartment}
          value={apartment}
          placeholder="Apt, unit, building, floor, etc."
        />
        <TextInput
          style={styles.input}
          onChangeText={setPostCode}
          value={postCode}
          placeholder="Post Code"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPhone}
          value={phone}
          placeholder="Phone Number"
        />
        <TextInput
          style={styles.input}
          onChangeText={setSecond_phone}
          value={second_phone}
          placeholder="Secondary Phone Number"
        />
        <TextInput
          style={styles.input}
          onChangeText={setCitizen}
          value={citizen}
          placeholder="Citizenship*"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassport}
          value={passport}
          placeholder="Passport Number*"
        />
        <TextInput
          style={styles.input}
          onChangeText={setIssuedBy}
          value={issuedBy}
          placeholder="Issued By*"
        />
        <TextInput style={styles.input} onChangeText={setINN} value={INN} placeholder="INN" />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email Address"
        />
        <CustomButton title="Save" onPress={() => null} />
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
  innerWrapper: {
    paddingVertical: 20,
  },
  input: {
    borderColor: colors.border,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
})

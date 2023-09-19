/**
 * was created by tigran at 23.06.23
 */

import { Text, View } from 'native-base'
import React, { FC, useState } from 'react'
import { ScrollView, TextInput, StyleSheet } from 'react-native'

import { CustomButton } from '~components/molecules/CustomButton'
import { customStyles } from '~utils/style_helpers'

export const ContactScreen: FC = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const handleSendMessage = () => {
    const messageObj = {
      name,
      email,
      phone,
      message,
    }
    // console.log(messageObj, '___ Message')
  }
  return (
    <View style={styles.contact_wrapper}>
      <ScrollView>
        <View style={styles.inner_wrapper}>
          <Text style={styles.contact_wrapper_title}>Drop us a Line</Text>
          <View style={styles.divider} />
          <View>
            <Text style={styles.fields}>Enter Name</Text>
            <TextInput
              onChangeText={setName}
              value={name}
              style={[styles.input, styles.input_options]}
            />
          </View>
          <View>
            <Text style={styles.fields}>Enter Email</Text>
            <TextInput
              onChangeText={setEmail}
              value={email}
              style={[styles.input, styles.input_options]}
            />
          </View>
          <View>
            <Text style={styles.fields}>Phone Number</Text>
            <TextInput
              keyboardType={'phone-pad'}
              onChangeText={setPhone}
              value={phone}
              style={[styles.input, styles.input_options]}
            />
          </View>
          <View>
            <Text style={styles.fields}>Message</Text>
            <TextInput
              numberOfLines={7}
              multiline={true}
              onChangeText={setMessage}
              value={message}
              style={[styles.input, styles.textarea]}
            />
          </View>
          <View style={styles.button}>
            <CustomButton onPress={handleSendMessage} title="Send" />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
const colors = {
  grey: '#F8F9FA',
  border: '#dee2e6',
}
const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  contact_wrapper: {
    flex: 1,
    padding: 20,
  },
  contact_wrapper_title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: colors.border,
    height: 1,
    marginTop: 20,
    width: '100%',
  },
  fields: {
    marginVertical: 20,
  },
  inner_wrapper: {
    borderRadius: 8,
    padding: 20,
    ...customStyles.border(1, 'solid', colors.border),
  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 10,
    ...customStyles.border(1, 'solid', colors.border),
  },
  input_options: {
    height: 40,
  },
  textarea: {
    padding: 10,
    textAlignVertical: 'top',
  },
})

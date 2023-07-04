/**
 * was created by tigran at 23.06.23
 */

import { Text, View } from 'native-base'
import React, { FC } from 'react'
import { ScrollView, TextInput, StyleSheet } from 'react-native'

export const ContactScreen: FC = () => {
  return (
    <View style={styles.contact_wrapper}>
      <ScrollView>
        <View style={styles.inner_wrapper}>
          <Text style={styles.contact_wrapper_title}>Drop us a Line</Text>
          <View style={styles.divider} />
          <Text style={styles.fields}>Enter Name</Text>
          <TextInput style={[styles.input, styles.input_options]} />
          <Text style={styles.fields}>Enter Email</Text>
          <TextInput style={[styles.input, styles.input_options]} />
          <Text style={styles.fields}>Phone Number</Text>
          <TextInput style={[styles.input, styles.input_options]} />
          <Text style={styles.fields}>Message</Text>
          <TextInput style={styles.input} multiline={true} numberOfLines={7} />
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
    borderColor: colors.border,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 20,
  },
  input: {
    borderColor: colors.border,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  input_options: {
    height: 40,
  },
})

/**
 * was created by tigran at 23.06.23
 */

import { Feather } from '@expo/vector-icons'
import { Text, View, ScrollView, Image } from 'native-base'
import React, { FC, useState } from 'react'
import { StyleSheet } from 'react-native'

import { fakeData } from '~FakeData'

// interface IProps {
//   address: IAddress
//   birthDate: string
//   citizenship: string
//   email: string
//   fatherName: string
//   firstName: string
//   inn: string
//   issueDate: string
//   issuedBy: string
//   lastName: string
//   passport: string
// }
//
// interface IAddress {
//   address_1: string,
//   address_2: string,
//   city: string,
//   country: string,
//   gpsCoordinates: {
//     latitude: string
//     longitude: string
//   }
//   phoneNumber1: string
//   phoneNumber2: string
//   postCode: string,
//   state: string,
// }

type TProfileIcon = 'user' | 'shopping-cart' | 'map-pin' | 'bell' | 'heart' | 'log-out'
export const ProfileScreen: FC = () => {
  const [data] = useState(fakeData.profile)
  return (
    <View style={styles.profile_wrapper}>
      <ScrollView>
        <View style={styles.avatar_block}>
          <Image
            alt="avatar_image"
            src={'https://codervent.com/mobile/synrok/demo/assets/images/avatars/01.webp'}
            resizeMode="contain"
            resizeMethod="resize"
            style={styles.profileImage}
          />
          <Text style={styles.name}>Mickael Clarke</Text>
        </View>
        {data.map((elem) => (
          <View key={elem.id} style={styles.actions}>
            <Feather name={elem.iconName as TProfileIcon} size={24} style={styles.icons} />
            <Text>{elem.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
const colors = {
  grey: '#F8F9FA',
  border: '#dee2e6',
}

const styles = StyleSheet.create({
  actions: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    flexDirection: 'row',
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  avatar_block: {
    alignItems: 'center',
    backgroundColor: colors.grey,
    borderColor: colors.border,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    flex: 1,
    height: 200,
    justifyContent: 'center',
    marginBottom: 10,
  },
  icons: {
    marginRight: 20,
  },
  name: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  profile_wrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
})

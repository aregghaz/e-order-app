/**
 * was created by tigran at 23.06.23
 */

import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { ImgOrSvg } from '~components/ImgOrSvg'
import { getUserData } from '~services/UserService'

export interface IProps {
  person: any
  address: IAddress
  birthDate: string
  citizenship: string
  email: string
  fatherName: string
  firstName: string
  inn: string
  issueDate: string
  issuedBy: string
  lastName: string
  passport: string
}

interface IAddress {
  address_1: string
  address_2: string
  city: string
  country: string
  gpsCoordinates: {
    latitude: string
    longitude: string
  }
  phoneNumber1: string
  phoneNumber2: string
  postCode: string
  state: string
}

export const ProfileScreen: FC = () => {
  const [data, setData] = useState<IProps>({} as IProps)
  useFocusEffect(
    React.useCallback(() => {
      ;(async () => {
        setData(await getUserData())
      })()
    }, [])
  )
  return (
    <View style={styles.profile_wrapper}>
      {data && data.person && (
        <ScrollView>
          <View style={styles.avatar_block}>
            <View style={styles.profileImage}>
              <ImgOrSvg item={data} product="photo" radius={50} width={100} />
            </View>
            <Text style={styles.name}>
              {data.person?.firstName} {data.person?.lastName}
            </Text>
          </View>
          <View style={styles.icons}>
            <Text>Email: {data.person?.email}</Text>
          </View>
          <View style={styles.icons}>
            <Text>Passport: {data.person?.passport}</Text>
          </View>
          <View style={styles.icons}>
            <Text>Phone1 : {data.person?.phoneNumber1}</Text>
          </View>
          <View style={styles.icons}>
            <Text>Phone2 : {data.person?.phoneNumber2}</Text>
          </View>
          <View style={styles.icons}>
            <Text>Address1 : {data.person?.address.address_1}</Text>
          </View>
          <View style={styles.icons}>
            <Text>Address2 : {data.person?.address.address_2}</Text>
          </View>
          <View style={styles.icons}>
            <Text>City : {data.person?.address.city}</Text>
          </View>
          <View style={styles.icons}>
            <Text>Country : {data.person?.address.country}</Text>
          </View>
          <View style={styles.icons}>
            <Text>Postcode : {data.person?.address.postCode}</Text>
          </View>
        </ScrollView>
      )}
    </View>
  )
}
const colors = {
  grey: '#F8F9FA',
  border: '#dee2e6',
}

const styles = StyleSheet.create({
  // actions: {
  //   alignItems: 'center',
  //   borderColor: colors.border,
  //   borderRadius: 8,
  //   borderStyle: 'solid',
  //   borderWidth: 1,
  //   flexDirection: 'row',
  //   height: 50,
  //   marginVertical: 10,
  //   paddingHorizontal: 10,
  // },
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
    marginTop: 10,
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

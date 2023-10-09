/**
 * was created by tigran at 23.06.23
 */

import { useFocusEffect } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import React, { FC, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { SHOP_API } from '~api'
import { ImgOrSvg } from '~components/ImgOrSvg'
import { SCREEN } from '~constants'
import { useAuth } from '~hooks'
import { getUserData } from '~services/UserService'
import { IPropsData } from '~types/authForms'

export interface IProps {
  customer: {
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
  id: string
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

export const ProfileScreen: FC = ({ route, navigation }: any) => {
  const [data, setData] = useState<any>(IPropsData)
  const { isSignedIn } = useAuth()
  // const [image, setImage] = useState<any>(null)

  const { t } = useTranslation()
  useFocusEffect(
    useCallback(() => {
      const getFetchedData = async () => {
        if (isSignedIn) {
          const dataM = await getUserData()
          if (dataM) {
            const customerData = await SHOP_API.getCustomer(dataM.id)
            const dataUser = customerData.payload
            setData(dataUser)
            if (!dataM.customer) {
              navigation.navigate(SCREEN.PROFILE_EDIT, { type: false })
            }
          }
        } else {
          setData({})
          navigation.navigate(SCREEN.STACK_SIGN_IN)
        }
      }
      getFetchedData()
    }, [isSignedIn])
  )

  const generateFileName = () => {
    // Implement your logic to generate a unique filename here
    // For example, you can use a timestamp or a unique identifier
    const timestamp = Date.now()
    return `image_${timestamp}.jpg`
  }

  const imageUpload = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      const formData = new FormData()
      console.log(result.assets[0], 'result.assets[0]')
      // formData.append('file', {
      //   uri: result.assets[0].uri,
      //   type: result.assets[0].type,
      //   // name: result.assets[0].fileName,
      //   name: generateFileName(),
      // })
      formData.append('file', result.assets[0].uri)
      await SHOP_API.customerUploadImage(data.person.id, formData)
    }
  }
  const trueUserData = data

  return (
    <View style={styles.profile_wrapper}>
      {trueUserData && trueUserData.person && (
        <ScrollView>
          <View style={styles.avatar_block}>
            <Pressable onPress={imageUpload}>
              <View style={styles.profileImage}>
                <ImgOrSvg item={trueUserData.person} product="photo" radius={50} width={100} />
              </View>
            </Pressable>
            <Text style={styles.name}>
              {trueUserData.person?.firstName} {trueUserData.person?.lastName}
            </Text>
          </View>
          <View style={styles.icons}>
            <Text style={styles.title_bold}>{t('email')} :</Text>
            <Text>{trueUserData.person?.email}</Text>
          </View>
          <View style={styles.icons}>
            <Text style={styles.title_bold}>{t('passport')} :</Text>
            <Text>{trueUserData.person?.citizenship?.passport}</Text>
          </View>
          <View style={styles.icons}>
            <Text style={styles.title_bold}>{t('phone')} :</Text>
            <Text>{trueUserData.person?.address?.phoneNumber1}</Text>
          </View>
          <View style={styles.icons}>
            <Text style={styles.title_bold}>{t('address_1')} :</Text>
            <Text>{trueUserData.person?.address.address_1}</Text>
          </View>
          <View style={styles.icons}>
            <Text style={styles.title_bold}>{t('address_2')} :</Text>
            <Text>{trueUserData.person?.address.address_2}</Text>
          </View>
          <View style={styles.icons}>
            <Text style={styles.title_bold}>{t('city')} :</Text>
            <Text>{trueUserData.person?.address.city}</Text>
          </View>
          <View style={styles.icons}>
            <Text style={styles.title_bold}>{t('country')} :</Text>
            <Text>{trueUserData.person?.address.country}</Text>
          </View>
          <View style={styles.icons}>
            <Text style={styles.title_bold}>{t('postcode')} :</Text>
            <Text>{trueUserData.person?.address.postCode}</Text>
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
    flexDirection: 'row',
    gap: 10,
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
  title_bold: {
    fontWeight: 'bold',
  },
})

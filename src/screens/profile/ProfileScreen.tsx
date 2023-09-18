/**
 * was created by tigran at 23.06.23
 */

import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { SHOP_API } from '~api'
import { ImgOrSvg } from '~components/ImgOrSvg'
import { SCREEN } from '~constants'
import { useAuth, useGlobal } from '~hooks'
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
  const { userData } = useGlobal()
  const { t } = useTranslation()

  useFocusEffect(
    React.useCallback(() => {
      ;(async () => {
        console.log(isSignedIn, 'isSignedIn')
        if (isSignedIn) {
          if (!userData.customer) {
            navigation.navigate(SCREEN.PROFILE_EDIT, { type: false })
          } else {
            const custommerData = await SHOP_API.getCustommer(userData.customer.id)
            setData(custommerData.payload)
          }
        } else {
          navigation.navigate(SCREEN.STACK_SIGN_IN)
        }
      })()
    }, [isSignedIn])
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
            <Text style={styles.title_bold}>{t('email')} :</Text>
            <Text>{data.person?.email}</Text>
          </View>
          <View style={styles.icons}>
            <Text style={styles.title_bold}>{t('passport')} :</Text>
            <Text>{data.person?.citizenship?.passport}</Text>
          </View>
          <View style={styles.icons}>
            <Text style={styles.title_bold}>{t('phone')} :</Text>
            <Text>{data.person?.address?.phoneNumber1}</Text>
          </View>
          <View style={styles.icons}>
            <Text style={styles.title_bold}>{t('address_1')} :</Text>
            <Text>{data.person?.address.address_1}</Text>
          </View>
          <View style={styles.icons}>
            <Text style={styles.title_bold}>{t('address_2')} :</Text>
            <Text>{data.person?.address.address_2}</Text>
          </View>
          <View style={styles.icons}>
            <Text style={styles.title_bold}>{t('city')} :</Text>
            <Text>{data.person?.address.city}</Text>
          </View>
          <View style={styles.icons}>
            <Text style={styles.title_bold}>{t('country')} :</Text>
            <Text>{data.person?.address.country}</Text>
          </View>
          <View style={styles.icons}>
            <Text style={styles.title_bold}>{t('postcode')} :</Text>
            <Text>{data.person?.address.postCode}</Text>
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

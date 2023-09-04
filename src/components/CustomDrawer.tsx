/**
 * was created by tigran at 25.06.23
 */

import { Feather, FontAwesome5 } from '@expo/vector-icons'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { fakeData } from '~FakeData'
import { Accordion, TIcon } from '~components/Accordion'
import { ImgOrSvg } from '~components/ImgOrSvg'
import { SCREEN } from '~constants'
import { useAuth } from '~hooks'
import { IProps } from '~screens'
import { getUserData } from '~services/UserService'
import { customStyles } from '~utils/style_helpers'

export const CustomDrawer: FC = (props: any) => {
  const { signOut, isSignedIn } = useAuth()
  const [data, setData] = useState<IProps>({} as IProps)

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        //////FIXME SHOULD ADD FAKE DATA
        isSignedIn ? setData(await getUserData()) : ''
      }
      getData()
    }, [isSignedIn])
  )

  return (
    <View style={styles.sidebar}>
      {isSignedIn && data && (
        <View style={styles.infoBlock}>
          <View style={styles.imageWrapper}>
            <ImgOrSvg item={data.customer} product="photo" radius={10} width={68} />
          </View>
          <Text style={styles.name}>
            {data.customer?.person?.firstName + ' ' + data.customer?.person?.lastName}
          </Text>
        </View>
      )}
      <DrawerContentScrollView {...props}>
        {fakeData.accordion &&
          fakeData.accordion.map((item: any) => {
            if (isSignedIn) {
              return (
                <Accordion
                  key={item.id}
                  title={item.title}
                  iconName={item.iconName as TIcon}
                  subChildren={item.children}
                  hasChildren={item.hasChildren}
                  navigation={props.navigation}
                />
              )
            } else {
              return (
                item.id <= '2' && (
                  <Accordion
                    key={item.id}
                    title={item.title}
                    iconName={item.iconName as TIcon}
                    subChildren={item.children}
                    hasChildren={item.hasChildren}
                    navigation={props.navigation}
                  />
                )
              )
            }
          })}
      </DrawerContentScrollView>
      <TouchableOpacity
        onPress={() => {
          props.navigation.closeDrawer()
          signOut()
          props.navigation.navigate(SCREEN.STACK_SIGN_IN)
        }}
      >
        <View style={styles.sign_out}>
          {isSignedIn ? (
            <>
              <Feather name="log-out" size={20} />
              <Text style={styles.sign_out__text}>Sign Out</Text>
            </>
          ) : (
            <>
              <FontAwesome5 name="user-circle" size={20} />
              <Text style={styles.sign_out__text}>Sign In</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
      {/*<Switch />*/}
    </View>
  )
}

const colors = {
  white: 'white',
  lightDark: '#212529',
  lightGrey: '#f1f1f1',
}

const styles = StyleSheet.create({
  imageWrapper: {
    backgroundColor: colors.white,
    borderRadius: 10,
    height: 80,
    padding: 6,
    width: 80,
  },
  infoBlock: {
    alignItems: 'center',
    backgroundColor: colors.lightDark,
    flexDirection: 'row',
    height: 150,
    paddingLeft: 15,
    paddingTop: 50,
  },
  // profileImage: {
  //   borderRadius: 10,
  //   height: '100%',
  //   width: '100%',
  // },
  name: {
    color: colors.white,
    paddingLeft: 10,
  },
  sidebar: {
    backgroundColor: colors.white,
    flex: 1,
  },
  sign_out: {
    flexDirection: 'row',
    // paddingLeft: 10,
    // paddingTop: 20,
    padding: 10,
    paddingVertical: 20,
    ...customStyles.border(1, 'solid', colors.lightGrey),
  },
  sign_out__text: {
    paddingLeft: 10,
  },
})

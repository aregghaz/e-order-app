/**
 * was created by tigran at 25.06.23
 */

import { Feather } from '@expo/vector-icons'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { Switch } from 'native-base'
import React, { FC } from 'react'
import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native'

import { fakeData } from '~FakeData'
import { Accordion, TIcon } from '~components/Accordion'
import { useAuth } from '~hooks'

export const CustomDrawer: FC = (props: any) => {
  const { signOut } = useAuth()
  return (
    <View style={styles.sidebar}>
      <View style={styles.infoBlock}>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: 'https://codervent.com/mobile/synrok/demo/assets/images/avatars/01.webp',
            }}
            resizeMode="contain"
            resizeMethod="resize"
            style={styles.profileImage}
          />
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        {/*<DrawerItemList {...props} />*/}
        {fakeData.accordion &&
          fakeData.accordion.map((item) => (
            <Accordion
              key={item.id}
              title={item.title}
              iconName={item.iconName as TIcon}
              subChildren={item.children}
              hasChildren={item.hasChildren}
              navigation={props.navigation}
            />
          ))}
      </DrawerContentScrollView>
      <TouchableOpacity onPress={signOut}>
        <View style={styles.sign_out}>
          <Feather name="log-out" size={20} />
          <Text style={styles.sign_out__text}>sign out</Text>
        </View>
      </TouchableOpacity>
      <Switch />
    </View>
  )
}

const colors = {
  white: 'white',
  lightDark: '#212529',
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
    backgroundColor: colors.lightDark,
    height: 150,
    paddingLeft: 15,
    paddingTop: 50,
  },
  profileImage: {
    borderRadius: 10,
    height: '100%',
    width: '100%',
  },
  sidebar: {
    backgroundColor: colors.white,
    flex: 1,
  },
  sign_out: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 20,
  },
  sign_out__text: {
    paddingLeft: 10,
  },
})

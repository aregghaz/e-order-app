/**
 * was created by tigran at 25.06.23
 */
// import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { FlatList, Switch } from 'native-base'
import React, { FC } from 'react'
import { Image, StyleSheet, View } from 'react-native'

import { fakeData } from '~FakeData'
import { Accordion } from '~components/Accordion'

// interface IProps {
// }

export const CustomDrawer: FC = (props) => {
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
        <FlatList
          data={fakeData.accordion}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Accordion
              title={item.title}
              icon={item.icon}
              childs={item.children}
              hasChildren={item.hasChildren}
            />
          )}
        />
      </DrawerContentScrollView>
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
})

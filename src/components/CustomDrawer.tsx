/**
 * was created by tigran at 25.06.23
 */
// import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import React, { FC } from 'react'
import { Image, StyleSheet, View } from 'react-native'

// interface IProps {
// }

export const CustomDrawer: FC = (props) => {
  return (
    // <DrawerContentScrollView {...props}>
    //   <DrawerItemList {...props} />
    // </DrawerContentScrollView>
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
          {/*<Text>poxos</Text>*/}
        </View>
      </View>
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

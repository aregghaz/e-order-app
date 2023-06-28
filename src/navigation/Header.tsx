/**
 * was created by tigran at 24.06.23
 */
import { Feather, Ionicons } from '@expo/vector-icons'
import React, { FC, useCallback } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const width = Dimensions.get('window').width - 30

interface IProps {
  title?: string
  navigation?: any
}

export const Header: FC<IProps> = ({ title, navigation }) => {
  const handleOpenMenu = useCallback(() => {
    navigation.openDrawer()
  }, [navigation])

  const goBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])
  return (
    <View style={styles.header_wrapper}>
      <View style={styles.is_back}>
        <TouchableOpacity>
          <Feather name="menu" size={28} onPress={handleOpenMenu} style={styles.icons} />
        </TouchableOpacity>
        {title && (
          <TouchableOpacity>
            <Ionicons
              name="arrow-back"
              size={28}
              onPress={goBack}
              style={[styles.icons, styles.back]}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.font}>{title}</Text>
      </View>
      <View style={styles.icon_blocks}>
        <TouchableOpacity>
          <Feather
            name="search"
            size={28}
            style={styles.icons}
            // onPress={}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather
            name="heart"
            size={28}
            style={styles.icons}
            // onPress={}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather
            name="shopping-bag"
            size={28}
            style={styles.icons}
            // onPress={}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  back: {
    marginLeft: 20,
  },
  font: {
    alignItems: 'center',
    flexDirection: 'row',
    fontSize: 16,
    justifyContent: 'center',
    marginHorizontal: 7,
    width: 150,
  },
  header_wrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width,
  },
  icon_blocks: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icons: {
    marginHorizontal: 7,
  },
  is_back: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})

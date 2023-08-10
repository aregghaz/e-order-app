/**
 * was created by tigran at 25.06.23
 */
import { Feather } from '@expo/vector-icons'
import React, { FC, useCallback, useState } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

import { SubList } from '~components/SubList'
import { SCREEN } from '~constants'

export type TIcon =
  | 'home'
  | 'user'
  | 'shopping-cart'
  | 'credit-card'
  | 'grid'
  | 'lock'
  | 'star'
  | 'smile'
  | 'headphones'

interface IProps {
  hasChildren?: boolean
  title: string
  iconName?: TIcon
  navigation: any
  subChildren?: any[]
}

export const Accordion: FC<IProps> = ({
  hasChildren,
  iconName,
  title,
  navigation,
  subChildren,
}) => {
  const [rotateState, setRotateState] = useState(false)
  const [rotateValue, setRotateValue] = useState('0deg')
  const handlePress = useCallback(() => {
    setRotateState(!rotateState)
    if (rotateState) {
      setRotateValue('0deg')
    } else {
      // rotateRefValue.current = '-90deg'
      setRotateValue('-90deg')
    }
  }, [rotateState])
  const chevronStyle = { transform: [{ rotate: rotateValue }] }
  const childrenElements = hasChildren ? (
    subChildren &&
    subChildren.map((item) => {
      // if(item.hasOwnProperty("companyName")) {
      if (Object.prototype.hasOwnProperty.call(item, 'companyName')) {
        item.title = item.shopName
        item.group = 'shop'
        item.shop_id = item.id
        item.hasChildren = false
      }
      return (
        <View key={item.id}>
          <SubList
            title={item.title}
            group={item.group}
            shop_id={item.shop_id}
            navigation={navigation}
            hasChildren={item.hasChildren}
            handlePress={handlePress}
          />
        </View>
      )
    })
  ) : (
    <></>
  )
  const handlePressCheck = (title: string) => {
    handlePress()
    !hasChildren ? navigation.navigate(findScreenName, { title }) : null
  }
  /*** checking if there is matching screen name ***/
  const findScreenName = Object.values(SCREEN).find((item) => item === title) || 'Menu'
  // const newStyle = { ...styles.accordion_block, height }
  return (
    <View style={styles.accordion_block}>
      {/*// <View style={newStyle}>*/}
      <TouchableWithoutFeedback
        // onPress={() => {
        //   handlePress()
        //   !hasChildren ? navigation.navigate(findScreenName, { title }) : null
        // }}
        onPress={() => handlePressCheck(title)}
      >
        <View>
          <View style={styles.accordion_text__wrapper}>
            <View style={styles.sidebar_icon__block}>
              <Feather name={iconName} size={20} />
              <Text style={styles.text}>{title}</Text>
            </View>
            {hasChildren && <Feather name="chevron-left" size={18} style={chevronStyle} />}
          </View>
          {rotateState && <View>{childrenElements}</View>}
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const colors = {
  grey: '#ddd',
  red: 'red',
}

const styles = StyleSheet.create({
  accordion_block: {
    flex: 1,
    // height: 55,
    overflow: 'hidden',
  },
  accordion_text__wrapper: {
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  sidebar_icon__block: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    marginLeft: 10,
  },
})

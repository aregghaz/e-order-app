import { Feather } from '@expo/vector-icons'
import React, { FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

import { SubList } from '~components/SubList'
// import { SCREEN } from '~constants'
import { TMenusType } from '~constants'
import { ScreenNameChanger } from '~utils/helper'

//import { useAuth } from '~hooks'

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
  const { t } = useTranslation()

  const handlePress = useCallback(() => {
    setRotateState(!rotateState)
    if (rotateState) {
      setRotateValue('0deg')
    } else {
      setRotateValue('-90deg')
    }
  }, [rotateState])
  const chevronStyle = { transform: [{ rotate: rotateValue }] }
  const childrenElements = hasChildren ? (
    subChildren &&
    subChildren.map((item) => {
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
  const findScreenName = ScreenNameChanger(title)
  return (
    <View style={styles.accordion_block}>
      <TouchableWithoutFeedback onPress={() => handlePressCheck(title)}>
        <View>
          <View style={styles.accordion_text__wrapper}>
            <View style={styles.sidebar_icon__block}>
              <Feather name={iconName} size={20} />
              {/*<Text style={styles.text}>{title}</Text>*/}
              <Text style={styles.text}>{t(title as TMenusType)}</Text>
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

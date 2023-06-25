import { View, Text } from 'native-base'
import React, { FC } from 'react'
import { StyleSheet } from 'react-native'

interface ITrending {
  name?: string
}

const Trending: FC<ITrending> = ({ name }) => {
  return (
    <View style={styles.body}>
      <Text style={styles.heading}>Trending {name && `in ${name}`}</Text>
      <View style={styles.main}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    paddingTop: 10,
  },

  heading: {
    fontSize: 20,
  },

  main: {
    flexGrow: 1,
  },

  // swiper: {
  //   flexGrow: 1,
  // },
  //
  // item: {
  //   flexGrow: 1,
  // },
})

export default Trending

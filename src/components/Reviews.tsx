import { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'

interface IReviews {
  asd: string
}

const Reviews: FC<IReviews> = () => {
  return (
    <View style={styles.body}>
      <Text style={styles.header}>Client Reviews</Text>
      <View style={styles.container}>
        <Swiper style={styles.swiper}>
          <View style={styles.review}></View>
        </Swiper>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    height: 300,
    paddingTop: 20,
  },

  container: {},

  header: {},

  review: {},

  swiper: {},
})

export default Reviews

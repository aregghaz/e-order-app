import { View, Image } from 'native-base'
import React, { FC } from 'react'
import { GestureResponderEvent, StyleSheet, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'

export type TOfferPoster = {
  image: string
  onPress?: (event: GestureResponderEvent) => void
  navigate?: {
    to: string
    param?: {
      [key: string]: never
    }
  }
}

interface IOfferPosterSlider {
  slides: TOfferPoster[]
  navigation?: Function
}

const OfferPosterSlider: FC<IOfferPosterSlider> = ({ slides, navigation }) => {
  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Swiper
          horizontal={true}
          loop={true}
          showsPagination={false}
          scrollEnabled={true}
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={500}
          autoplayDirection={true}
          pagingEnabled={true}
        >
          {slides.map(({ image, onPress, navigate = { to: '', param: {} } }, index) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                key={index}
                onPress={(event) => {
                  onPress && onPress(event)
                  navigation && navigation(navigate.to, navigate.param)
                }}
                style={styles.slide}
              >
                <Image src={image} alt={'image'} style={styles.image} resizeMode={'cover'} />
              </TouchableOpacity>
            )
          })}
        </Swiper>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'row',
    height: 230,
    justifyContent: 'center',
    width: '100%',
  },

  container: {
    maxWidth: 500,
  },

  image: {
    borderRadius: 10,
    flex: 1,
  },

  slide: {
    flex: 1,
    padding: 10,
  },
})

export default OfferPosterSlider

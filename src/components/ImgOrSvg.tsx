/**
 * was created by tigran at 15.07.23
 */
import { Image } from 'native-base'
import React, { FC } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

import { getImagePath } from '~api'
import { NoImageSvg } from '~components/NoImageSvg'

interface IProps {
  column?: number
  item: any
  product?: string
  radius?: number
  padding?: number
  resizeMode?: 'contain' | 'cover' | 'center' | 'stretch'
}

const trueImgConfigs = (item: any, product = '') => {
  const locale = 'ru'
  switch (product) {
    case '-product':
      if (item.gallery?.length > 0) {
        return {
          filename: item.gallery?.[0]?.filename,
          alt: item.name,
          src: getImagePath(item.gallery?.[0]?.filename, '-product'),
        }
      } else {
        return {
          filename: item?.filename,
          alt: item.name ? item.name : item?.filename,
          src: getImagePath(item?.filename, '-product'),
        }
      }
    default:
      return {
        filename: item.mainImage?.filename,
        alt: item.name[locale],
        src: getImagePath(item.mainImage?.filename),
      }
  }
}
const width = Dimensions.get('window').width
export const ImgOrSvg: FC<IProps> = ({
  item,
  product = '',
  radius = 0,
  column = 2,
  padding = 0,
  resizeMode = 'contain',
}) => {
  const correctPadding = padding * 4
  const divWidth = (width - correctPadding) / column
  const { src, alt, filename } = trueImgConfigs(item, product)
  const borderRadius = radius ? { borderRadius: radius } : { borderRadius: 0 }
  const imgWidth = { width: divWidth }
  const objectFit = { resizeMode }
  return (
    <View style={styles.ImgOrSvg_wrapper}>
      {filename ? (
        <Image style={[styles.image, borderRadius, objectFit]} src={src} alt={alt} />
      ) : (
        <View style={[styles.img_wrapper, imgWidth, borderRadius]}>
          <NoImageSvg width={divWidth} height={divWidth} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  ImgOrSvg_wrapper: {
    flex: 1,
  },
  image: {
    aspectRatio: 1,
    width: '100%',
  },
  img_wrapper: {
    overflow: 'hidden',
  },
})

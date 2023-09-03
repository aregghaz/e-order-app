/**
 * was created by tigran at 15.07.23
 */

import React, { FC } from 'react'
import { View, StyleSheet, Dimensions, Image } from 'react-native'

import { getImagePath } from '~api'
import { NoImageSvg } from '~components/NoImageSvg'

interface IProps {
  column?: number
  item: any
  product?: string
  radius?: number
  padding?: number
  resizeMode?: 'contain' | 'cover' | 'center' | 'stretch'
  width?: number
  height?: number
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
    case 'photo':
      return {
        filename: item?.person?.photo?.filename,
        alt: item?.person?.firstName,
        src: getImagePath(item?.person?.photo?.filename),
      }
    default:
      return {
        filename: item.mainImage?.filename,
        alt: item.name[locale],
        src: getImagePath(item.mainImage?.filename),
      }
  }
}
const dimensionWidth = Dimensions.get('window').width
export const ImgOrSvg: FC<IProps> = ({
  item,
  product = '',
  radius = 0,
  column = 2,
  padding = 0,
  resizeMode = 'contain',
  width,
  height,
}) => {
  const correctPadding = padding * 4
  const divWidth = (dimensionWidth - correctPadding) / column
  const { src, alt, filename } = trueImgConfigs(item, product)
  const borderRadius = radius ? { borderRadius: radius } : { borderRadius: 0 }
  const imgWidth = { width: width || divWidth }
  const trueWidth = width ? { width } : { width: '100%' }
  const trueHeight = height ? { height } : { height: undefined }
  return (
    <View>
      {filename ? (
        <Image
          style={[styles.image, borderRadius, trueWidth, trueHeight]}
          source={{ uri: src }}
          alt={alt}
          resizeMode={resizeMode}
        />
      ) : (
        <View style={[styles.img_wrapper, imgWidth, borderRadius]}>
          <NoImageSvg width={width || divWidth} height={width || divWidth} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
  },
  img_wrapper: {
    overflow: 'hidden',
  },
})

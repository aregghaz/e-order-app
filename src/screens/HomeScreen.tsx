import { ScrollView } from 'native-base'
// import { useCallback, useTranslation } from '~hooks'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

import { HomeApi } from '~api/home-api'
import Advantages from '~components/Advantages'
import CircleCategories, { TCircleCategories } from '~components/CricleCategories'
import OfferPosterSlider from '~components/OfferPosterSlider'
import Reviews from '~components/Reviews'
import TrendingItems from '~components/TrendingItems'
//import { useFocusEffect } from '@react-navigation/native'

const local = 'ru'

export const HomeScreen = (props: HomeScreenProps): JSX.Element => {
  const {
    navigation: { navigate },
  } = props
  const [data, setData] = useState([])
  // useFocusEffect(
  //   React.useCallback(() => {
  //     ;(async () => {
  //       const categoryData = await HomeApi.getCategory()
  //       console.log(categoryData,'categoryData');
  //       setData(categoryData)
  //       //  dispatch(clientAction.fetching({clientById: clientData.client}))
  //     })()
  //     //  return () => clientData();
  //   }, [])
  // )
  useEffect(() => {
    const getAsyncCategory = async () => {
      const categoryData = await HomeApi.getCategory()
      // console.log(categoryData, 'categoryData')
      setData(categoryData.payload.content)
    }
    getAsyncCategory()
    // (async function () {
    //   const categoryData = await HomeApi.getCategory()
    //   // console.log(categoryData, 'categoryData')
    //   setData(categoryData.payload.content)
    // })()
  }, [])
  // const { t } = useTranslation()
  //r
  // const navigateToDetails = useCallback(() => {
  //   navigate('Details', { id: 'home-id' })
  // }, [navigate])

  return (
    <ScrollView flex={1} style={styles.main_wrapper}>
      {data.length > 0 && (
        <CircleCategories
          navigation={navigate}
          categories={
            data.length > 0 &&
            data.map(({ mainImage, name }): TCircleCategories => {
              return {
                name: name[local],
                image:
                  mainImage ??
                  'https://codervent.com/mobile/synrok/demo/assets/images/category/01.webp',
                navigate: {
                  to: 'Details',
                  param: {},
                },
              }
            })
          }
          // categories={[
          //   {
          //     name: 'Men',
          //     image: 'https://codervent.com/mobile/synrok/demo/assets/images/category/01.webp',
          //     navigate: {
          //       to: 'Details',
          //       param: {},
          //     },
          //   },
        />
      )}
      <OfferPosterSlider
        navigation={navigate}
        slides={[
          {
            image: 'https://codervent.com/mobile/synrok/demo/assets/images/banner-sliders/01.webp',
            navigate: {
              to: 'Details',
              param: {},
            },
          },
          {
            image: 'https://codervent.com/mobile/synrok/demo/assets/images/banner-sliders/02.webp',
          },
          {
            image: 'https://codervent.com/mobile/synrok/demo/assets/images/banner-sliders/03.webp',
          },
          {
            image: 'https://codervent.com/mobile/synrok/demo/assets/images/banner-sliders/04.webp',
          },
          {
            image: 'https://codervent.com/mobile/synrok/demo/assets/images/banner-sliders/05.webp',
          },
          {
            image: 'https://codervent.com/mobile/synrok/demo/assets/images/banner-sliders/06.webp',
          },
        ]}
      />
      <Advantages
        advantages={[
          {
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACTUlEQVR4nO2Yu09UQRSH14iriSwYY6FUhs5eE61I7EwkIJUF/wCgobHXDrfWQhNaCkKl/4KRh8FH46ug8AFGEiwQozGazxw4mwxwHzNzZ93RzJfc5s6Z85vfnjNz791aLZFIJBKJRCKRKAPoBu4BG/wdvgD3gaO1kLCTtBPcDW1kQxOfDZo4X++86q2HTrxN0KSd0KQdSTuhSTLiz39XEeAT5XwGZoEzVkk7ZMSFLWAwViOjFrH9wAON/w5cKEzajgUXLM5JEzgITOu0d8DxyklDkKcJ1IEmsFbSZg+BAzEbaTrsmRsxG1nVocsFcy8Bv4Gfu/ZLZEa2sZg/tRPJe+CE0+SQ5GliuRagC3ik4XNOk2MyIgCngR86ZeCfNSIYR/JMbEY+6NBVyzwXNX4lNiO38ONXbEa61EyrMtZEZcSHZCQEqSJVWws4AkwCT4Bvei0B14HD3uLlOlvAAnBN3owrGQH6gBcFB8Zz4FRVIxY6zyTGy4j82kbyl8AQ0NBrGHhtiNR9jTjoPN2rY2tEWkd4BfRmjPcaIuMVjLjoTOQZWcv7fgbmdWyoYFFXNOaxpYlzRrsMeugsGPdG9d6q7VdZo0Cgh3A0LHQ2M+ZNtfqzaXyduQpI2V2QP83vADeBjx46m0a8rPl26f40Sj5cEDPi0loBdOZ9BOT8Rjda1iY8BrzVmDEPDz464z4CdX1OCG90w/XoNWIk33cstklnGTjkK9JniGQhz5CTviYcdJZdH7xZInIgSPkX9bWh9eowUaUSFjpfZe9JO5VV4g+MEIjIjWTIbgAAAABJRU5ErkJggg==',
            text: 'Free Delivery',
            color: '#0D6EFD',
          },
          {
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA10lEQVR4nO3ZsRGCUBCE4SsDsSQsB7QAbQt7Eg0w+p3n3IwOPtHA4B7ul15yNwsEi5mIiIi8AjZAD1yI5+y7NZ+OOFCO/VwSyQi0wMqCAVZA5zuSTQY4+rC14ICt79rnhun5SyoLDqh81yE3vLNC8G7fxR1SGtMhwZgSCca+/goEhQ5ZQiL8+jnWIQ96R6JBX61gUCLBoESCQYkUlMjgs3DF3BSw9l1PuWHqVJPOggN2cwVd48PRm7zaggFqP+Lqu+bL7FQMU3qJPUmmf6pQy/utICIi8q9uYdJqXVSS4jUAAAAASUVORK5CYII=',
            text: 'Secure Payment',
            color: '#723DA6',
          },
          {
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAByklEQVR4nO2ZS07DMBRFLbV8Jm2ZwkYYsIiWLiAzGBQW0nUl4idVzKBlAwwZtFPQQRavUtTEIXFfwJF8JEtR6xvf61cnTmpMJBKJ7APQBxJgBSzluG+6BNAD7ihiP+uZrsDP7Fve5TiRY0tiOlCFbKcCSUm4LVmQ1aFoNM0blaCpK2gICzpras5Rnf+7EDiq0G9rAlQBjoEHLRMlk3Fvx9B1XT7w3KcKDasz13VdHPQc+AS+gItgz0/5TSxUsqogncL8FsQEDjFIVyvSFUxFkN3recikOuX7Y/D1E4O0BLEiggkEfP3EIC1BrIhgAgFfPzFISxArIphAoK4f187XBAJ1n9ubBAGOgGt5B/Uhzb64uAIOa5hqrMd3K+8KApwBT7ixL+9OK87rpcf3F1ImtLMFPMpXL8AYGEibyB86WzOFmd1Hz75BHLwCoxLNKGemFb3xCFL12Duu0F3WCOKrTxsHcQyykRMOKvoMpc9GW68GsK5hxP48LGttvRq5hTqp6DOVPvfaejWAWxlk6VisJ8Cb9Jlp69WQy+ezDLSShTmUNs2ZWAAH2npV5Ia2NVPGosYN0VuviszsjWwxNtLsFmNWZyb31UdMB/gGWQfynCUuH5UAAAAASUVORK5CYII=',
            text: 'Free Returns',
            color: '#FF2C2C',
          },
          {
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADSUlEQVR4nO2az0tVQRTHJ/yRGkQ/KJeV+Q9E9ks3QpBFuwiCaNOPRZQREfRDN7mwp7YoaFebFtW2ny4igiKhWphaQVAiRdbCihAqzFd+4vTO803P+3zv+ubdd6/4BeHNzJ3v+Z47d+acmdGYOUwFUAM0A9eBPuALEAfG9fdz4BpwGFhlwgSgDNgNPMEfJoAeYHsYnGgCXlvifgB3gUNAA1ALLNC/Wq2Ttm7gp9XvGbC5GA6UAl36VgXDwBGg0gdHpfb5aI1QTLgLqz4lYDnwWI3Lt38KqMiDrwJoUS7BI2CZW9VTjS4Eev+Zgw/yqTjkXgcMKXc/sMgVt9ebe6iG3gDVBbBRrdyCB8B8UwAjF62RWOHcQMrOSp1zgguuyTcCfzQmrHFK7m1vrdr6LZ+cyxXqhb6hTiekudntsuZL/iuZBjvBO6DKicrc7FYB79X2LheET5XshBOF/myfVNs9+RKt1kA1VvC1PXPM+qUaZp6baXInuOVUoT8Nt1XDwXxIJIsVtDpV509Dq2q4mg+JpOKCLU7V+U9MBb0z6Vyuy18y/zkfWDI3dekX26iWTtk2mBms4TZiJmCQEJ6O7LEMWC8T2xqJet1DCEYCUW8B+OyhY1w11mXqdEBTgklYbf+VgwIZdChE6770Do3aMGF/VpkIQ+DIOdUqmhuTjSXAK33gzHQEYXHEJH63afGl+CAV27TibXJFiIgjZcCgVjVJxWUtnM6FICyOCHSLLLgkhQEtbIigI5u0ql8K37SwOFeCEDmyRKu+Gt2JYUfuCDlSqlXxWTUiA7NgjvTZq1ZLrgQhcqTVXrW2amEw6nGkxIrsbZGN7BHPteKTuZb10P6IZb9xYG+mjnXATT25QPcAyX3AcJBOCGQP5KFD9iM35DTSZIPeU6Sj3QQMvHV0+CEo1W3miB4ot8s+vqCqvXWUqG307PlsMc4OnIDElZ1gyEQZpM6eu02UAdxTR5pNVAHsUCdGgaVBGy/XheIT3hjR9mknLbAT+K59jgfnQUpAB7kh5nEfUgPsAe5bz10B5hXDkeS9eX2G9mRgy4ZR4FhRnEhzpMGnI/JfE3JDdQc4WrDr6TyjcdZPK3QgMdlj1sh4TfaOydR7DrMUfwEbaScFEF18jgAAAABJRU5ErkJggg==',
            text: '24/7 Support',
            color: '#21AD61',
          },
          {
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAByklEQVR4nO2ZS07DMBRFLbV8Jm2ZwkYYsIiWLiAzGBQW0nUl4idVzKBlAwwZtFPQQRavUtTEIXFfwJF8JEtR6xvf61cnTmpMJBKJ7APQBxJgBSzluG+6BNAD7ihiP+uZrsDP7Fve5TiRY0tiOlCFbKcCSUm4LVmQ1aFoNM0blaCpK2gICzpras5Rnf+7EDiq0G9rAlQBjoEHLRMlk3Fvx9B1XT7w3KcKDasz13VdHPQc+AS+gItgz0/5TSxUsqogncL8FsQEDjFIVyvSFUxFkN3recikOuX7Y/D1E4O0BLEiggkEfP3EIC1BrIhgAgFfPzFISxArIphAoK4f187XBAJ1n9ubBAGOgGt5B/Uhzb64uAIOa5hqrMd3K+8KApwBT7ixL+9OK87rpcf3F1ImtLMFPMpXL8AYGEibyB86WzOFmd1Hz75BHLwCoxLNKGemFb3xCFL12Duu0F3WCOKrTxsHcQyykRMOKvoMpc9GW68GsK5hxP48LGttvRq5hTqp6DOVPvfaejWAWxlk6VisJ8Cb9Jlp69WQy+ezDLSShTmUNs2ZWAAH2npV5Ia2NVPGosYN0VuviszsjWwxNtLsFmNWZyb31UdMB/gGWQfynCUuH5UAAAAASUVORK5CYII=',
            text: 'Free Returns',
            color: '#FF2C2C',
          },
          {
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADSUlEQVR4nO2az0tVQRTHJ/yRGkQ/KJeV+Q9E9ks3QpBFuwiCaNOPRZQREfRDN7mwp7YoaFebFtW2ny4igiKhWphaQVAiRdbCihAqzFd+4vTO803P+3zv+ubdd6/4BeHNzJ3v+Z47d+acmdGYOUwFUAM0A9eBPuALEAfG9fdz4BpwGFhlwgSgDNgNPMEfJoAeYHsYnGgCXlvifgB3gUNAA1ALLNC/Wq2Ttm7gp9XvGbC5GA6UAl36VgXDwBGg0gdHpfb5aI1QTLgLqz4lYDnwWI3Lt38KqMiDrwJoUS7BI2CZW9VTjS4Eev+Zgw/yqTjkXgcMKXc/sMgVt9ebe6iG3gDVBbBRrdyCB8B8UwAjF62RWOHcQMrOSp1zgguuyTcCfzQmrHFK7m1vrdr6LZ+cyxXqhb6hTiekudntsuZL/iuZBjvBO6DKicrc7FYB79X2LheET5XshBOF/myfVNs9+RKt1kA1VvC1PXPM+qUaZp6baXInuOVUoT8Nt1XDwXxIJIsVtDpV509Dq2q4mg+JpOKCLU7V+U9MBb0z6Vyuy18y/zkfWDI3dekX26iWTtk2mBms4TZiJmCQEJ6O7LEMWC8T2xqJet1DCEYCUW8B+OyhY1w11mXqdEBTgklYbf+VgwIZdChE6770Do3aMGF/VpkIQ+DIOdUqmhuTjSXAK33gzHQEYXHEJH63afGl+CAV27TibXJFiIgjZcCgVjVJxWUtnM6FICyOCHSLLLgkhQEtbIigI5u0ql8K37SwOFeCEDmyRKu+Gt2JYUfuCDlSqlXxWTUiA7NgjvTZq1ZLrgQhcqTVXrW2amEw6nGkxIrsbZGN7BHPteKTuZb10P6IZb9xYG+mjnXATT25QPcAyX3AcJBOCGQP5KFD9iM35DTSZIPeU6Sj3QQMvHV0+CEo1W3miB4ot8s+vqCqvXWUqG307PlsMc4OnIDElZ1gyEQZpM6eu02UAdxTR5pNVAHsUCdGgaVBGy/XheIT3hjR9mknLbAT+K59jgfnQUpAB7kh5nEfUgPsAe5bz10B5hXDkeS9eX2G9mRgy4ZR4FhRnEhzpMGnI/JfE3JDdQc4WrDr6TyjcdZPK3QgMdlj1sh4TfaOydR7DrMUfwEbaScFEF18jgAAAABJRU5ErkJggg==',
            text: '24/7 Support',
            color: '#21AD61',
          },
        ]}
      />
      <TrendingItems
        items={[
          {
            image: 'https://codervent.com/mobile/synrok/demo/assets/images/trending/01.webp',
            name: 'Denim Shirts',
          },
          {
            image: 'https://codervent.com/mobile/synrok/demo/assets/images/trending/02.webp',
            name: 'Casual Shirts',
          },
          {
            image: 'https://codervent.com/mobile/synrok/demo/assets/images/trending/03.webp',
            name: 'Women Tops',
          },
          {
            image: 'https://codervent.com/mobile/synrok/demo/assets/images/trending/04.webp',
            name: 'Women Shirts',
          },
          {
            image: 'https://codervent.com/mobile/synrok/demo/assets/images/trending/05.webp',
            name: 'Women Jeans',
          },
          {
            image: 'https://codervent.com/mobile/synrok/demo/assets/images/trending/06.webp',
            name: 'Nightwear',
          },
        ]}
      />
      <Reviews asd={'asd'} />
      {/*<Image*/}
      {/*  source={require('~assets/logo.png')}*/}
      {/*  resizeMode="contain"*/}
      {/*  resizeMethod="resize"*/}
      {/*  height={24}*/}
      {/*  alt="logo"*/}
      {/*/>*/}
      {/*<Text textAlign="center">{t('hello')}</Text>*/}
      {/*<Text textAlign="center">{t('thanks')}</Text>*/}
      {/*<Text textAlign="center">{t('app_information')}</Text>*/}
      {/*<Button mt={4} onPress={navigateToDetails}>*/}
      {/*  {t('home_screen.details')}*/}
      {/*</Button>*/}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  main_wrapper: {
    paddingVertical: 20,
  },
})

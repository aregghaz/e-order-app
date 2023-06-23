import { ScrollView } from 'native-base'

// import { useCallback, useTranslation } from '~hooks'
import Advantages from '~components/Advantages'
import CircleCategories from '~components/CricleCategories'
import OfferPosterSlider from '~components/OfferPosterSlider'

export const HomeScreen = (props: HomeScreenProps): JSX.Element => {
  const {
    navigation: { navigate },
  } = props
  // const { t } = useTranslation()
  //
  // const navigateToDetails = useCallback(() => {
  //   navigate('Details', { id: 'home-id' })
  // }, [navigate])

  return (
    <ScrollView flex={1}>
      <CircleCategories
        navigation={navigate}
        categories={[
          {
            name: 'Testname1',
            image: 'https://codervent.com/mobile/synrok/demo/assets/images/category/01.webp',
            navigate: {
              to: 'Details',
              param: {},
            },
          },
          {
            name: 'Testname2',
            image: 'https://codervent.com/mobile/synrok/demo/assets/images/category/01.webp',
            navigate: {
              to: '',
              param: {},
            },
          },
          {
            name: 'Testname3',
            image: 'https://codervent.com/mobile/synrok/demo/assets/images/category/01.webp',
            navigate: {
              to: '',
              param: {},
            },
          },
          {
            name: 'Testname4',
            image: 'https://codervent.com/mobile/synrok/demo/assets/images/category/01.webp',
            navigate: {
              to: '',
              param: {},
            },
          },
        ]}
      />
      <OfferPosterSlider
        navigation={navigate}
        slides={[
          {
            image:
              'https://c4.wallpaperflare.com/wallpaper/410/867/750/vector-forest-sunset-forest-sunset-forest-wallpaper-preview.jpg',
            navigate: {
              to: 'Details',
              param: {},
            },
          },
          {
            image:
              'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          },
          {
            image:
              'data:image/jpeg;base64,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',
          },
          {
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3UxFwpaA4vbBwdxDsUTJ10KGU6qD6XKYW2jRcRsBKhivkFkG0LNchnNN6Nc-EOZAMFZs&usqp=CAU',
          },
        ]}
      />
      <Advantages
        advantages={[
          {
            icon: 'https://codervent.com/mobile/synrok/demo/assets/images/category/01.webp',
            text: 'Free Delivery',
          },
          {
            icon: 'https://codervent.com/mobile/synrok/demo/assets/images/category/01.webp',
            text: 'Secure Payment',
          },
          {
            icon: 'https://codervent.com/mobile/synrok/demo/assets/images/category/01.webp',
            text: 'Free Returns',
          },
          {
            icon: 'https://codervent.com/mobile/synrok/demo/assets/images/category/01.webp',
            text: '24/7 Support',
          },
        ]}
      />
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

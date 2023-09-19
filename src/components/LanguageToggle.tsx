/**
 * was created by tigran at 05.09.23
 */
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Pressable } from 'react-native'

import { EnglishSVG, RussiaSVG } from '../../assets/svg/flags'

import { customStyles } from '~utils/style_helpers'

const colors = {
  white: 'white',
  borderColor: '#d1d1d1',
}

type Language = 'ru' | 'en'

const whichLanguage: Record<Language, React.ReactNode> = {
  ru: <RussiaSVG />,
  en: <EnglishSVG />,
}

const validLanguages = [
  {
    id: 1,
    lang: 'ru',
    component: <RussiaSVG />,
  },
  {
    id: 2,
    lang: 'en',
    component: <EnglishSVG />,
  },
]
export const LanguageToggle: FC = (props: any) => {
  const [language, setLanguage] = useState<Language>('ru')
  const [showLanguages, setShowLanguages] = useState<boolean>(false)
  const { i18n } = useTranslation()
  const handleChangeLocale = async (locale: Language): Promise<void> => {
    setShowLanguages(false)
    setLanguage(locale)
    await i18n.changeLanguage(locale)
    props.navigation.closeDrawer()
  }

  useEffect(() => {
    const setDefaultLanguage = async () => {
      await i18n.changeLanguage(language)
    }
    setDefaultLanguage()
  }, [])

  return (
    <View style={styles.LanguageToggle_wrapper}>
      <Pressable style={styles.languages} onPress={() => setShowLanguages(!showLanguages)}>
        <View style={styles.current_language}>{whichLanguage[language]}</View>
      </Pressable>
      <>
        {showLanguages &&
          validLanguages.length > 0 &&
          validLanguages.map(
            (el: any) =>
              el.lang !== language && (
                <Pressable
                  key={el.id}
                  style={styles.flag_wrapper}
                  onPress={() => handleChangeLocale(el.lang)}
                >
                  {el.component}
                </Pressable>
              )
          )}
      </>
    </View>
  )
}

const styles = StyleSheet.create({
  LanguageToggle_wrapper: {
    flex: 1,
  },
  current_language: {
    paddingBottom: 10,
    paddingLeft: 30,
    paddingTop: 20,
    ...customStyles.borderBottom(1, 'solid', colors.borderColor),
  },
  flag_wrapper: {
    paddingBottom: 10,
    paddingLeft: 30,
    paddingTop: 10,
    ...customStyles.borderBottom(1, 'solid', colors.borderColor),
  },
  languages: {
    backgroundColor: colors.white,
  },
})

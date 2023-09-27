/**
 * was created by tigran at 27.09.23
 */
import React, { FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, TextInput } from 'react-native'

import { useDebounce } from '~hooks/useDebounce'
import { customStyles } from '~utils/style_helpers'

interface IProps {
  handleSearch: (value: string) => void
}
export const Search: FC<IProps> = ({ handleSearch }) => {
  const { t } = useTranslation()
  const [text, setText] = useState('')

  const debouncedSearch = useDebounce(handleSearch, 200)

  const handleChangeText = useCallback(
    (value: string) => {
      setText(value)
      debouncedSearch(value)
    },
    [debouncedSearch]
  )
  return (
    <View>
      <TextInput
        style={styles.search_input}
        value={text}
        onChangeText={handleChangeText}
        placeholder={t('common.search_alt')}
      />
    </View>
  )
}

const colors = {
  white: 'white',
  borderColor: '#f1f1f1',
}

const styles = StyleSheet.create({
  search_input: {
    backgroundColor: colors.white,
    borderRadius: 4,
    ...customStyles.border(1, 'solid', colors.borderColor),
    height: 50,
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 20,
    paddingHorizontal: 10,
  },
})

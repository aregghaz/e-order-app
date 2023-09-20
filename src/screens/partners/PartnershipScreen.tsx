/**
 * was created by tigran at 11.08.23
 */

import { Feather } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { CheckIcon, Select } from 'native-base'
import React, { FC, useState } from 'react'
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'
import { getShopId, notification } from '~services/ShopService'
import { screenHeight, screenWidth } from '~utils/breakpoints'
import { customStyles } from '~utils/style_helpers'
import { useTranslation } from 'react-i18next'

export const PartnershipScreen: FC = () => {
  const [partnerShips, setPartnerShips] = useState<any>([])
  const [shops, setShops] = useState<any>([])
  const [shopsReq, setShopsReq] = useState<any>([])
  const [selectedShops, setSelectedShops] = useState('')
  const [loding, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData] = useState<any>(null)
  const navigation = useNavigation<any>()
  const { t } = useTranslation()
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        // console.log(selectedShops, 'selectedShops')
        const getID = await getShopId()
        const data = await SHOP_API.get(selectedShops)
        // console.log(data.payload.content, 'DATA________________')
        const shopData = await SHOP_API.getShopsData()
        const shopReqData = await SHOP_API.getShopReq(selectedShops ? selectedShops : getID)
        setShopsReq(shopReqData.payload.content)
        setShops(shopData.payload.content)
        setPartnerShips(data.payload.content)
        setLoading(false)
      }
      if (loding) {
        getData()
      }
    }, [loding, selectedShops])
  )
  const handleOnPress = async (id: string) => {
    await SHOP_API.delete(id)
    setLoading(true)
    await notification('Удалено')
  }
  const handleAddSuplier = async () => {
    navigation.navigate(SCREEN.ADD_PARTNERSHIP)
  }
  const handlerGetPartner = async (id: string) => {
    const data = await SHOP_API.getSingleData(id)
    setModalData(data.payload)
    setModalVisible(!modalVisible)
  }
  return (
    <View style={styles.ShopListScreen_wrapper}>
      <View style={styles.select_wrapper}>
        {shops.length > 0 && (
          <Select
            selectedValue={selectedShops}
            minWidth="100%"
            height="50"
            borderColor="#CCC"
            marginTop="3"
            color="#000"
            letterSpacing="1"
            fontSize="17"
            accessibilityLabel="Choose Service"
            placeholder={t('select_store')}
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => {
              setSelectedShops(itemValue)
              setLoading(true)
            }}
          >
            <Select.Item label={t('select_store')} value={'0'} />
            {shops.map((item: any) => {
              return <Select.Item label={item.shopName} key={item.id} value={item.id} />
            })}
          </Select>
        )}
      </View>
      <ScrollView>
        {partnerShips &&
          partnerShips.map((item: any) => {
            return (
              <View key={item.id} style={styles.box}>
                <Pressable onPress={() => handlerGetPartner(item.id)}>
                  <Text style={styles.title}>{item.supplier.companyName}</Text>
                  <Text style={styles.text_h2}>Название магазина: {item.shop.shopName}</Text>
                </Pressable>

                <View style={styles.buttonsContainer}>
                  <CustomButton
                    title="Удалить"
                    width={150}
                    padding={15}
                    border="grey"
                    background="white"
                    color="red"
                    onPress={() => handleOnPress(item.id)}
                  />
                </View>
              </View>
            )
          })}
      </ScrollView>
      <View>
        <Text style={styles.textStyle}>Запросы на партнерство</Text>
        <ScrollView horizontal={true}>
          <View style={styles.partnersContainer}>
            {shopsReq &&
              shopsReq.map((item: any) => {
                return (
                  <View key={item.id} style={styles.box}>
                    <Pressable onPress={() => handlerGetPartner(item.id)}>
                      <Text style={styles.title}>{item.supplier.companyName}</Text>
                      <Text style={styles.text_h2}>
                        {t('store_name')}: {item.shop.shopName}
                      </Text>
                    </Pressable>
                    <View style={styles.buttonsContainer}>
                      <CustomButton
                        title="Удалить"
                        width={150}
                        padding={10}
                        border="grey"
                        background="white"
                        color="red"
                        onPress={() => handleOnPress(item.id)}
                      />
                    </View>
                  </View>
                )
              })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.add_btn} onPress={handleAddSuplier}>
          <Feather name="search" size={28} color={colors.white} />
        </Pressable>
      </View>
      {modalData && (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible)
            }}
          >
            <View style={styles.cover}>
              <View style={styles.modal_content}>
                <View style={styles.modal_header}>
                  <Text style={styles.textStyle}>Детали клиента</Text>
                  <Feather
                    onPress={() => setModalVisible(!modalVisible)}
                    name="x"
                    size={24}
                    color="black"
                  />
                </View>
                <View style={styles.modal_body}>
                  <Text>
                    Имя Клиента :{' '}
                    {modalData.customer.person.firstName + ' ' + modalData.customer.person.lastName}
                  </Text>
                  <Text>
                    Адрес клиента :{' '}
                    {modalData.customer.person.address.country +
                      ' ' +
                      modalData.customer.person.address.city +
                      ' ' +
                      modalData.customer.person.address.address_1}
                  </Text>
                  <Text>Телефон клиента : {modalData.customer.person.address.phoneNumber1}</Text>
                  <View style={styles.hr} />
                  <Text>Детали магазина </Text>
                  <Text>Название магазина : {modalData.shop.companyName}</Text>
                  <Text>Магазин : {modalData.shop.shopName}</Text>
                </View>
                <View style={styles.modal_footer}></View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  )
}

const colors = {
  black: 'black',
  white: 'white',
  borderColor: '#d1d1d1',
  background: '#f1f1f1',
  opacity: '#00000056',
  grey: '#dee2e6',
}

const styles = StyleSheet.create({
  ShopListScreen_wrapper: {
    flex: 1,
    position: 'relative',
  },

  add_btn: {
    alignItems: 'center',
    backgroundColor: colors.black,
    borderRadius: 50,
    bottom: 20,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 50,
  },

  box: {
    borderRadius: 5,
    marginVertical: 15,
    minHeight: 100,
    padding: 5,
    width: 170,
    ...customStyles.border(1, 'solid', colors.borderColor),
  },

  buttonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
    margin: 5,
    padding: 5,
  },

  centeredView: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  cover: {
    alignItems: 'center',
    backgroundColor: colors.opacity,
    height: screenHeight,
    justifyContent: 'center',
    position: 'absolute',
    width: screenWidth,
  },

  footer: {
    backgroundColor: colors.black,
  },

  hr: {
    ...customStyles.borderBottom(1, 'solid', colors.borderColor),
    marginVertical: 5,
    width: 200,
  },

  modal_body: {
    paddingBottom: 60,
    paddingLeft: 10,
    paddingTop: 60,
  },

  modal_content: {
    backgroundColor: colors.white,
    maxHeight: screenHeight - 200,
    position: 'absolute',
    width: '90%',
  },

  modal_footer: {
    backgroundColor: colors.white,
    borderTopColor: colors.grey,
    borderTopWidth: 1,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },

  modal_header: {
    alignItems: 'center',
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },

  partnersContainer: {
    flexDirection: 'row',
    gap: 20,
    marginHorizontal: 15,
  },

  select_wrapper: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  text_h2: {
    fontWeight: 'bold',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
})

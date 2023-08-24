/**
 * was created by tigran at 11.08.23
 */

import { Feather } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Box, Center, CheckIcon, Select } from 'native-base'
import React, { FC, useState } from 'react'
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'
import { getShopId, notification } from '~services/ShopService'
import { customStyles } from '~utils/style_helpers'

export const PrtnerShipScreen: FC = () => {
  const [partnerShips, setPartnerShips] = useState<any>([])
  const [shops, setShops] = useState<any>([])
  const [shopsReq, setShopsReq] = useState<any>([])
  const [selectedShops, setSelectedShops] = useState('')
  const [loding, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData] = useState<any>(null)
  const navigation = useNavigation<any>()
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        console.log(selectedShops, 'selectedShops')
        const getID = await getShopId()
        const data = await SHOP_API.get(selectedShops)
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
    notification('Удалено')
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
      <Center>
        <Box maxW="300">
          {shops.length > 0 && (
            <Select
              selectedValue={selectedShops}
              minWidth="250"
              height="50"
              borderColor="#781F19"
              marginTop="3"
              color="#000"
              letterSpacing="1"
              fontSize="17"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
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
              <Select.Item label={'Выбор магазина'} value={'0'} />
              {shops.map((item: any) => {
                return <Select.Item label={item.shopName} key={item.id} value={item.id} />
              })}
            </Select>
          )}
        </Box>
      </Center>
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
      <View style={styles.ShopListScreen_wrapper}>
        <Text>Запросы на партнерство</Text>
        <ScrollView>
          <View style={styles.partnersContainer}>
            {shopsReq &&
              shopsReq.map((item: any) => {
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
              ///  Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible)
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>X</Text>
                </Pressable>
                <Text>Детали клиента</Text>
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
    margin: 15,
    minHeight: 100,
    padding: 5,
    width: 170,
    ...customStyles.border(1, 'solid', colors.borderColor),
  },
  button: {
    borderRadius: 20,
    elevation: 2,
    padding: 10,
  },
  buttonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
    margin: 5,
    padding: 5,
    // backgroundColor: colors.background,
  },

  centeredView: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    // marginTop: 22,
  },
  footer: {
    backgroundColor: colors.background,
    // height: 60,
  },
  hr: {
    ...customStyles.border(1, 'solid', colors.borderColor),
    marginVertical: 5,
    width: 200,
  },
  modalView: {
    alignItems: 'flex-start',
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    ///   backgroundColor: 'white',

    padding: 35,

    ///  shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,

    shadowRadius: 4,
  },

  // buttonClose: {
  //     backgroundColor: '#fffff',
  // },
  partnersContainer: {
    flexDirection: 'row',
    // backgroundColor: colors.black,
  },
  textStyle: {
    // color: 'white',
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

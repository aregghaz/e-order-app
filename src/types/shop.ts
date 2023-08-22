export interface IShopDetails {
  shopName: string
  companyName: string
  taxId: string
  legalAddress: {
    country: string
    state: string
    city: string
    address_1: string
    address_2: string
    postCode: string
    phoneNumber1: string
    phoneNumber2: string
    gpsCoordinates: {
      latitude: string
      longitude: string
    }
  }
  deliveryAddress: {
    country: string
    state: string
    city: string
    address_1: string
    address_2: string
    postCode: string
    phoneNumber1: string
    phoneNumber2: string
    gpsCoordinates: {
      latitude: string
      longitude: string
    }
  }
}

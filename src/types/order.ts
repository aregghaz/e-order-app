export interface IOorder {
  id: string
  customer: {
    id: string
    person: {
      id: string
      firstName: string
      lastName: string
      fatherName: string
      address: IAddress
      passport: string
      issueDate: string
      issuedBy: string
      inn: string
      birthDate: string
      citizenship: string
      email: string
      isVerified: boolean
      photo: string
    }
    package: null
    user: {
      id: string
      mobile: string
      username: string
      email: string
    }
    status: {
      createdAt: string
      updatedAt: string
      id: number
      name: string
      active: boolean
      permissions: string[]
    }
  }
  supplier: {
    id: string
    companyName: string
    address: IAddress
    taxId: string
    logoType: string
    agreement: boolean
    users: ISupplierUser[]
    package: string
    isVerified: boolean
    supplierSettings: {
      id: string
      minOrderSum: number
      minDeliveryDays: number
      maxDeliveryDays: number
      globalDiscount: number
      deliveryAddress: IDiliverAddress[]
      canOrder: string
      canSeeProducts: string
    }
    partnershipStatus: string
    status: {
      createdAt: string
      updatedAt: string
      id: number
      name: string
      active: boolean
      permissions: string[]
    }
  }
  shop: {
    id: string
    shopName: string
    companyName: string
    taxId: string
    legalAddress: IAddress
    deliveryAddress: IAddress
    createdAt: string
    updatedAt: string
  }
  shippingAddress: IAddress
  orderItems: IProduct[]
  orderTotal: number
  rewardTotal: number
  orderNumber: string
  createdAt: string
  updatedAt: string
  status: string
  comment: string
}

export interface IAddress {
  createdAt: string
  updatedAt: string
  id: string
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

export interface IDiliverAddress {
  city: string
  region: string
  country: string
}

export interface ISupplierUser {
  id: string
  mobile: string
  username: string
  email: string
}

export interface IProductUnit {
  name: string
  refId: string
  unitId: string
  contents: string
  productId: string
}

export interface IProduct {
  productName: string
  id: string
  quantity: number
  discount: number
  reward: number
  price: number
  productId: any
}

export interface IFeatured {
  id: string
  name: string
  description: null
  barcode: null
  sku: null
  price: number
  properties: any[]
  color: null
  width: null
  height: null
  weight: null
  discount: null
  discountStart: null
  discountEnd: null
  reward: number
  categories: any[]
  supplier: ISupplier
  gallery: any[]
  views: number
  sales: number
  rating: number
  inStock: null
  createdAt: string
  updatedAt: string
  isVisible: boolean
  refId: string
  status: string
  featured: any[]
}

interface ISupplier {
  createdAt: string
  updatedAt: string
  id: string
  companyName: string
  taxId: string
  agreement: boolean
  isVerified: boolean
  supplierSettings: {
    id: string
    minOrderSum: number
    minDeliveryDays: number
    maxDeliveryDays: number
    globalDiscount: number
    deliveryAddress: any[]
    canOrder: string
    canSeeProducts: string
  }
  __address__: {
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
}

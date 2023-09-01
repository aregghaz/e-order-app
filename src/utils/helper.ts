export interface IWishlist {
  customer: {
    id: string
    status: any
  }
  id: string
  name: string
  products: IWishlistProduct[]
}

export interface IWishlistProduct {
  barcode: string
  createdAt: string
  description: string
  discount: null
  discountEnd: null
  discountStart: null
  id: string
  isVisible: boolean
  name: string
  properties: {
    unit: IUnit[]
  }
  rating: number
  refId: string
  sales: number
  sku: string
  status: string
  updatedAt: string
  views: number
}

interface IUnit {
  contents: string
  name: string
  productId: string
  refId: string
  unitId: string
}

export const findTheExactElement = (array: IWishlist[], itemId: string, productId: string) => {
  const foundItem = array.find((item: IWishlist) => item.id === itemId)
  if (!foundItem) return false
  return foundItem.products.some((item: IWishlistProduct) => item.id === productId)
}

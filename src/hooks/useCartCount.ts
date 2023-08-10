import { useEffect, useState } from 'react'

import { ASYNC_STORAGE_KEYS } from '~constants'
import { secureStore } from '~utils'

const { CART_COUNT } = ASYNC_STORAGE_KEYS

type UpdateCartCountFn = (newCount: number) => Promise<void>
type ClearCartCountFn = () => Promise<void>

export function useCartCount(): [number | undefined, UpdateCartCountFn, ClearCartCountFn] {
  const [cartCount, setCartCount] = useState<number | undefined>(undefined)

  useEffect(() => {
    async function fetchCartCount() {
      try {
        const storedCount = await secureStore.getItem(CART_COUNT)
        if (storedCount) {
          setCartCount(JSON.parse(storedCount))
        }
      } catch (error) {
        console.error('Error fetching cart count:', error)
      }
    }

    fetchCartCount()
  }, [])

  const updateCartCount: UpdateCartCountFn = async (newCount) => {
    try {
      await secureStore.setItem(CART_COUNT, JSON.stringify(newCount))
      setCartCount(newCount)
    } catch (error) {
      console.error('Error updating cart count:', error)
    }
  }

  const clearCartCount: ClearCartCountFn = async () => {
    try {
      await secureStore.removeItem(CART_COUNT)
      setCartCount(undefined)
    } catch (error) {
      console.error('Error clearing cart count:', error)
    }
  }

  return [cartCount, updateCartCount, clearCartCount]
}

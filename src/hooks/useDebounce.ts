import { useRef } from 'react'

export const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const debounceFunction = (...args: any[]) => {
    if (debounceRef.current !== null) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  return debounceFunction
}

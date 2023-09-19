// useLoadingState.ts
import { useState } from 'react'

interface LoadingState {
  loading: boolean
  startLoading: () => void
  stopLoading: () => void
}

const useLoadingState = (): LoadingState => {
  const [loading, setLoading] = useState(false)

  const startLoading = () => {
    setLoading(true)
  }

  const stopLoading = () => {
    setLoading(false)
  }

  return { loading, startLoading, stopLoading }
}
export default useLoadingState

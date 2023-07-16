import { useState } from 'react'

type UseIncrementReturnType = [number, (option: number) => void]

export const useIncrement = (): UseIncrementReturnType => {
  const [value, setValue] = useState<number>(1)

  const addOption = (option: number): void => {
    setValue((prevValue) => prevValue + option)
  }

  return [value, addOption]
}

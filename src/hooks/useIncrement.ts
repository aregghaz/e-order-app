import { useState } from 'react'

type UseIncrementReturnType = [number, (option: number) => void, () => void]

export const useIncrement = (): UseIncrementReturnType => {
  const [value, setValue] = useState<number>(1)

  const addOption = (option: number): void => {
    setValue((prevValue) => prevValue + option)
  }

  const resetOption = () => {
    setValue(1)
  }

  return [value, addOption, resetOption]
}

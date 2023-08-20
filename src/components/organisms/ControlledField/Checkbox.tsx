import { Controller, ControllerRenderProps, get } from 'react-hook-form'

import type { ControlledCheckboxProps, RenderInputProps } from './types'
import { Field } from '../../molecules'

import { useCallback } from '~hooks'

export const Checkbox: React.FC<ControlledCheckboxProps> = ({
  name,
  control,
  errors,
  isRequired,
  ...props
}) => {
  const error = !!get(errors, name)

  const handlePress = useCallback(
    (field: ControllerRenderProps) => (newValue: boolean) => field.onChange(newValue),
    []
  )

  const renderCheckbox = useCallback(
    ({ field }: RenderInputProps) => (
      <Field>
        <Field.Checkbox
          {...props}
          name={field.name}
          value={field.value}
          onChange={handlePress(field)}
          isInvalid={error}
          isRequired={isRequired}
        />
      </Field>
    ),
    [error, isRequired, handlePress, props]
  )
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: isRequired }}
      render={renderCheckbox}
    />
  )
}

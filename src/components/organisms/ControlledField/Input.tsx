import { forwardRef, useCallback } from 'react'
import { Controller, get } from 'react-hook-form'
import { TextInput } from 'react-native'

import type { ControlledInputProps, RenderInputProps } from './types'
import { Field } from '../../molecules'

export const Input = forwardRef<TextInput, ControlledInputProps>(
  ({ control, name, errors, rules, children, ...props }, ref) => {
    const errorMessage = get(errors, name)?.message

    const renderInput = useCallback(
      ({ field: { onChange, name, ...fieldProps } }: RenderInputProps) => (
        <Field.Input
          {...props}
          {...fieldProps}
          ref={ref}
          errorMessage={errorMessage}
          onChangeText={onChange}
        />
      ),
      [ref, errorMessage, props]
    )

    return <Controller name={name} control={control} rules={rules} render={renderInput} />
  }
)

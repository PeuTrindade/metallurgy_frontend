import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

type TSelectComponent = {
  setValue: any
  id: string
  placeholder: string
  values: { label: string; value: string }[]
  error?: string
  onBlur?: any
}

const SelectComponent: React.FC<TSelectComponent> = ({ id, placeholder, setValue, values, error, onBlur }) => {
  return (
    <div className="flex flex-col">
      <Select onValueChange={setValue}>
        <SelectTrigger
          onBlur={onBlur}
          className={
            error
              ? 'border-2 border-red-500 focus:border-red-500 focus-visible:outline-none' // Borda vermelha com erro
              : 'border-input focus:border-primary focus:border-2 focus-visible:outline-none'
          }
          id={id}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper">
          {values.map((v, key) => (
            <SelectItem key={key} value={v.value}>
              {v.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default SelectComponent

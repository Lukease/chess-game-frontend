import React from 'react'
import { DropdownItemProps } from './dto/TDropdownItem'

export function DropdownItem({ leftIcon, onClick, children, }: DropdownItemProps) {
  return (
    <div className='dropdown__item' onClick={onClick}>
      <span className='dropdown__item--icon'>{leftIcon}</span>
      {children}
    </div>
  )
}

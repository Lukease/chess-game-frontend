import React, { useState } from 'react'
import { TDropdown } from './dto/TDropdown'

export function Dropdown({ leftIcon, onClick, children }: TDropdown) {
  const [isOpen, setIsOpen] = useState(false)

  const handleMouseEvents = (isOpen: boolean) => {
    setIsOpen(isOpen)
  }

  return (
    <div
      className='dropdown__item'
      onClick={onClick}
      onMouseOver={() => handleMouseEvents(true)}
      onMouseLeave={() => handleMouseEvents(false)}
    >
      <span className='dropdown__item--icon'>{leftIcon}</span>
      {isOpen && <div className='dropdown'>{children}</div>}
    </div>
  )
}
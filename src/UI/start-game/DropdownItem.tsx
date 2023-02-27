import React from 'react'
import {TDropdownItem} from './types/TDropdownItem'

export function DropdownItem({leftIcon}: TDropdownItem) {
    return (
        <div className={'dropdown__item'}
        >
            <span className={'dropdown__item--icon'}>{leftIcon}</span>
        </div>
    )
}
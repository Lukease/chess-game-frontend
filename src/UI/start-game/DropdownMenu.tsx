import React from 'react'
import {TDropdownMenu} from './types/TDropdownMenu'

export function DropdownMenu({leftIcon, text}: TDropdownMenu) {
    return (
        <div className={'dropdown'}>
            <div className={'dropdown__item'}
            >
                <span className={'dropdown__item--icon'}>{leftIcon}</span>
            </div>
            )
        </div>
    )
}
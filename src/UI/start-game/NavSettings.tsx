import React from 'react'
import {TNavSettings} from './types/TNavSettings'

export function NavSettings({icon, backgroundColor = undefined}: TNavSettings) {

    return (
        <li className={'navbar__nav--item'}>
            <a
                className={'navbar__nav--button'}
                style={{backgroundColor: backgroundColor}}
            >
                {icon}
            </a>
        </li>
    )
}
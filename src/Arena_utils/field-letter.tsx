import React from 'react'

export function Letter(props: any) {
    return (
        <div
            className={'field__letter'}
        >
            {props.value}
        </div>
    )
}
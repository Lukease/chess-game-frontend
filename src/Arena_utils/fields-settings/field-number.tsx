import React from 'react'

export function FieldNumber(props: any) {
    return (
        <div
            className={'field__number'}
        >
            {-props.value + 8}
        </div>
    )
}
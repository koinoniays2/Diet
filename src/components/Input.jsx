import React from 'react'

export default function Input({ type, placeholder }) {
    return (
        <label className="border-black border-2">
            <input className="input-custom" type={type} placeholder={placeholder} />
        </label>
    )
}

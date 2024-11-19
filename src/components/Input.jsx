import React from 'react'

export default function Input({ type, placeholder, register, name, data }) {
    return (
        <label className="border-black border-2">
            {/* 전달받은 props - placeholder, name */}
            <input {...register(`${name}`) } className="input-custom" type={type} placeholder={placeholder}/>
        </label>
    )
}

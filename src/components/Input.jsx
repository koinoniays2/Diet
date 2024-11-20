import React from 'react'

export default function Input({ type, placeholder, register, name, inputChange }) {
    return (
        <label className="border-black border-2">
            {/* 부모에게 전달받은 register 함수와 register에 들어갈 키 사용 */}
            <input {...register(`${name}`) } className="input-custom" type={type} placeholder={placeholder}
            onChange={inputChange}/>
        </label>
    )
}

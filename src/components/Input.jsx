import React from 'react'

export default function Input({ 
    type="text",
    name, 
    placeholder, 
    regexp, 
    message, 
    register, 
    errors,
    validate,
    inputChange,
    serverChange,
    required }) {
    return (
        <div className="flex flex-col">
            <label className="border-black border-2 mt-2 flex">
                <input {...register(`${name}`, {
                        required : required,
                        pattern : {
                            value : regexp,
                            message : message
                        },
                        validate : validate
                })} className="input-custom" type={type} placeholder={placeholder}
                onChange={(e) => {
                    register(name).onChange(e); // React Hook Form 기본 동작
                    if (inputChange) inputChange(); // 휴대폰, 이메일 검증
                    if (serverChange) serverChange(); // 서버 메세지 초기화
                }} />
            </label>
            <p className="text-red-500 text-[13px]">
                { errors?.[name] && errors[name].message }
            </p>
        </div>
    )
}

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
    inputChange }) {
    return (
        <div className="flex flex-col">
            <label className="border-black border-2 mt-2 flex">
                {/* 부모에게 전달받은 register 함수와 register에 들어갈 키 사용 */}
                <input {...register(`${name}`, {
                        // required : `필수 입력 사항입니다.`,
                        pattern : {
                            value : regexp,
                            message : message
                        },
                        validate : validate
                })} className="input-custom" type={type} placeholder={placeholder}
                onChange={(e) => {
                    register(name).onChange(e); // React Hook Form 기본 동작
                    if (inputChange) inputChange(); // 부모 컴포넌트의 검증 함수
                }} />
            </label>
            <span className="text-red-500 text-[13px]">
                { errors?.[name] && errors[name].message }
            </span>
        </div>
    )
}

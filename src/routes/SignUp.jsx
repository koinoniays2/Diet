import React, { useState } from "react";
import InputWindow from "../components/InputWindow";
import { useMutation } from "react-query";
import { apiPostCreateUser } from "../api";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import checkTrue from "../assets/check_true.svg";
import checkFalse from "../assets/check_false.svg";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function SignUp() {
    const [serverMessage, setServerMessage] = useState(null); // 서버 메세지
    const [isChecked, setIsChecked] = useState(false); // 체크 상태
    const navigate = useNavigate(); // react router 라이브러리 useNavigate 훅

    // API 요청 react query 라이브러리 useMutation 훅
    const { mutate, isLoading } = useMutation(apiPostCreateUser, {
        onSuccess: (data) => {
            setServerMessage(data.message);
            if(data.result) navigate("/login");
        }
    });
    const serverChange = () => {
        setServerMessage(null); // 인풋에 입력값이 들어오면 서버 메세지 초기화
    };
    // 폼 관리 react hook form 라이브러리 useForm 훅
    const { register, handleSubmit, formState: { errors }, setError, clearErrors, getValues } = useForm({
        mode: "onChange"
    });
    const onValid = (data) => mutate(data); // 콜백 함수
    const checkChange = (event) => setIsChecked(event.target.checked); // 체크 상태 감지

    // 휴대폰, 이메일 검증 함수
    const validateFields = (fields, fieldName, regex, errorMessage) => {
        const errorCheck = fields.some((value) => !regex.test(value));
        if (errorCheck) {
            setError(fieldName, { message: errorMessage });
        } else {
            clearErrors(fieldName);
        };
    };

    // 휴대폰 검증
    const phoneInputChange = () => {
        validateFields(
            [getValues("phone1"), getValues("phone2"), getValues("phone3")],
            "phoneError",
            /^\d{2,4}$/,
            "2~4자리 숫자만 입력 가능합니다."
        );
    };

    // 이메일 검증
    const emailInputChange = () => {
        validateFields(
            [getValues("email2")],
            "emailError",
            /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "올바른 도메인을 입력하세요."
        );
    };

    // 인풋 데이터
    const inputs = [
        { name: "id", placeholder: "아이디", 
            regexp: /^[a-z][a-zA-Z0-9]*$/, message: "아이디는 영소문자로 시작해야 합니다." },
        { type: "password", name: "password", placeholder: "비밀번호", 
            regexp: /^.{4,}$/, message: "비밀번호는 최소 4자리 이상이어야 합니다." },
        { type: "password", name: "passwordCheck", placeholder: "비밀번호 확인", 
            validate: (value) => value === getValues("password") || "비밀번호가 일치하지 않습니다." },
        { name: "name", placeholder: "이름" },
    ];
    const groups = [
        {
            input: [
                { name: "phone1", placeholder: "010", separator: "-" },
                { name: "phone2", placeholder: "0000", separator: "-" },
                { name: "phone3", placeholder: "0000" },
            ],
            onChange: phoneInputChange,
            error: "phoneError"
        },
        {
            input: [
                { name: "email1", placeholder: "example", separator: "@" },
                { name: "email2", placeholder: "example.com" },
            ],
            onChange: emailInputChange,
            error: "emailError"
        }
    ];

    return (
        <InputWindow handleSubmit={handleSubmit} onValid={onValid}>
            <div className="w-full flex flex-col">
                {/* 인풋 (아이디, 비밀번호, 이름)*/}
                {inputs.map((input, index) => (
                    <Input key={index} {...input} register={register} errors={errors} serverChange={serverChange} /* required="필수 입력사항 입니다." */ />
                ))}
                {/* 인풋 (휴대폰 번호, 이메일)*/}
                {groups.map((group, groupIndex) => (
                    <React.Fragment key={groupIndex}>
                        <div className="flex items-center">
                            {group.input.map((input, index) => (
                                <React.Fragment key={index}>
                                    <Input {...input} register={register} errors={errors} inputChange={group.onChange} serverChange={serverChange} />
                                    {input.separator && <span className="p-1">{input.separator}</span>}
                                </React.Fragment>
                            ))}
                        </div>
                        {/* 휴대폰, 이메일 에러 메세지 */}
                        {Array.isArray(group.error) ? (
                            group.error.map((errorKey) => (
                                errors[errorKey]?.message && (
                                    <p key={errorKey} className="text-red-500 text-[13px]">
                                        {errors[errorKey].message}
                                    </p>
                                )
                            ))
                        ) : (
                            errors[group.error]?.message && (
                                <p className="text-red-500 text-[13px]">{errors[group.error].message}</p>
                            )
                        )}
                    </React.Fragment>
                ))}
                {/* 인풋 체크박스 (개인정보 동의) */}
                <label className="flex py-2" htmlFor="checkbox">
                    <input className="appearance-none"
                        id="checkbox" type="checkbox" checked={isChecked} onChange={checkChange} />
                    <span className="flex items-center gap-2">
                        <img className="w-6" src={isChecked ? checkTrue : checkFalse} alt="check_btn" />
                        개인정보 수집 동의
                    </span>
                </label>
            </div>
            {/* 서버 메세지, 버튼 */}
            <div className="flex flex-col gap-1">
                {/* 서버 오류 메세지 */}
                {serverMessage && (<p className="text-red-500">{serverMessage}</p>)}
                <Button disable={!isChecked} type="submit" color={isChecked ? "btn-color-pink" : "btn-color-gray"} text={isLoading ? <ClipLoader size={24} /> : "회원가입"} />
                <p className="text-center">이미 회원이시라면?&nbsp;
                    <span onClick={() => {navigate("/login")}} 
                    className="text-[#ED8EE0] cursor-pointer hover:underline">로그인</span></p>
            </div>
        </InputWindow>
    )
}

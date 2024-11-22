import { useState } from "react";
import InputWindow from "../components/InputWindow";
import { useMutation } from "react-query";
import { apiPostCreateUser } from "../api";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import checkTrue from "../assets/check_true.svg";
import checkFalse from "../assets/check_false.svg";

export default function SignUp() {
    const [serverMessage, setServerMessage] = useState(null);
    // const [userData, setUserData] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    const { mutate } = useMutation(apiPostCreateUser, {
        onSuccess: (data) => {
            setServerMessage(data.message);
        }
    });
    const { register, handleSubmit, formState: { errors }  } = useForm({
        mode : "onBlur"
    });
    const onValid = (data) => {
        mutate(data);
    };
    const inputChange = () => {
        setServerMessage(null);
    };
    const checkChange = (event) => {
        setIsChecked(event.target.checked);
    };
    return (
        <InputWindow handleSubmit={handleSubmit} onValid={onValid}>
            {/* 인풋 */}
            <div className="w-full flex flex-col gap-4">
                <Input type="text" placeholder="아이디" register={register} name="id" inputChange={inputChange} 
                regexp={/^[a-z][a-zA-Z0-9]*$/} message="아이디는 영문자로 시작해야 합니다." errors={errors} />
                <Input type="password" placeholder="비밀번호" register={register} name="password" inputChange={inputChange} />
                <Input type="password" placeholder="비밀번호 확인" register={register} name="passwordCheck" inputChange={inputChange} />
                <Input type="text" placeholder="이름" register={register} name="name" inputChange={inputChange} />
                <div className="flex items-center">
                    <Input type="text" placeholder="010" register={register} name="phone1" inputChange={inputChange} />
                    <span>-</span>
                    <Input type="text" placeholder="0000" register={register} name="phone2" inputChange={inputChange} />
                    <span>-</span>
                    <Input type="text" placeholder="0000" register={register} name="phone3" inputChange={inputChange} />
                </div>
                <div className="flex items-center">
                    <Input type="text" placeholder="example" register={register} name="email1" inputChange={inputChange} />
                    <span className="px-1">@</span>
                    <Input type="text" placeholder="example.com" register={register} name="email2" inputChange={inputChange} />
                </div>
                <label className="flex" htmlFor="checkbox">
                    <input className="appearance-none"
                    id="checkbox" type="checkbox" checked={isChecked} onChange={checkChange} />
                    <span className="flex items-center gap-1">
                        <img className="w-6" src={isChecked ? checkTrue : checkFalse} alt="check_btn"/>
                        개인정보 수집 동의
                    </span>
                </label>
            </div>
            {/* 버튼 */}
            <div className="flex flex-col gap-2">
                {/* 오류 메세지 */}
                {
                    serverMessage && (
                        <p className="text-red-500">{serverMessage}</p>
                    )
                }
                <Button disable={!isChecked} type="submit" color={isChecked ? "btn-color-pink" : "btn-color-gray"} text="회원가입" />
            </div>
        </InputWindow>
    )
}

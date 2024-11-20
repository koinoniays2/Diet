import { useState } from "react";
import InputWindow from "../components/InputWindow";
import Layout from "../components/Layout";
import { useMutation } from "react-query";
import { apiPostCreateUser } from "../api";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";

export default function SignUp() {
    const [userData, setUserData] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    const { mutate } = useMutation(apiPostCreateUser, {
        onSuccess: (data) => {
            setUserData(data);
        }
    });
    const { register, handleSubmit } = useForm();
    const onValid = (data) => {
        mutate(data);
    };
    const inputChange = () => {
        setUserData(null);
    };
    const checkChange = (event) => {
        setIsChecked(event.target.checked);
    };
    return (
        <InputWindow handleSubmit={handleSubmit} onValid={onValid}>
            {/* 인풋 */}
            <div className="w-full flex flex-col gap-4">
                <Input type="text" placeholder="아이디" register={register} name="id" inputChange={inputChange} />
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
                <label htmlFor="checkbox">
                    <input className="appearance-none"
                    id="checkbox" type="checkbox" checked={isChecked} onChange={checkChange} />
                    <span>{isChecked ? "체크 이모티콘" : "노체크 이모티콘"}</span>
                    개인정보 수집 동의
                </label>
            </div>
            {/* 버튼 */}
            <div className="flex flex-col gap-2">
                <Button type="submit" color="btn-color-pink" text="회원가입" />
            </div>
        </InputWindow>
    )
}

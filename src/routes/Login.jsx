import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Input from "../components/Input";
import InputWindow from "../components/InputWindow";
import { useMutation } from "react-query";
import { apiPostUserLogin } from "../api";
import { useState } from "react";

export default function Login() {
    const [userData, setUserData] = useState(null);
    const { mutate } = useMutation(apiPostUserLogin, {
        onSuccess: (data) => {
            console.log(data);
            setUserData(data);
        }
    });
    const { register, handleSubmit } = useForm();
    /* register : 폼 필드(input, select 등)를 React Hook Form에 등록하는 함수
    handleSubmit : 폼의 제출 이벤트를 처리하는 함수입니다. 
    {...register("id")} id는 폼 데이터를 객체 형태로 저장할 때 사용되는 키 
    handleSubmit이 실행되면 폼 유효성 검사 후 onValid(data)를 호출하면서
    폼 데이터를 전달하고 mutate(data)가 호출*/
    const onValid = (data) => {
        mutate(data);
    }; 
    /* handleSubmit에서 유효성 검사를 통과한 데이터를 처리하기 위해 실행되는 콜백 함수
    콜백 함수 : 다른 함수의 매개변수로 전달되어, 특정 시점에 실행되는 함수.*/
    return (
        <InputWindow handleSubmit={handleSubmit} onValid={onValid}> {/* props로 handleSubmit과 onValid 전달  */}
            {/* 인풋 */}
            <div className="w-full flex flex-col gap-4">
                {/* props로 register와 register안에 들어갈 키 전달  */}
                <Input type="text" placeholder="아이디" register={register} name="id" />
                <Input type="password" placeholder="비밀번호" register={register} name="password" />
            </div>
            {/* 버튼 */}
            <div className="flex flex-col gap-2">
                <Button color="btn-color-pink" text="로그인"/>
                <Button color="btn-color-gray" text="회원가입"/>
            </div>
        </InputWindow>
    )
}

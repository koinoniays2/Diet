import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Input from "../components/Input";
import InputWindow from "../components/InputWindow";
import { useMutation, useQueryClient } from "react-query";
import { apiPostLogin } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function Login() {
    // const [userData, setUserData] = useState(null); // API 요청 결과값
    const [serverMessage, setServerMessage] = useState(null); // 서버 메세지
    const serverChange = () => {
        setServerMessage(null); // 인풋에 입력값이 들어오면 서버 메세지 초기화
    };
    const navigate = useNavigate();
    const queryClient = useQueryClient();  // react query 라이브러리 useQueryClient 훅
    

    const { mutate, isLoading } = useMutation(apiPostLogin, {
        onSuccess: (data) => {
            // invalidateQueries(key): 쿼리 무효화 후 데이터 다시 가져오기
            queryClient.invalidateQueries("getSession"); 
            setServerMessage(data.message);
        }
    });
    const { register, handleSubmit } = useForm();
    /* register : 폼 필드(input, select 등)를 React Hook Form에 등록하는 함수
    연결된 폼 필드는 React Hook Form이 자동으로 값을 추적
    {...register("id")} id는 폼 데이터를 객체 형태로 저장할 때 사용되는 키

    handleSubmit : 폼의 제출 이벤트를 처리하는 함수(폼이 제출되었을 때 실행되어야 할 함수를 지정)
    handleSubmit이 실행되면 폼 유효성 검사 후 onValid(data)를 호출하면서
    폼 데이터를 전달하고 콜백함수(mutate(data))가 호출*/
    const onValid = (data) => {
        mutate(data);
    };
    /* handleSubmit에서 유효성 검사를 통과한 데이터를 처리하기 위해 실행되는 콜백 함수
    콜백 함수 : 다른 함수의 매개변수로 전달되어, 특정 시점에 실행되는 함수.*/

    const inputs = [
        { name: "id", placeholder: "아이디" },
        { type: "password", name: "password", placeholder: "비밀번호" }
    ];
    
    return (
        <InputWindow handleSubmit={handleSubmit} onValid={onValid}>
            {/* 인풋 */}
            <div className="w-full flex flex-col">
                {inputs.map((input, index) => (
                        <Input key={index} {...input} register={register} serverChange={serverChange} required="필수 입력사항 입니다." />
                    ))}
                {/* 서버 메세지 */}
                {
                    serverMessage && (
                        <p className="text-red-500 text-[13px]">{serverMessage}</p>
                    )
                }
            </div>
            {/* 버튼 */}
            <div className="flex flex-col gap-2">
                <Button type="submit" color="btn-color-pink" text={isLoading ? <ClipLoader size={24} /> : "로그인" }/>
                <Button type="button" color="btn-color-gray" text="회원가입" onClick={() => navigate("/signup")}/>
            </div>
        </InputWindow>
    )
}

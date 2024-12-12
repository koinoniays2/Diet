import { useForm } from "react-hook-form";
import InputWindow from "./InputWindow";
import Input from "./Input";
import Button from "../components/Button";
import { apiPostCreateFolder } from "../api";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

export default function NewOpenModal({ setOpenModal }) {
    const { register, handleSubmit } = useForm({ mode: "onChange" });
    const [serverMessage, setServerMessage] = useState(null); // 서버 메세지
    const onValid = (data) => mutate(data); // 콜백 함수
    const queryClient = useQueryClient();

    // API 요청 react query 라이브러리 useMutation 훅
    const { mutate } = useMutation(apiPostCreateFolder, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("getFolder");
            if(!data.result) {
                setServerMessage(data.message);
            } else {
                setOpenModal(false);
            };
        }
    });

    const serverChange = () => {
        setServerMessage(null); // 인풋에 입력값이 들어오면 서버 메세지 초기화
    };

    return (
        <div className="w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-black bg-opacity-30">
            <InputWindow handleSubmit={handleSubmit} onValid={onValid}>
                <div className="flex flex-col gap-2">
                    <Input name="folderName" placeholder="폴더명을 입력하세요." register={register}
                        required="폴더명을 입력하세요." serverChange={serverChange}/>
                    {/* 서버 메세지 */}
                    {
                        serverMessage && (
                            <p className="text-red-500 text-[13px]">{serverMessage}</p>
                        )
                    }
                </div>
                <div className="flex gap-4">
                    <Button type="submit" text="확인" color="btn-color-pink" />
                    <Button type="button" text="취소" color="btn-color-gray" onClick={() => { setOpenModal(false) }} />
                </div>
            </InputWindow>
        </div>
    )
}

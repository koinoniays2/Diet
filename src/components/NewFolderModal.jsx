import { useForm } from "react-hook-form";
import InputWindow from "./InputWindow";
import Input from "./Input";
import Button from "./Button";
import { apiPostCreateFolder } from "../api";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ClipLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";

export default function NewFolderModal({ setOpenModal, setActiveMenu }) {
    const { register, handleSubmit } = useForm({ mode: "onChange" });
    const [serverMessage, setServerMessage] = useState(null); // 서버 메세지 관리
    const queryClient = useQueryClient();

    // 폴더 생성 API
    const { mutate, isLoading } = useMutation(apiPostCreateFolder, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("getFolder");
            if(!data.result) {
                setServerMessage(data.message);
            } else {
                setOpenModal(false);
                setActiveMenu(null);
            };
        }
    });
    const onValid = (data) => mutate(data);

    const serverChange = () => {
        setServerMessage(null); // 인풋에 입력값이 들어오면 서버 메세지 초기화
    };

    return (
        // 새폴더 클릭 시 나오는 입력 창
        <AnimatePresence>
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}       
        exit={{ opacity: 0 }}         
        transition={{ duration: 0.3 }}       
        className="z-20 w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-black bg-opacity-30"
        onClick={(e) => e.stopPropagation()}>
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
                    <Button type="submit" text={isLoading ? <ClipLoader size={16}/> : "확인"} color="btn-color-pink" disable={isLoading} />
                    <Button type="button" text="취소" color="btn-color-gray" onClick={() => { setOpenModal(false); setActiveMenu(null); }} />
                </div>
            </InputWindow>
        </motion.div>
        </AnimatePresence>
    )
}

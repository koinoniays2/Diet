import { useForm } from "react-hook-form";
import InputWindow from "./InputWindow";
import Input from "./Input";
import Button from "../components/Button";

export default function NewOpenModal({ setOpenModal }) {
    const { register, handleSubmit } = useForm();
    
    return (
        <div className="w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-black bg-opacity-30">
            <InputWindow handleSubmit={handleSubmit}>
                <Input name="folderName" placeholder="폴더명을 입력하세요." register={register}/>
                <div className="flex gap-4">
                    <Button type="submit" text="확인" color="btn-color-pink" />
                    <Button type="button" text="취소" color="btn-color-gray" onClick={() => {setOpenModal(false)}} />
                </div>
            </InputWindow>
        </div>
    )
}

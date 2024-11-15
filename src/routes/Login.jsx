import Button from "../components/Button";
import Input from "../components/Input";
import InputWindow from "../components/InputWindow";

export default function Login() {
    return (
        <InputWindow>
            {/* 인풋 */}
            <div className="w-full flex flex-col gap-4">
                <Input type="text" placeholder="아이디" />
                <Input type="password" placeholder="비밀번호" />
            </div>
            {/* 버튼 */}
            <div className="flex flex-col gap-2">
                <Button color="btn-color-pink" text="로그인"/>
                <Button color="btn-color-gray" text="회원가입"/>
            </div>
        </InputWindow>
    )
}

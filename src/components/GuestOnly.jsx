import { Navigate } from "react-router-dom";
import useSession from "../lib/useSession";

export default function GuestOnly({ children }) {
    const { data, isLoading } = useSession(); // 로그인 상태 가져오기
    if (!isLoading && data?.result) {
        return <Navigate to="/" />; // 로그인 상태일 경우 로그인 & 회원가입 페이지 접근 불가, 홈으로 리디렉션
    };
    return children; // 비로그인일 경우 로그인 & 회원가입 페이지 접근 가능
}

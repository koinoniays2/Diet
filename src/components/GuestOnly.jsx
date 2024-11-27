import { Navigate } from "react-router-dom";
import useSession from "../lib/useSession";

/*  
    로그인 여부에 따라 페이지 접근을 제어
    두번째, 응답 결과가 result : true (로그인 상태)
    GuestOnly.jsx의 children은 로그인 페이지, 회원가입 페이지가 온다.
*/
export default function GuestOnly({ children }) {
    const { data, isLoading } = useSession(); // 로그인 상태 가져오기
    if (!isLoading && data?.result) {
        return <Navigate to="/" />; // 응답이 true일 경우, 로그인 & 회원가입 페이지 접근 불가 홈으로 리디렉션
    };
    return children; // 비로그인일 경우 로그인 & 회원가입 페이지 렌더링
}

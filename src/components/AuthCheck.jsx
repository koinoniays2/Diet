import { Navigate } from "react-router-dom";
import useSession from "../lib/useSession";

/*  
    로그인 여부에 따라 페이지 접근을 제어
    첫번째, 응답 결과가 result : false (비로그인 상태)
    AuthCheck.jsx의 children은 로그인을 해야지만 볼 수 있는 화면들이 렌더링 되는 Outlet이 온다.
*/
export default function AuthCheck({ children }) {
    const { data, isLoading } = useSession(); // 로그인 상태 응답 가져오기
    if (!isLoading && !data?.result) {
        return <Navigate to="/login" />; // 응답이 false일 경우 메인 접근 불가 로그인 페이지로 리디렉션
    };
    return children; // 로그인 된 사용자는 자식(Outlet)을 렌더링
};

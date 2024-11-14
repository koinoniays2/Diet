import { Navigate } from "react-router-dom";
import useSession from "../lib/useSession";

/*  
    로그인 여부에 따라 페이지 접근을 제어
*/
export default function AuthCheck({ children }) {
    const { data, isLoading } = useSession(); // 로그인 상태 가져오기
    if (!isLoading && !data?.result) {
        return <Navigate to="/login" />; // 로그인되지 않은 사용자는 로그인 페이지로 리다이렉트
    };
    return children; // 로그인 된 사용자는 자식(Outlet)을 렌더링
};

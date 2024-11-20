import { useQuery } from "react-query"
import { apiGetLoginStatus } from "../api"
// 로그인 요청 응답 가져오기
export default function useSession() {
    const { data, isLoading } = useQuery("getSession", apiGetLoginStatus);
    /* 세션 상태가 변경되면 useQuery는 자동으로 데이터를 다시 가져와서 
    useSession을 쓰고 있는 컴포넌트를 리렌더링(자동으로 로그인 감지하여 리디렉션 가능)*/
    return { data, isLoading };
};

import { useQuery } from "react-query"
import { apiGetLoginStatus } from "../api"
// 로그인 요청 응답 가져오기
export default function useSession() {
    const { data, isLoading } = useQuery("getSession", apiGetLoginStatus);
    return { data, isLoading };
};

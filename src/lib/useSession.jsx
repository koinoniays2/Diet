import { useQuery } from "react-query"
import { apiGetLoginStatus } from "../api"
// 세션 상태를 가져오기
export default function useSession() {
    const { data, isLoading } = useQuery("getSession", apiGetLoginStatus);
    return { data, isLoading };
};

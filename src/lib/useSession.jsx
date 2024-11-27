import { useQuery } from "react-query"
import { apiGetLoginStatus } from "../api"
// 로그인 요청 응답 가져오기
export default function useSession() {
    const { data, isLoading } = useQuery("getSession", apiGetLoginStatus);
    // console.log(data);
    /* 로그인 후 queryClient.invalidateQueries("getSession"); 실행으로
	invalidateQueries(key): 쿼리 무효화 후 키("getSession")와 연결된 데이터를 다시 요청하도록 
	강제하게 되어 세션 상태가 변경되면 useQuery는 자동으로 데이터를 다시 가져와서 
    useSession을 쓰고 있는 컴포넌트를 리렌더링하여 로그인을 감지하고 리디렉션 가능 */
    return { data, isLoading };
};
/* 재사용 가능하도록 분리 한 이유 : 
로그인 여부에 따라 여러 리디렉션을 처리하기 위해
(로그인 사용자 : 메인 페이지 O, 로그인 & 회원가입 페이지 X)  
(비로그인 사용자 : 메인 페이지 X, 로그인 & 회원가입 페이지 O)*/
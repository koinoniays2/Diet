const BASE_URL = process.env.REACT_APP_BASE_URL;

// 로그인 여부 확인
export async function apiGetLoginStatus() {
    try{
        return await fetch(`${BASE_URL}/user/login-status`, {
            method: "GET",
            credentials: "include" // 브라우저에 저장된 세션 ID 쿠키가 서버에 포함되어 전송
        }).then((res) => res.json());
    }catch(error) {
        console.log(error);
    };
};// 매핑된 세션 ID가 없으면 서버에서 null 또는 비로그인 상태를 나타내는 응답을 보내기 때문에, 로그인되지 않았음을 의미

// 로그인
export async function apiPostLogin(data) {
    try {
        return await fetch (`${BASE_URL}/user/login`, {
            method:  "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include", // 헤더에 쿠키를 포함하여 서버로 전송
            body: JSON.stringify(data)
        }).then(res => res.json());
    }catch(error) {
        console.log(error);
    };
};
// 회원가입
export async function apiPostCreateUser(data) {
    try {
        return await fetch (`${BASE_URL}/user/create`, {
            method:  "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    }catch(error) {
        console.log(error);
    }
}